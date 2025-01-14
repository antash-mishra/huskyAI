import os
from typing import final
from flask import Flask, g, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import sqlite3
import logging 
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from h11 import Request

from celery_app import scrape_and_store
from scrap import extract_domain_name

from db import init_db
import jwt
from datetime import datetime, timedelta


load_dotenv()

logger = logging.getLogger(__name__)

app = Flask(__name__)

DATABASE_URL = "scraper.db"
app.config['CELERY_BROKER_URL'] = os.getenv('CELERY_BROKER_URL')
app.config['CELERY_RESULT_BACKEND'] = os.getenv('CELERY_RESULT_BACKEND')
app.config["SQLALCHEMY_DATABASE_URI"] = DATABASE_URL

init_db()
CORS(app)

print(f"Database Path: {os.path.abspath(DATABASE_URL)}")

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

def save_collection(user_id, url):
    collection_name = extract_domain_name(url)
    try:
        conn = sqlite3.connect(DATABASE_URL, check_same_thread=False)
        cursor = conn.cursor()

        # Check for duplicate URL for the user
        cursor.execute('''
            SELECT collection_id FROM collections WHERE user_id = ? AND url = ?
        ''', (user_id, url))
        existing_collection = cursor.fetchone()

        if existing_collection:
            return {
                "collection_id": existing_collection[0],
                "already_exists": True
            }
        
        cursor.execute('''
            INSERT INTO collections (user_id, collection_name, url, created_at, updated_at)
            VALUES (?, ?, ?, datetime('now'), datetime('now'))
        ''', (user_id, collection_name, url))
        
	# Fetch the last inserted ID
        cursor.execute('SELECT last_insert_rowid()')
        collection_id = cursor.fetchone()[0]
        
        conn.commit()
        print("Collection ID: ", collection_id)
        return {
            "collection_id": collection_id,
            "already_exists": False
        }

    except sqlite3.IntegrityError as e:
        logger.error(f"Database integrity error: {e}")
        raise ValueError("Failed to save collection due to database constraint.")

    except Exception as e:
        logger.error(f"Collection not saved: {e}")
        return None

    finally:
        conn.close()

@app.route("/api/scrape", methods=["POST"])
def scrape():
    try:
        # Extract Token
        auth_header = request.headers.get('Authorization')

        if not auth_header:
            return jsonify({'error': 'No token provided'}), 401
        
        try:
            token = auth_header.split(' ')[1]
            payload = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=['HS256'])
            user_id = payload['user_id']  # Get the user_id from the payload
        except jwt.ExpiredSignatureError:
            return jsonify({'error': 'Token has expired'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'error': 'Invalid token'}), 401

        # Extract body from request
        data = request.get_json()
        url = data.get('url')

        if not url:
            return jsonify({'error': 'URL is reqiured'}), 400
        
        try: 
            logger.info(f"SAVE COLLECTION: {user_id} {url}")
            save_result = save_collection(user_id=user_id, url=url)
            if save_result["already_exists"]:
                return jsonify({
                    'success': False,
                    'message': 'URL is already in the collection.',
                    'collection_id': save_result["collection_id"]
                }), 409
            collection_id = save_result["collection_id"]
        except Exception as e:
            return jsonify({'error': str(e)}), 500
        # Enqueue the task
        task = scrape_and_store.delay(collection_id, url)

        return jsonify({
            'success': True,
            'message': 'Scraping task has been queued.',
            'task_id': task.id
        }), 202

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/history/<int:id>/upvote', methods=['POST'])
def upvote(id):
    try:
        
        conn = sqlite3.connect(DATABASE_URL)
        cursor = conn.cursor()

        # Retrieve the current upvotes
        cursor.execute('SELECT upvotes FROM summaries WHERE id = ?', (id,))
        row = cursor.fetchone()
        logger.info(f"Row: {row[0]}")
        if row is None:
            return jsonify({"error": "Item not found"}), 404

        # Increment the upvotes count
        new_upvotes = row[0] + 1
        cursor.execute('UPDATE summaries SET upvotes = ? WHERE id = ?', (new_upvotes, id))
        conn.commit()

        return jsonify({"id": id, "upvotes": new_upvotes}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()


@app.route('/history/<int:id>/downvote', methods=['POST'])
def downvote(id):
    try:
        conn = sqlite3.connect(DATABASE_URL)
        cursor = conn.cursor()

        # Retrieve the current upvotes
        cursor.execute('SELECT downvotes FROM summaries WHERE id = ?', (id,))
        row = cursor.fetchone()

        if row is None:
            return jsonify({"error": "Item not found"}), 404

        # Increment the upvotes count
        new_downvotes = row['downvotes'] + 1
        cursor.execute('UPDATE summaries SET downvotes = ? WHERE id = ?', (new_downvotes, id))
        conn.commit()

        return jsonify({"id": id, "downvotes": new_downvotes}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        conn.close()

@app.route('/history/<int:id>/update', methods=['PUT'])
def visited(id):
    try:
        conn = sqlite3.connect(DATABASE_URL)
        conn.row_factory = sqlite3.Row  # Enable dictionary-like row access
        cursor = conn.cursor()

        # Retrieve the current 'visited' value
        cursor.execute('SELECT visited, visited_at FROM articles WHERE article_id = ?', (id,))
        row = cursor.fetchone()

        if row is None:
            return jsonify({"error": "Item not found"}), 404


        visited = int(row['visited'])
        visited_at = row['visited_at']

        if visited == 0:  # Toggle logic
            visited = 1
            visited_at = datetime.utcnow() # visited date.
        else: 
            visited = 0

        # Update the 'visited' value in the database
        cursor.execute('UPDATE articles SET visited = ?, visited_at = ? WHERE article_id = ?', (visited, visited_at, id))
        conn.commit()

        return jsonify({"id": id, "visited": visited, "visited_at": visited_at}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    finally:
        if 'conn' in locals() and conn:
            conn.close()

@app.route('/sources', methods=['GET'])
def sources():

    try:
        user_email = request.headers.get('User-Email')

        conn = sqlite3.connect(DATABASE_URL)
        cursor = conn.cursor()

        # Get user-id
        cursor.execute("SELECT user_id FROM users WHERE email = ?", (user_email,));
        user_id = cursor.fetchone()[0]
        print("user_id: ", user_id);
        # Get all collections
        cursor.execute("""
            SELECT 
                collections.collection_id AS id,
                       collections.collection_name AS name,
                       collections.url AS url,
                       collections.updated_at AS updated_at

            FROM 
                collections
            WHERE
                collections.user_id = ?
            ORDER BY
                collections.updated_at DESC;
        """, (user_id,))

        rows = cursor.fetchall()

        sources = []

        for row in rows:
            entry = {
                "id": row[0],
                "name": row[1],
                "url": row[2],
                "updated_at": row[3],
            }
            sources.append(entry)
        print("Sources: ", sources)
        conn.close()
        
        return jsonify(sources)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    finally:
        if 'conn' in locals() and conn:
            conn.close()

@app.route('/sources/<string:id>', methods=['DELETE'])
def delete_source(id):
    try:
        print("ID: ", id)
        conn = sqlite3.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute('DELETE FROM articles WHERE collection_id= ?;', (int(id),))
        cursor.execute('DELETE FROM collections WHERE collection_id= ?;', (int(id),))

        print("DOne")

        conn.commit()

        return jsonify({'message': 'Source deleted successfully'}), 200
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    finally:
        if 'conn' in locals() and conn:
            conn.close()

@app.route("/history", methods=["GET"])
def get_history():

    try:
        user_email = request.headers.get('User-Email')
        print("Email: ", user_email)

        conn = sqlite3.connect(DATABASE_URL)
        cursor = conn.cursor()
        cursor.execute("""
            SELECT 
                articles.article_id AS id,
                articles.url,
                articles.isarticle AS page_type,
                articles.summary AS url_summary,
                articles.upvotes,
                articles.downvotes,
                articles.title,
                articles.created_at
            FROM 
                articles
            JOIN 
                collections ON articles.collection_id = collections.collection_id
            JOIN 
                users ON collections.user_id = users.user_id
            WHERE 
                articles.isarticle = 'IsArticle' 
                AND users.email = ?
            ORDER BY 
                articles.created_at DESC;
        """, (user_email,))
        
        rows = cursor.fetchall()

        # Structure the data as a list of dictionaries
        history = []
        for row in rows:
            entry = {
                "id": row[0],
                "url": row[1],
                "page_type": row[2],
                "url_summary": row[3],
                "upvotes": row[4],
                "downvotes": row[5],
                "title": row[6],
                "created_at": row[7],
            }
            history.append(entry)
            
        # Close the database connection
        conn.close()

        return jsonify(history)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500    



def save_user(user_id, user_name, email):
    try:
        conn = sqlite3.connect(DATABASE_URL)
        cursor = conn.cursor()

        cursor.execute('''
            INSERT OR IGNORE INTO users (user_id, user_name, email) VALUES (?, ?, ?)
        ''', (user_id, user_name, email))

        conn.commit()

    except Exception as e:
       logger.error(f"User not saved: {e}")
    
    finally:
        conn.close()

@app.route('/auth/google', methods=['POST'])
def google_auth():
    # Receving google ID token
    token = request.json.get('token')
    print(f"Token:  {token}")
    print(f"Google Client ID: {os.getenv("GOOGLE_CLIENT_ID")}")
    
    try:
        # Verify Google ID Token
        id_info = id_token.verify_oauth2_token(
            token,
            google_requests.Request(),
            "446693240644-4gmvke40c3nocdc7itoqcjb6pp4q1hfe.apps.googleusercontent.com"
        )

        user_id = id_info['sub']
        email = id_info['email']
        name = id_info['name']

        try:
            logger.info(f"SAVE USER: {user_id} {email} {name}")
            save_user(user_id, user_name=name, email=email)
        except Exception as e:
            return jsonify({'error': 'User Sign-In Issue'}), 401

        # Create a JWT token for application
        jwt_token = jwt.encode({
            'user_id': user_id,
            'email': email,
            'name': name,
            'exp': datetime.utcnow() + timedelta(days=1)
        }, os.getenv("JWT_SECRET"), algorithm='HS256')

        return jsonify({'token': jwt_token,
                        'user': {
                            'id': user_id,
                            'email': email,
                            'name': name
                        }}), 200
    except ValueError as e:
        return jsonify({'error': e}), 401

@app.route('/auth/verify', methods=['GET'])
def verify_token():
    # Get the token from Authorization header
    auth_header = request.headers.get('Authorization')
    if not auth_header:
        return jsonify({'error': 'No token provided'}), 401
    
    try:
        # Remove 'Bearer ' from the token
        token = auth_header.split(' ')[1]
        
        # Verify the JWT token
        payload = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=['HS256'])
        
        return jsonify({
            'user': {
                'id': payload['user_id'],
                'email': payload['email'],
                'name': payload['name']
            }
        }), 200
    
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token has expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid token'}), 401
    

@app.route('/health')
def health_check():
    # Log the database path being used
    db_path = os.path.abspath(DATABASE_URL)
    conn = sqlite3.connect(DATABASE_URL)
    print(f"Database path: {db_path}")
    print(f"Database conn: {conn}")
    conn.close()
    return {"status": "ok", "db_path": db_path}, 200

@app.route('/test-db')
def test_db():
    try:
        conn = sqlite3.connect('/data/scraper.db')
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM articles;")
        tables = cursor.fetchall()
        conn.close()
        return {"tables": tables}
    except Exception as e:
        return {"error": str(e)}, 500


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)

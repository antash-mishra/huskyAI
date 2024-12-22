import os
from flask import Flask, g, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import sqlite3
import logging 
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests

from celery_app import scrape_and_store
from scrap import extract_domain_name

from db import init_db
import jwt
import datetime


load_dotenv()

logger = logging.getLogger(__name__)

app = Flask(__name__)

app.config['CELERY_BROKER_URL'] = 'redis://localhost:6379/0'
app.config['CELERY_RESULT_BACKEND'] = 'redis://localhost:6379/0'


CORS(app)

init_db()

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

def save_collection(user_id, url):
    collection_name = extract_domain_name(url)
    try:
        conn = sqlite3.connect('scraper.db')
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO collections (user_id, collection_name, url, created_at, updated_at)
            VALUES (?, ?, ?, datetime('now'), datetime('now'))
        ''', (user_id, collection_name, url))
        
        conn.commit()
    except Exception as e:
        logger.error(f"Collection not saved: {e}")
        return

    finally:
        conn.close()
        return cursor.lastrowid

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
            logger.info("SAVE COLLECTION: {user_id} {url}")
            collection_id = save_collection(user_id=user_id, url=url)
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
        
        conn = sqlite3.connect('scraper.db')
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
        conn = sqlite3.connect('scraper.db')
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


@app.route("/history", methods=["GET"])
def get_history():

    try:
        conn = sqlite3.connect('scraper.db')
        cursor = conn.cursor()

        cursor.execute('SELECT article_id as id, url, isarticle as page_type, summary as url_summary, upvotes, downvotes, title FROM articles where isarticle = \'IsArticle\' ')
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
            }
            history.append(entry)

        # Close the database connection
        conn.close()

        return jsonify(history)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def save_user(user_id, user_name, email):
    try:
        conn = sqlite3.connect('scraper.db')
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

    try:
        # Verify Google ID Token
        id_info = id_token.verify_oauth2_token(
            token,
            google_requests.Request(),
             os.getenv("GOOGLE_CLIENT_ID")
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
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }, os.getenv("JWT_SECRET"), algorithm='HS256')

        return jsonify({'token': jwt_token,
                        'user': {
                            'id': user_id,
                            'email': email,
                            'name': name
                        }}), 200
    except ValueError:
        return jsonify({'error': 'No token provided'}), 401

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


if __name__ == '__main__':
    app.run(debug=True)
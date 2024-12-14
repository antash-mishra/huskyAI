import os
from flask import Flask, g, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import sqlite3
import logging 
from google.oauth2 import id_token
from google.auth.transport import requests as google_requests
from celery_app import scrape_and_store

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

@app.route("/api/scrape", methods=["POST"])
def scrape():
    try:
        data = request.get_json()
        url = data.get('url')


        if not url:
            return jsonify({'error': 'URL is reqiured'}), 400
        
        # Enqueue the task
        task = scrape_and_store.delay(url)

        return jsonify({
            'success': True,
            'message': 'Scraping task has been queued.',
            'task_id': task.id
        }), 202


        # scrapped_data = get_summary(url)
        # logger.warn(f"Scrapped Summary: {scrapped_data}")

        # conn = sqlite3.connect('scraper.db')
        # cursor = conn.cursor()

        # logger.warn(
        #     f"Connection Done: {conn}"
        # )

        # try:
        #     for entry in scrapped_data:
        #         cursor.execute('''
        #             INSERT OR IGNORE INTO summaries (url, page_type, url_summary) 
        #             VALUES (?, ?, ?)
        #         ''', (entry['url'], entry['page_type'], entry['url_summary']))

        #     conn.commit()

        #     return jsonify({
        #         'success': True,
        #         'entry': scrapped_data,
        #         'count': len(scrapped_data)
        #     })

        # except Exception as e:
        #     return jsonify({'error': str(e)}), 500
        
        # finally:
        #     conn.close()

    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/history/<int:id>/upvote', methods=['POST'])
def upvote(id):
    try:
        print(type(id))
        conn = sqlite3.connect('scraper.db')
        cursor = conn.cursor()

        # Retrieve the current upvotes
        cursor.execute('SELECT upvotes FROM summaries WHERE id = ?', (id,))
        row = cursor.fetchone()
        print("Row: ", row[0])
        if row is None:
            return jsonify({"error": "Item not found"}), 404

        print("Type in db: ", type(row[0]))
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

        cursor.execute('SELECT id, url, page_type, url_summary, upvotes, downvotes FROM summaries')
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
                "downvotes": row[5]
            }
            history.append(entry)

        # Close the database connection
        conn.close()

        return jsonify(history)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500


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
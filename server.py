from flask import Flask, g, request, jsonify
from flask_cors import CORS
import sqlite3

from scrap import get_summary
from db import init_db

app = Flask(__name__)
CORS(app)

init_db()

def insert_summary_data(data):
    """
    Inserts summary data into the summaries table with unique URL constraint.
    
    Args:
    - data (list): List of dictionaries containing URL, page type, and summary.
    """



@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

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
        

        scrapped_data = get_summary(url)

        conn = sqlite3.connect('scraper.db')
        cursor = conn.cursor()

        try:
            for entry in scrapped_data:
                cursor.execute('''
                    INSERT OR IGNORE INTO summaries (url, page_type, url_summary) 
                    VALUES (?, ?, ?)
                ''', (entry['url'], entry['page_type'], entry['url_summary']))

            conn.commit()

            return jsonify({
                'success': True,
                'entry': scrapped_data,
                'count': len(scrapped_data)
            })

        except Exception as e:
            return jsonify({'error': str(e)}), 500
        
        finally:
            conn.close()

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route("/history", methods=["GET"])
def get_history():

    try:
        conn = sqlite3.connect('scraper.db')
        cursor = conn.cursor()

        cursor.execute('SELECT url, page_type, url_summary FROM summaries')
        rows = cursor.fetchall()

        # Structure the data as a list of dictionaries
        history = []
        for row in rows:
            entry = {
                "url": row[0],
                "page_type": row[1],
                "url_summary": row[2]
            }
            history.append(entry)

        # Close the database connection
        conn.close()

        return jsonify(history)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
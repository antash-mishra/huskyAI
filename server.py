from flask import Flask, g, request, jsonify
from flask_cors import CORS
import sqlite3

from scrap import get_summary
from db import init_db

app = Flask(__name__)
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

if __name__ == '__main__':
    app.run(debug=True)
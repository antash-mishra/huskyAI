import sqlite3

def init_db():
    conn = sqlite3.connect('scraper.db')
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS summaries (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT UNIQUE,
            page_type TEXT,
            url_summary TEXT,
            upvotes INTEGER DEFAULT 0,
            downvotes INTEGER DEFAULT 0
        )
    ''')
    conn.commit()
    conn.close()
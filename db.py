import sqlite3

def init_db():
    conn = sqlite3.connect('scraper.db')
    cur = conn.cursor()
    cur.execute('''
        CREATE TABLE IF NOT EXISTS summaries (
            url TEXT UNIQUE,
            page_type TEXT,
            url_summary TEXT
        )
    ''')
    conn.commit()
    conn.close()
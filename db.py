import logging
import sqlite3
import os

logger = logging.getLogger(__name__)

userTable = '''
CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id TEXT NOT NULL,
            user_name TEXT UNIQUE NOT NULL,
            email TEXT UNIQUE NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
'''

collectionsTable = '''
CREATE TABLE IF NOT EXISTS collections (
    collection_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    collection_name TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
    UNIQUE (user_id, url) -- Composite unique constraint
);
'''
articleTable = '''
CREATE TABLE IF NOT EXISTS articles (
            article_id INTEGER PRIMARY KEY AUTOINCREMENT,
            collection_id INTEGER NOT NULL,
            url TEXT NOT NULL,
            summary TEXT NOT NULL,
            isarticle TEXT NOT NULL,
            upvotes INTEGER DEFAULT 0,
            downvotes INTEGER DEFAULT 0,
            visited INTEGER DEFAULT 0,
            title TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            visited_at DATETIME,
            FOREIGN KEY (collection_id) REFERENCES collections(collection_id) ON DELETE CASCADE
            UNIQUE (collection_id, url)  -- composite unique constraint
);
'''


def init_db():
    db_path = 'scraper.db'  # Adjust this if your volume is mounted elsewhere
    if not os.path.exists(db_path):
        logger.info(f"Database file does not exist at {db_path}, creating new one.")

    conn = sqlite3.connect('scraper.db', check_same_thread=False)
    conn.execute("PRAGMA journal_mode=WAL;")
    cur = conn.cursor()
    cur.execute(userTable)
    cur.execute(collectionsTable)
    cur.execute(articleTable)
    logger.info("Connection Developed: ", conn)
    conn.commit()
    conn.close()
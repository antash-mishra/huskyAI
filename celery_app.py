from celery import Celery
import logging
import sqlite3

from scrap import get_summary

logger = logging.getLogger(__name__)

celery = Celery(
    'celery_app',
    broker='redis://localhost:6379/0',  # Replace with your Redis broker URL
    backend='redis://localhost:6379/0'
)

@celery.task
def scrape_and_store(url):

    try:        
        scrapped_data = get_summary(url)
        logger.warn(f"Scrapped Summary: {scrapped_data}")

        conn = sqlite3.connect('scraper.db')
        cursor = conn.cursor()

        logger.warn(
            f"Connection Done: {conn}"
        )

        try:
            for entry in scrapped_data:
                cursor.execute('''
                    INSERT OR IGNORE INTO summaries (url, page_type, url_summary) 
                    VALUES (?, ?, ?)
                ''', (entry['url'], entry['page_type'], entry['url_summary']))

            conn.commit()
        
        finally:
            conn.close()

    except Exception as e:
        logger.error(f"Error in scrape_and_store: {e}")
        raise e
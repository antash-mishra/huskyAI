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
def scrape_and_store(collection_id,url):

    try:        
        # Create connection with sqlite and create cursor for execution
        conn = sqlite3.connect('scraper.db')
        cursor = conn.cursor()
        logger.info(
            f"Connection Done: {conn}"
        )

        # Call get_summary to get summary and other paarmeters 
        # and save in the articles table in database
        get_summary(
            url,
            collection_id=collection_id,
            cursor=cursor,
            conn=conn
        )
        logger.info(f"Scrapped Done")

    except Exception as e:
        logger.error(f"Error in scrape_and_store: {e}")
        raise e
    
    finally:
        conn.close()
        logger.info(f"database connection closed")
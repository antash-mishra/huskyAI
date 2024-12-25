from celery import Celery
import logging
import sqlite3
import os
from db import init_db
from scrap import get_summary

logger = logging.getLogger(__name__)

init_db()

celery = Celery(
    'celery_app',
    broker=os.getenv('CELERY_BROKER_URL'),  # Replace with your Redis broker URL
    backend=os.getenv('CELERY_RESULT_BACKEND')
)

DATABASE_URL = "/data/scraper.db"
@celery.task
def scrape_and_store(collection_id,url):

    try:        
        # Create connection with sqlite and create cursor for execution
        conn = sqlite3.connect(DATABASE_URL, check_same_thread=False)
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

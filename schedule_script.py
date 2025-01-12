import sqlite3
import requests
from bs4 import BeautifulSoup
import logging
from datetime import datetime
from scrap import get_webtext, extract_domain_name
from llm import call_llm
from parser import get_domain_hyperlinks
# Setup Looging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

DATABASE_URL = 'scraper.db'  # Update to your SQLite DB path


def scrape_url(url, depth=1, max_depth=2, processed_urls=None):
    """
    Recursively scrape a URL, get content summaries, and navigate nested links up to a given depth.
    
    :param url: The starting URL to scrape.
    :param depth: Current depth of recursion.
    :param max_depth: Maximum recursion depth allowed.
    :param processed_urls: Set of URLs already processed to avoid redundancy.
    :return: A list of summaries for the current and nested URLs.
    """
    if depth > max_depth:
        # Stop recursion when max depth is reached
        return []

    if processed_urls is None:
        # Initialize the set to track processed URLs
        processed_urls = set()

    if url in processed_urls:
        # Skip already processed URLs
        logger.info(f"Skipping already processed URL: {url}")
        return []

    logger.info(f"Processing URL at depth {depth}: {url}")
    processed_urls.add(url)

    local_domain = extract_domain_name(url)
    logger.info(f"Local-domain name: {local_domain}")

    try:
        # Fetch and clean the content from the main URL
        cleaned_body_content, article_title = get_webtext(url)

        if cleaned_body_content != '':
        # Get the summary and page type
            llm_response, url_type = call_llm(cleaned_body_content)
        else:
            llm_response = ''
            url_type = 'NotArticle'

        # Initialize the parent response
        parent_response = {"url": url, "page_type": url_type, "url_summary": llm_response, "title": article_title}
        
        all_responses = [parent_response]

        # If the page type is valid, retrieve hyperlinks for nested scraping
        if url_type:
            url_hyperlinks = get_domain_hyperlinks(local_domain=local_domain, url=url)
            logger.info(f"Total Number of hyperlinks found: {len(url_hyperlinks)}")
            unique_links = set(url_hyperlinks) - processed_urls  # Filter only unprocessed links

            for link in list(unique_links)[:2]:
                try:
                    logger.info(f"Processing nested link: {link}")

                    # Recursively fetch summaries for nested links
                    nested_response = scrape_url(link, depth=depth + 1, max_depth=max_depth, processed_urls=processed_urls)
                    all_responses.extend(nested_response)
                except Exception as e:
                    logger.error(f"Error processing link {link}: {e}")
                    continue  # Skip to the next link in case of an error        
        return all_responses  # Return all scraped data (parent and nested)
    except Exception as e:
        logger.error(f"Error processing URL {url}: {e}")
        return []
    
def insert_article(collection_id, user_id, scraped_data, cursor, conn):
    """
    Insert scraped articles into the database for a given user and collection.
    :param collection_id: The collection ID where the article belongs.
    :param user_id: The user ID to associate with the articles.
    :param scraped_data: The list of scraped data to be inserted.
    :param cursor: The database cursor object.
    :param conn: The database connection object.
    :return: The list of inserted article IDs or None in case of failure.
    """
    inserted_article_ids = []

    try:
        for article in scraped_data[:1]:
            url = article['url']
            title = article.get('title', '')
            url_summary = article.get('url_summary', '')
            page_type = article.get('page_type', 'NotArticle')

            # Insert the article only if the URL doesn't already exist for the given user and collection
            cursor.execute('''
                INSERT OR IGNORE INTO articles (collection_id, url, summary, isarticle, title, created_at)
                SELECT collection_id, ?, ?, ?, ?, datetime('now')
                FROM collections WHERE collection_id = ? AND user_id = ?;
            ''', (url, url_summary, page_type, title, collection_id, user_id))

            # Fetch the last inserted article ID
            cursor.execute('SELECT last_insert_rowid()')
            article_id = cursor.fetchone()[0]

            if article_id:
                inserted_article_ids.append(article_id)

        # Update the updated_at timestamp for the collection
        cursor.execute('''UPDATE collections SET updated_at = ? WHERE collection_id = ?''', (datetime.now(), collection_id))

        conn.commit()
        logger.info(f"Inserted {len(inserted_article_ids)} articles for user {user_id}, collection {collection_id}")
        return inserted_article_ids

    except Exception as e:
        logger.error(f"Error inserting articles for user {user_id}, collection {collection_id}: {e}")
        conn.rollback()
        return None



def scrape_and_store_all_urls():

    try:
        conn = sqlite3.connect(DATABASE_URL)
        cursor = conn.cursor()

        # Fetch all distinct URLs from the collections table
        cursor.execute('SELECT DISTINCT url FROM collections')
        urls = cursor.fetchall()

        for url_tuple in urls:
            url = url_tuple[0]
            logger.info(f"Processing URL: {url}")

            # Scrape the URL and nested links
            scrapped_data = scrape_url(url)
            print("Scrapped Data: ", scrapped_data)
            if scrapped_data:
                # Insert into article table for each user_id
                cursor.execute('SELECT user_id FROM collections WHERE url = ?', (url,))
                user_ids = cursor.fetchall()

                for user_id_tuple in user_ids:
                    user_id = user_id_tuple[0]
                    cursor.execute('SELECT collection_id FROM collections WHERE user_id = ? AND url = ?', (user_id, url))
                    
                    collection_id = cursor.fetchone()[0]
                    
                    # Insert the scrapped article
                    insert_article(collection_id, user_id, scrapped_data, cursor, conn)
        conn.close()

    except Exception as e:
        logger.error(f"Error in scrape_and_store_all_urls: {e}")
        if conn:
            conn.close()

if __name__ == '__main__':
    scrape_and_store_all_urls()

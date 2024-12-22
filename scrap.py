import requests
import logging
from html.parser import HTMLParser
from urllib.parse import urlparse
from collections import deque
from bs4 import BeautifulSoup
import re
import os
import asyncio
from pyppeteer import launch
from goose3 import Goose

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chromium.remote_connection import ChromiumRemoteConnection
from selenium.webdriver import Remote, ChromeOptions
from PIL import Image

import time

from parser import get_domain_hyperlinks
from llm import call_llm

logger = logging.getLogger(__name__)

g = Goose()

def get_localdomain(url):
    regex_pattern = r"https://([^/]+\.com)"
    match = re.search(regex_pattern, url)
    extracted_string = match.group(1) if match else None
    return extracted_string

def extract_domain_name(url):
    # Parse the URL
    parsed_url = urlparse(url)
    # Get the domain (hostname)
    hostname = parsed_url.hostname or parsed_url.path
    # Remove subdomains and top-level domains (TLDs)
    domain_parts = hostname.split('.')
    if len(domain_parts) > 2:
        # For domains with subdomains like news.ycombinator.com
        return domain_parts[-2]
    elif len(domain_parts) == 2:
        # For domains without subdomains like lobste.rs
        return domain_parts[0]
    else:
        # Return as is (rare case)
        return hostname


def remove_elements_with_few_words(arr):
    # Filter out elements where the number of words is less than 3
    return [element for element in arr if len(element.split()) >= 3]

def get_webtext(url):

    # Get the text from the URL using BeautifulSoup

    article = g.extract(url = url)

    cleaned_body_content = article.cleaned_text
    article_title = article.title
    # soup = BeautifulSoup(requests.get(url).text, "html.parser")
    # text = str(soup.body())

    # cleaned_body_content = clean_body_content(text)
    #print("Cleaned body content: ", cleaned_body_content)
        
    #take_screenshot(url, local_domain)    
    return cleaned_body_content,article_title

def get_summary(url, depth=1, max_depth=2, processed_urls=None, collection_id=None, cursor=None, conn=None):
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

        if clean_body_content != '':
        # Get the summary and page type
            llm_response, url_type = call_llm(cleaned_body_content)
        else:
            llm_response = ''
            url_type = 'NotArticle'

        # Initialize the parent response
        parent_response = {"url": url, "page_type": url_type, "url_summary": llm_response, "title": article_title}
        
        if cursor and collection_id is not None:
            cursor.execute('''
                INSERT OR IGNORE INTO articles (collection_id, url, summary, isarticle, upvotes, downvotes, title) 
                VALUES (?, ?, ?, ?, 0, 0, ?)
            ''', (collection_id, url, llm_response, url_type, article_title))

            conn.commit()
            logger.info(f"Inserted article into database: {url}")

        # If the page type is valid, retrieve hyperlinks for nested scraping
        if url_type:
            url_hyperlinks = get_domain_hyperlinks(local_domain=local_domain, url=url)
            logger.info(f"Total Number of hyperlinks found: {len(url_hyperlinks)}")
            unique_links = set(url_hyperlinks) - processed_urls  # Filter only unprocessed links

            for link in unique_links:
                try:
                    logger.info(f"Processing nested link: {link}")

                    # Recursively fetch summaries for nested links
                    get_summary(link, depth=depth + 1, max_depth=max_depth, processed_urls=processed_urls,
                                collection_id=collection_id, cursor=cursor, conn=conn)

                except Exception as e:
                    logger.error(f"Error processing link {link}: {e}")
                    continue  # Skip to the next link in case of an error

    except Exception as e:
        logger.error(f"Error processing URL {url}: {e}")
        return []


def clean_body_content(body_content):
    
    soup = BeautifulSoup(body_content, "html.parser")

    for script_or_style in soup(["script", "style"]):
        script_or_style.extract()

    # Get text or further process the content
    cleaned_content = soup.get_text(separator="\n")
    # print(cleaned_content)
    cleaned_content = "\n".join(
        line.strip() for line in cleaned_content.splitlines() if line.strip()
    )

    cleaned_content_array = cleaned_content.split('\n')
    filtered_cleaned_content_array = remove_elements_with_few_words(cleaned_content_array)
    filtered_cleaned_content = " ".join(filtered_cleaned_content_array)

    return filtered_cleaned_content


def split_dom_content(dom_content, max_length=6000):
    return [
        dom_content[i : i + max_length] for i in range(0, len(dom_content), max_length)
    ]

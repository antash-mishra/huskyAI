from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, StaleElementReferenceException
from selenium.webdriver.remote.webelement import WebElement
from html.parser import HTMLParser
from urllib.parse import urlparse, urljoin
import time
import re
import urllib.request
import os
from bs4 import BeautifulSoup
from collections import deque
import requests
from typing import Set
import logging

logger = logging.getLogger(__name__)

def is_valid_webpage_url(url: str) -> bool:
    """
    Check if the URL is a valid webpage link (not mailto, tel, javascript, anchor, etc.)
    
    Args:
        url (str): URL to check
        
    Returns:
        bool: True if URL is a valid webpage link, False otherwise
    """
    if not url:
        return False
        
    # Convert to lowercase for checking
    url_lower = url.lower().strip()
    
    # List of invalid URL patterns
    invalid_patterns = [
        'mailto:',
        'tel:',
        'javascript:',
        'data:',
        'ftp:',
        'file:',
        'whatsapp:',
        'sms:',
        'market:'
    ]
    
    # Check for invalid patterns
    if any(pattern in url_lower for pattern in invalid_patterns):
        return False
        
    # Check if it's just an anchor link
    if url_lower.startswith('#'):
        return False
        
    try:
        # Parse the URL
        parsed = urlparse(url)
        
        # Check if it has a valid scheme and netloc (domain)
        if not all([parsed.scheme in ['http', 'https'], parsed.netloc]):
            return False
            
        # Exclude URLs that end with file extensions we don't want
        invalid_extensions = [
            '.pdf', '.jpg', '.jpeg', '.png', '.gif', '.doc', '.docx',
            '.xls', '.xlsx', '.zip', '.tar', '.gz', '.exe', '.dmg'
        ]
        if any(url_lower.endswith(ext) for ext in invalid_extensions):
            return False
            
        return True
        
    except Exception:
        return False

def retry_on_stale_element(max_retries: int = 3, delay: float = 1):
    """
    Decorator to retry operations when StaleElementReferenceException occurs
    """
    def decorator(func):
        def wrapper(*args, **kwargs):
            for attempt in range(max_retries):
                try:
                    return func(*args, **kwargs)
                except StaleElementReferenceException:
                    if attempt == max_retries - 1:
                        raise
                    time.sleep(delay)
            return None
        return wrapper
    return decorator

@retry_on_stale_element()
def get_href_safely(element: WebElement) -> str:
    """
    Safely extract href attribute from an element with retry logic
    """
    return element.get_attribute("href")

def get_domain_hyperlinks(local_domain, url: str, wait_time: int = 10) -> Set[str]:
    """
    Scrapes all unique webpage links from a webpage, filtering out non-webpage URLs.
    
    Args:
        url (str): The URL of the webpage to scrape
        wait_time (int): Maximum time to wait for page to load in seconds
        
    Returns:
        set: A set of unique absolute webpage URLs found on the page
    """
    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    options.add_argument('--disable-dev-shm-usage')
    options.add_argument('--disable-gpu')
    options.binary_location = '/usr/bin/google-chrome'

    driver = webdriver.Chrome(options=options)
    unique_links = set()
    
    try:
        # Load the page
        driver.get(url)
        
        # Wait for the page to load and stabilize
        try:
            WebDriverWait(driver, wait_time).until(
                EC.presence_of_element_located((By.TAG_NAME, "body"))
            )
            # Additional wait for dynamic content
            time.sleep(2)
        except TimeoutException:
            logger.info(f"Warning: Page took longer than {wait_time} seconds to load")
        
        # Execute JavaScript to get all href attributes
        links = driver.execute_script("""
            const links = document.getElementsByTagName('a');
            return Array.from(links).map(link => link.href).filter(href => href);
        """)
        
        # Process links
        base_domain = urlparse(url).netloc
        for href in links:
            try:
                if href and is_valid_webpage_url(href):
                    # Convert relative URLs to absolute URLs
                    absolute_url = urljoin(url, href)
                    unique_links.add(absolute_url)
            except Exception as e:
                logger.info(f"Error processing link {href}: {str(e)}")
        
        # Backup method: try to get any links that might have been missed
        try:
            elements = WebDriverWait(driver, 3).until(
                EC.presence_of_all_elements_located((By.TAG_NAME, "a"))
            )
            
            for element in elements:
                try:
                    href = get_href_safely(element)
                    if href and is_valid_webpage_url(href):
                        absolute_url = urljoin(url, href)
                        unique_links.add(absolute_url)
                except Exception as e:
                    continue
                    
        except Exception as e:
            logger.error(f"Backup link extraction encountered an error: {str(e)}")
            
        return unique_links
    
    except Exception as e:
        logger.error(f"An error occurred: {str(e)}")
        return set()
    
    finally:
        driver.quit()
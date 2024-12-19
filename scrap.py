import requests
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
        print(f"Skipping already processed URL: {url}")
        return []

    print(f"Processing URL at depth {depth}: {url}")
    processed_urls.add(url)

    local_domain = extract_domain_name(url)
    print("Local-domain name:", local_domain)

    try:
        # Fetch and clean the content from the main URL
        cleaned_body_content, article_title = get_webtext(url)

        # Get the summary and page type
        llm_response, url_type = call_llm(cleaned_body_content)

        # Initialize the parent response
        parent_response = {"url": url, "page_type": url_type, "url_summary": llm_response, "title": article_title}
        all_llm_response = [parent_response]

        # If the page type is valid, retrieve hyperlinks for nested scraping
        if url_type:
            url_hyperlinks = get_domain_hyperlinks(local_domain=local_domain, url=url)
            print(f"Total Number of hyperlinks found: {len(url_hyperlinks)}")
            unique_links = set(url_hyperlinks) - processed_urls  # Filter only unprocessed links

            for link in unique_links:
                try:
                    print(f"Processing nested link: {link}")

                    # Recursively fetch summaries for nested links
                    nested_summary = get_summary(link, depth=depth + 1, max_depth=max_depth, processed_urls=processed_urls)
                    if nested_summary:
                        all_llm_response.extend(nested_summary)

                except Exception as e:
                    print(f"Error processing link {link}: {e}")
                    continue  # Skip to the next link in case of an error

        return all_llm_response

    except Exception as e:
        print(f"Error processing URL {url}: {e}")
        return []


def clean_body_content(body_content):
    print("Type of body content: ", type(body_content))
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



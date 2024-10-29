import requests
from html.parser import HTMLParser
from urllib.parse import urlparse
from collections import deque
from bs4 import BeautifulSoup
import re
import os
import asyncio
from pyppeteer import launch

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chromium.remote_connection import ChromiumRemoteConnection
from selenium.webdriver import Remote, ChromeOptions
from PIL import Image

import time

from parser import get_domain_hyperlinks
from llm import call_llm

def get_localdomain(url):
    regex_pattern = r"https://([^/]+\.com)"
    match = re.search(regex_pattern, url)
    extracted_string = match.group(1) if match else None
    return extracted_string

# def clean_text(text):
#     # Remove unwanted symbols (like \' or \n or any other special characters)
#     cleaned_text = re.sub(r"[^\w\s,.]", "", text)  # Keeps letters, numbers, spaces, commas, and periods

#     # Replace multiple spaces with a single space
#     cleaned_text = re.sub(r"\s+", " ", cleaned_text)

#     #cleaned_text = cleaned_text.replace("\n", " ")

#     # Trim leading and trailing spaces
#     cleaned_text = cleaned_text.strip()
    66
#     return cleaned_text

def remove_elements_with_few_words(arr):
    # Filter out elements where the number of words is less than 3
    return [element for element in arr if len(element.split()) >= 3]

def get_webtext(url):
    local_domain = get_localdomain(url)
    # print("Local domain: ", local_domain)

    #Hyperlinks in the URL
    url_hyperlink = get_domain_hyperlinks(local_domain=local_domain, url=url)
    #print("URL Hyperlinks: ", url_hyperlink)

    # Get the text from the URL using BeautifulSoup
    soup = BeautifulSoup(requests.get(url).text, "html.parser")


    text = str(soup.body())
    cleaned_body_content = clean_body_content(text)
    #print("Cleaned body content: ", cleaned_body_content)
        
    #take_screenshot(url, local_domain)    
    return cleaned_body_content

def get_summary(url, depth=1, max_depth=2):
    if depth > max_depth:
        # Prevents excessive recursion
        return []

    local_domain = get_localdomain(url)

    try:
        # Fetch and clean the content from the main URL
        cleaned_body_content = get_webtext(url)
        
        # Get the summary and page type
        llm_response, url_type = call_llm(cleaned_body_content)
        
        # Initialize the parent response
        parent_response = {"url": url, "page_type": url_type, "url_summary": llm_response}
        all_llm_response = [parent_response]

        # If the page type is "multiple," retrieve hyperlinks for nested scraping
        if url_type == "multiple":
            url_hyperlinks = get_domain_hyperlinks(local_domain=local_domain, url=url)

            for link in url_hyperlinks[:5]:
                try:
                    print("Processing Link: ", link)
                    
                    # Recursively fetch summaries for nested links
                    nested_summary = get_summary(link, depth=depth + 1, max_depth=max_depth)
                    print("Nested summary: ", nested_summary)

                    if nested_summary:
                        # Append the summary of a nested page if available
                        all_llm_response.extend(nested_summary)

                except Exception as e:
                    print(f"Error processing link {link}: {e}")
                    # Continue to the next link if an error occurs
                    continue

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



import requests
from html.parser import HTMLParser
from urllib.parse import urlparse
from collections import deque
from bs4 import BeautifulSoup
import re
import os

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
    
#     return cleaned_text

def remove_elements_with_few_words(arr):
    # Filter out elements where the number of words is less than 3
    return [element for element in arr if len(element.split()) >= 3]

def get_webtext(url):
    local_domain = get_localdomain(url)

    if not os.path.exists("text/"+local_domain+"/"):
        os.mkdir("text/" + local_domain + "/")
    with open('text/'+local_domain+'/'+url[8:].replace("/", "_") + ".txt", "w", encoding="UTF-8") as f:

        # Get the text from the URL using BeautifulSoup
        soup = BeautifulSoup(requests.get(url).text, "html.parser")


        text = str(soup.body())
        print("Text: ", text)
        cleaned_body_content, cleaned_body_array = clean_body_content(text)

        # If the crawler gets to a page that requires JavaScript, it will stop the crawl
        if ("You need to enable JavaScript to run this app." in cleaned_body_content):
            print("Unable to parse page " + url + " due to JavaScript being required")
        
        f.write(cleaned_body_content)

        return cleaned_body_content

def clean_body_content(body_content):
    print("Type of body content: ", type(body_content))
    soup = BeautifulSoup(body_content, "html.parser")

    for script_or_style in soup(["script", "style"]):
        script_or_style.extract()

    # Get text or further process the content
    cleaned_content = soup.get_text(separator="\n")
    print(cleaned_content)
    cleaned_content = "\n".join(
        line.strip() for line in cleaned_content.splitlines() if line.strip()
    )

    cleaned_content_array = cleaned_content.split('\n')
    filtered_cleaned_content_array = remove_elements_with_few_words(cleaned_content_array)
    filtered_cleaned_content = " ".join(filtered_cleaned_content_array)

    return filtered_cleaned_content, filtered_cleaned_content_array


def split_dom_content(dom_content, max_length=6000):
    return [
        dom_content[i : i + max_length] for i in range(0, len(dom_content), max_length)
    ]
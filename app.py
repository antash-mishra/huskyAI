import requests
from html.parser import HTMLParser
from urllib.parse import urlparse
from collections import deque
from bs4 import BeautifulSoup
import re
import urllib.request
import os
import streamlit as st
from scrap import get_webtext
from llm import call_llm, check_url_type

#req = BeautifulSoup(requests.get(full_url).text, "html.parser").get_text()
#print(req)

#hello = crawl(full_url)

st.write("""
    # Scrape Anything
""")

url = st.text_input("Website link")
# print(url)

llm_response = None
if st.button("Scrape Website"):

    content = get_webtext(url)
    print("content: ", content)
    
    llm_response, url_type = call_llm(content)
    print(llm_response)
    
    st.session_state.dom_content = content
    
    st.write("URL Type:" + url_type)
    st.write(llm_response)

if "dom_content" in st.session_state:
    urls_hyperlink = st.multiselect("Buy", st.session_state.dom_content)
    if st.button("Submit"):
        st.write(urls_hyperlink)
        #st.write(llm_response)
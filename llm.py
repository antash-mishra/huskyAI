from openai import OpenAI
from groq import Groq
import os



client = OpenAI(
  base_url = "https://integrate.api.nvidia.com/v1",
  api_key = "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"
)

# client_groq = Groq()

client_groq = Groq(
  api_key="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"
)


def call_llm(article_text):

    completion = client.chat.completions.create(
      model="abacusai/dracarys-llama-3.1-70b-instruct",
      messages=[{"role": "user", "content": f"Summarize the following article scraped from website: {article_text}"}],
      temperature=1,
      top_p=1,
      max_tokens=1024,
      stream=False
    )
    print("Response LLM: ", completion)
    result = completion.choices[0].message.content
    print("Response LLM: ", result)
    url_type = check_url_type(result)

    return result, url_type

# def call_llm(article_text):
#     try:
#         # Request summary from the NVIDIA LLaMA model using Groq
#         completion = client_groq.chat.completions.create(
#             model="llama-3.2-90b-text-preview",
#             messages=[{"role": "user", "content": f"Summarize the following article scraped from website: {article_text}"}],
#             temperature=1,
#             top_p=1,
#             max_tokens=1024,
#             stream=False
#         )
#         print("Response LLM: ", completion)
        
#         # Extract the summary text
#         result = completion.choices[0].message.content
#         print("Response LLM: ", result)
        
#         # Determine URL type based on the result
#         url_type = check_url_type(result)
        
#         return result, url_type

#     except Exception as e:
#         print(f"Error in call_llm: {e}")
#         return None, None


def check_url_type(article_text):
    system_prompt = """
      You are an article classification tool that receives a summarized version of text from a scraped website. Your task is to determine whether the content contains a single article or multiple articles, with no single article as the center of attention.

   
      1. **Criteria for Classification**:
        - If the summary focuses on one main article or topic, respond with "single."
        - If the summary covers various articles or topics with no clear central article, respond with "multiple."

      2. **Input Format**:
        - You will receive a summary of the content from a scraped website.

      3. **Output Requirements**:
        - Your response must be **only** "single" or "multiple" without any additional explanation, context, or information.

      4. **Instructions**:
        - Analyze the summary to determine if it reflects one single article or multiple articles.
        - Ensure the output is strictly either "single" or "multiple" and nothing else.
    """
    message = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": article_text},
    ]
    completion = client_groq.chat.completions.create(
        model="llama-3.1-70b-versatile",
        messages=message,
        temperature=1,
        top_p=1,
        max_tokens=1024,
        stream=False
    )
    result = completion.choices[0].message.content
    print("Response LLM: ", result)

    return result



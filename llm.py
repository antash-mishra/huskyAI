from openai import OpenAI
from groq import Groq
import os
from langchain_groq import ChatGroq
from langchain_text_splitters import CharacterTextSplitter, RecursiveCharacterTextSplitter
from langchain.docstore.document import Document
from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import ChatPromptTemplate


client_groq = Groq(
  api_key=os.environ.get("GROQ_API_KEY")
)

llm = ChatGroq(model="llama-3.3-70b-versatile")


def call_llm(article_text):

  print("TYpe: ", type(article_text))

  # Use a text splitter optimized for longer documents
  text_splitter = text_splitter = CharacterTextSplitter.from_tiktoken_encoder(
    separator= " ",
    chunk_size=3500,  # Slightly larger chunk size
    chunk_overlap=0,  # Significant overlap to maintain context
)

  # doc = Document(page_content=article_text)
  # print("doc: ", doc)

  split_docs = text_splitter.split_text(article_text)

  documents = [Document(page_content=chunk) for chunk in split_docs]

  print(f"Generated {len(documents)} documents.")

  map_prompt = ChatPromptTemplate.from_messages(
    [("human", 
      "Write a concise summary of the following chunked part of article scraped from website. **Just write the 1-2 sentence summary nothing else.**:\n{context}")]
  )
  
  map_chain = map_prompt | llm | StrOutputParser()

  chunk_summaries = []
  for i,chunk in enumerate(documents):
    context = chunk.page_content
    chunk_summary = map_chain.invoke({"context": context})
    print("Chunk Summary {i}: ", chunk_summary)
    chunk_summaries.append(chunk_summary)

  print(f"Generated summaries for {len(chunk_summaries)} chunks.")

  # Step 3: Reduce all summaries into a single consolidated summary
  reduce_template = """
  The following is a set of summaries:
  {docs}
  Take these and distill them into a final, consolidated summary of the main themes. **Just write the summary and nothing else**
  """
  
  reduce_prompt = ChatPromptTemplate.from_messages(
    [("human", reduce_template)]
  )
    
  reduce_chain = reduce_prompt | llm | StrOutputParser()

  # Prepare summaries for reduction
  docs_input = "\n".join(chunk_summaries)
  final_summary = reduce_chain.invoke({"docs": docs_input})

  url_type = check_url_type(final_summary)

  return final_summary, url_type


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



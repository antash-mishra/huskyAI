## Scrape Anything (HuskyAI)

### Demo

![2025-01-02 13-10-10](https://github.com/user-attachments/assets/08b67ef2-cab1-4305-9ee0-8a1519f04db3)

### Starting backend server

* Create a venv in the main folder
* Then `pip install -r reqirements.txt`
* Add Groq api key and nvidia api key in .env.local
* Lastly run `flask --app server run --debug`
    ** This starts a server at port 5000

### Starting front-end client (written in Next.js)

* move to `snatched-crawler-client` folder => `cd snatched-crawler-client` 
* Then, Install package.json by `npm install package.json`
* At last `npx next dev`
    ** This will start the client-side at port 3000 

### Starting celery worker

* Install `pip install celery[redis] redis`
* Install redis. Source - [Install Celery](https://redis.io/docs/latest/operate/oss_and_stack/install/install-redis/install-redis-on-linux/)
* Run redis server. Checkout the above source.
* Run Celery Worker `GROQ_API_KEY="add-api-key" celery -A celery_app.celery worker --loglevel=info`


### TODO

* ~~Add sign-in page~~
* ~~Work on Improvement of User engagement. (While scrapping move it to the background and show the previous news)~~
* ~~Creating collection~~
* ~~Way to only show articles in the feed. We are scraping pages which are not articles in the page for ex. headers of page. It shows up in the feed?~~
* ~~Develop quantized LLM model for classification of scrapped text (Article or Not)~~
* Work on scheduled updation of provided URL by user to make news or articles refreshed.
* Change database schema
* Way to scrape each collection only once but add in collection for each user
* Show recommendation for collections that can be scrapped.
* Future Work: Rightnow we add the whole url of the website that needs to be scrapped. Way that user don't need to write the url but just the source name and get recommendation or something. 

## Scrape Anything (HuskyAI)

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


### TODO

* Add sign-in page
* Work on Improvement of User engagement. (While scrapping move it to the background and show the previous news)
* Work on scheduled updation of provided URL by user to make news or articles refreshed.

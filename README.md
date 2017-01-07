# Pin the World

## How to get the frontend up and running

1. Make sure you have `npm` installed
2. `cd` into `js-src/`
3. Run `npm install` (this might take a while the first time)
4. Run `npm start` (this will start the local webpack server)
5. Navigate to `localhost:8081` in your favorite browser

## How to get the backend up and running

1. make sure you have postman, python 2.7, pip and the app engine python dev kit installed (https://cloud.google.com/appengine/docs/python/download - WARNING: you have to click "Optionally, you can also download the original App Engine SDK for Python.")
2. open a terminal window and go the python-src directory
3. install dependencies by running `pip install -r requirements.txt -t lib`
4. start local development server `dev_appserver.py .`
5. import postman collections from ./doc/postman/ into postman and set up a `url` environment variable (should probably be http://localhost:8080)
6. run the "Pin the World - Cities" collection to create some cities
7. run the "Pin the World - Test All" collection (all tests should succeed)

## Multi-player
For this to work, the game has to be deployed on the python server, as it will be in production.
In js-src, run `npm run dev-build`, this will create the sources to /python-src/webapp and keep it up to date as with the dev server
run the python server as usual, calling http://localhost:8081/ will then be the url of the frontend AND the backend (with /api/)

## Files that were modified by the team
In SourceB/javascript:
	webpack.dev.js - 2 lines were modified, 10% in this file
	vendor.js - 2 lines were modified, 22% in this file
	webpack.common.js - 10 lines were modified, 18% in this file
	webpack.test.js - 5 lines were modified, 14% in this file
	main.js - 4 lines were modified, 44% in this file
In SourceB/misc:
	package.json - 11 lines modified, 17% in this file
	
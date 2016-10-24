# Pin the World

## How to get the frontend up and running

1. Make sure you have `npm` installed
2. `cd` into `js-src/`
3. Run `npm install` (this might take a while the first time)
4. Run `npm start` (this will start the local webpack server)
5. Navigate to `localhost:3000` in your favorite browser

## How to get the backend up and running

1. make sure you have postman, python 2.6, pip and the app engine python dev kit installed
2. open a terminal window and go the python-src directory
3. install dependencies by running `pip install -r requirements.txt -t lib`
4. start local development server `dev_appserver.py .`
5. import postman collections from ./doc/postman/ into postman and set up a `url` environment variable (should probably be http://localhost:8080)
6. run the "Pin the World - Cities" collection to create some cities
7. run the "Pin the World - Test All" collection (all tests should succeed)

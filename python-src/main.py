import logging

from flask import Flask
from flask_restful import Api
from resources import *

app = Flask(__name__)
api = Api(app, prefix='/api')

api.add_resource(CityResource, '/cities')

api.add_resource(PlayersResource, '/players')
api.add_resource(PlayerResource, '/players/<player_id>')

api.add_resource(GamesResource, '/games')
api.add_resource(GameResource, '/games/<game_id>')

api.add_resource(GuessResource, '/games/<game_id>/guesses')

api.add_resource(HighscoreResource, '/highscores')
api.add_resource(GameScoreResource, '/highscores/<game_id>')


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
    return response


@app.errorhandler(500)
def server_error(e):
    logging.exception(e)
    return e, 500

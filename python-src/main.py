import logging

from flask import Flask
from flask_restful import Api
from resources import *

app = Flask(__name__)
api = Api(app, prefix='/api')
api.add_resource(CityResource, '/cities')
api.add_resource(GameResource, '/games/<game_id>')
api.add_resource(GuessResource, '/games/<game_id>/guesses')

@app.errorhandler(500)
def server_error(e):
    logging.exception(e)
    return e, 500

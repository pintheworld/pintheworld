from model import *
from google.appengine.ext.ndb.model import KeyProperty
from flask import request
from flask_restful import Resource
import random


def json_handler(obj):
    return dict([(p, unicode(getattr(obj, p))) for p in obj._properties])


class GameResource(Resource):
    def get(self, game_id):
        if game_id:
            return Game.get_by_id(int(game_id)).to_dict()
        else:
            return [dict(p.to_dict(), **dict(id=p.key.id())) for p in Game.query()]

    def post(self):
        game = Game()
        game.noOfPlayers = random.randint(1, 4)
        game.put()
        return {"id": game.key.id()}, 201

    def delete(self):
        ndb.delete_multi(Game.query().fetch(keys_only=True))


class CityResource(Resource):
    def get(self):
        return [dict(p.to_dict(), **dict(id=p.key.id())) for p in City.query()]

    def post(self):
        request_data = request.get_json()
        city = City()
        city.name = request_data['name']
        city.long = request_data['long']
        city.lat = request_data['lat']
        city.put()
        return {"id": city.key.id()}, 201

    def delete(self):
        ndb.delete_multi(City.query().fetch(keys_only=True))


class GuessResource(Resource):
    def get(self, game_id):
        game = Game.get_by_id(int(game_id))
        # return [dict(p.to_dict(), **dict(id=p.key.id())) for p in Guess.query(ancestor=game.key)]
        return [json_handler(p) for p in Guess.query(ancestor=game.key)]

    def post(self, game_id):
        request_data = request.get_json()
        guess = Guess(parent=Game.get_by_id(int(game_id)).key)
        # guess.player = Player.get_by_id(request_data['player'])
        guess.city = City.get_by_id(int(request_data['city'])).key
        guess.long = request_data['long']
        guess.lat = request_data['lat']
        guess.put()
        return {"id": guess.key.id()}, 201

    def delete(self):
        ndb.delete_multi(Guess.query().fetch(keys_only=True))

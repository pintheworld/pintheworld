import datetime
import random

from flask import request
from flask_restful import Resource
from model import *


class GameResource(Resource):
    def get(self, game_id):
        get = ndb.Key(urlsafe=game_id).get()
        return Util.to_json(get)


class GamesResource(Resource):
    def get(self):
        return Util.to_json(Game.query().fetch())

    def post(self):
        game = Game()
        request_data = request.get_json()
        game.players = [ndb.Key(urlsafe=request_data['player_id'])]
        game.cities = Util.get_cities(int(request_data.get('number_of_cities', 3)))
        game.noOfPlayers = 1
        game.put()
        return {"id": game.key.urlsafe()}, 201

    def delete(self):
        ndb.delete_multi(Game.query().fetch(keys_only=True))
        ndb.delete_multi(Guess.query().fetch(keys_only=True))


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
        # game = Game.get_by_id(int(game_id))
        # return [dict(p.to_dict(), **dict(id=p.key.id())) for p in Guess.query(ancestor=game.key)]
        # return [Util.to_json(p) for p in Guess.query(ancestor=game.key)]
        return Util.to_json(Guess.query(ancestor=ndb.Key(urlsafe=game_id)).fetch())

    def post(self, game_id):
        # TODO: is the submitted city part of the game?
        # TODO: did the player already submit a guess for this city?
        # TODO: calulate score
        request_data = request.get_json()
        game_key = ndb.Key(urlsafe=game_id)

        guess = Guess(parent=game_key)
        guess.game = game_key
        guess.player = ndb.Key(urlsafe=request_data['player_id'])
        guess.city = ndb.Key(urlsafe=request_data['city_id'])
        guess.long = request_data['long']
        guess.lat = request_data['lat']
        guess.put()

        return {"id": guess.key.urlsafe()}, 201


class PlayerResource(Resource):
    def get(self, player_id):
        return Util.to_json(ndb.Key(urlsafe=player_id).get())


class PlayersResource(Resource):
    def get(self):
        return Util.to_json(Player.query().fetch())

    def post(self):
        request_data = request.get_json()
        player = Player()
        player.name = request_data['name']
        player.put()
        return {"id": player.key.urlsafe()}, 201

    def delete(self):
        ndb.delete_multi(Player.query().fetch(keys_only=True))


class Util:
    @staticmethod
    def get_cities(num):
        return random.sample(City.query().fetch(keys_only=True), num)

    # based on https://stackoverflow.com/a/25871759/1136534
    @staticmethod
    def to_json(obj, resolve_keys=True):
        if isinstance(obj, list):
            return [Util.to_json(l) for l in obj]
        if isinstance(obj, dict):
            x = {}
            for l in obj:
                x[l] = Util.to_json(obj[l])
            return x
        if isinstance(obj, datetime.datetime):
            return obj.isoformat()
        if isinstance(obj, ndb.Key):
            if resolve_keys:
                return Util.to_json(obj.get())
            else:
                return obj.urlsafe()
        if isinstance(obj, ndb.Model):
            dct = obj.to_dict()
            dct['id'] = obj.key.urlsafe()
            return Util.to_json(dct)
        return obj

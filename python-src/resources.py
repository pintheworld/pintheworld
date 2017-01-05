import datetime
import random

from google.appengine.api.channel import channel

from flask import request
from flask_restful import Resource
from model import *
from scoring import calc_score


class GameResource(Resource):
    def get(self, game_id):
        get = ndb.Key(urlsafe=game_id).get()
        return Util.to_json(get)

    def post(self, game_id):
        request_data = request.get_json()
        if 'state' in request_data and request_data['state'] in GameState.states:
            game = ndb.Key(urlsafe=game_id).get()
            game.state = request_data['state']
            game.put()
        if 'player_id' in request_data:
            game = ndb.Key(urlsafe=game_id).get()
            game.players.append(ndb.Key(urlsafe=request_data['player_id']))
            game.put()


class GamesResource(Resource):
    def get(self):
        args = request.args
        state = args.get('state')
        diff = int(args.get('diff'))
        if state:
            if diff:
                query = Game.query(Game.state == state, Game.diff == diff)
            else:
                query = Game.query(Game.state == state, Game.diff == 1)
        else:
            query = Game.query()
        return Util.to_json(query.fetch())

    def post(self):
        game = Game()
        request_data = request.get_json()
        game.players = [ndb.Key(urlsafe=request_data['player_id'])]
        game.diff = request_data.get('difficulty', 1)
        game.cities = Util.get_cities(int(request_data.get('number_of_cities', 3)),
                                      int(request_data.get('difficulty', 1)))
        game.state = GameState.waitingForPlayers
        game.put()
        return Util.to_json(game), 201

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
        city.difficulty = request_data.get('difficulty', 1)
        city.put()
        return {"id": city.key.id()}, 201

    def delete(self):
        ndb.delete_multi(City.query().fetch(keys_only=True))


def save_score(game_key, player_id, guesses):
    total_score = 0
    for guess in guesses:  # removed .fetch() from guesses, causing error: list object has no attribute 'fetch'
        total_score += guess.score
    highscore = Highscore(parent=game_key)
    highscore.player = ndb.Key(urlsafe=player_id)
    highscore.score = total_score
    highscore.put()


class GuessResource(Resource):
    def get(self, game_id):
        # game = Game.get_by_id(int(game_id))
        # return [dict(p.to_dict(), **dict(id=p.key.id())) for p in Guess.query(ancestor=game.key)]
        # return [Util.to_json(p) for p in Guess.query(ancestor=game.key)]
        return Util.to_json(Guess.query(ancestor=ndb.Key(urlsafe=game_id)).fetch())

    def post(self, game_id):
        # TODO: is the submitted city part of the game?
        # TODO: did the player already submit a guess for this city?
        request_data = request.get_json()
        player_id = request_data['player_id']
        player_key = ndb.Key(urlsafe=player_id)
        city_id = request_data['city_id']
        game_key = ndb.Key(urlsafe=game_id)
        game = game_key.get()
        city_key = ndb.Key(urlsafe=city_id)
        city = city_key.get()

        if game.state == GameState.waitingForPlayers:
            game.state = GameState.running
            game.put()

        guess = Guess(parent=game_key)
        guess.game = game_key
        guess.player = player_key
        guess.city = city_key
        guess.long = request_data['long']
        guess.lat = request_data['lat']
        remaining_time = request_data['remaining_time']
        guess.score = calc_score("easy", city.lat, city.long, remaining_time, guess.lat, guess.long)
        guess.put()

        for player in game.players:
            channel.send_message(player.urlsafe(), str(Util.to_json(guess, False, False)))

        # TODO this is not stable yet - we have to make sure only one guess per city/player pair can be submitted
        guess_query = Guess.query(Guess.player == player_key, ancestor=game_key)
        if guess_query.count() == len(game.cities):
            game.state = GameState.done
            game.put()
            save_score(game_key, player_id, guess_query.fetch())

        return Util.to_json(guess, False), 201


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


class HighscoreResource(Resource):
    def get(self):
        return Util.to_json(Highscore.query().order(-Highscore.score).fetch(limit=10))


class GameScoreResource(Resource):
    def get(self, game_id):
        return Util.to_json(Highscore.query(ancestor=ndb.Key(urlsafe=game_id)).order(-Highscore.score).fetch())


class ChannelResource(Resource):
    def post(self):
        request_data = request.get_json()
        token = channel.create_channel(request_data['channel_id'])
        return {'token': token}, 201


class Util:
    @staticmethod
    def get_cities(num, difficulty):
        return random.sample(City.query(City.difficulty == difficulty).fetch(keys_only=True), num)

    # based on https://stackoverflow.com/a/25871759/1136534
    @staticmethod
    def to_json(obj, resolve_keys=True, include_ids=True):
        if isinstance(obj, list):
            return [Util.to_json(l, resolve_keys) for l in obj]
        if isinstance(obj, dict):
            x = {}
            for l in obj:
                x[l] = Util.to_json(obj[l], resolve_keys)
            return x
        if isinstance(obj, datetime.datetime):
            return obj.isoformat()
        if isinstance(obj, ndb.Key):
            if resolve_keys:
                return Util.to_json(obj.get(), resolve_keys)
            else:
                return obj.urlsafe()
        if isinstance(obj, ndb.Model):
            dct = obj.to_dict()
            if include_ids:
                dct['id'] = obj.key.urlsafe()
            return Util.to_json(dct, resolve_keys)
        return obj

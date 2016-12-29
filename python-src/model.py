from google.appengine.ext import ndb


class Player(ndb.Model):
    name = ndb.StringProperty()


class City(ndb.Model):
    name = ndb.StringProperty()
    long = ndb.FloatProperty()
    lat = ndb.FloatProperty()


# linked to game via ancestor/parent
class Highscore(ndb.Model):
    player = ndb.KeyProperty(kind=Player)
    score = ndb.FloatProperty()


# linked to game via ancestor/parent
class Guess(ndb.Model):
    city = ndb.KeyProperty(kind=City)
    player = ndb.KeyProperty(kind=Player)
    long = ndb.FloatProperty()
    lat = ndb.FloatProperty()
    score = ndb.FloatProperty()


class Game(ndb.Model):
    noOfPlayers = ndb.IntegerProperty()
    players = ndb.KeyProperty(kind=Player, repeated=True)
    cities = ndb.KeyProperty(kind=City, repeated=True)
    state = ndb.StringProperty()


class GameState():
    waitingForPlayers = 'waitingForPlayers'
    running = 'running'
    done = 'done'
    states = {waitingForPlayers, running, done}

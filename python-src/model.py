from google.appengine.ext import ndb


class Player(ndb.Model):
    name = ndb.StringProperty()


class City(ndb.Model):
    name = ndb.StringProperty()
    long = ndb.FloatProperty()
    lat = ndb.FloatProperty()


class Guess(ndb.Model):
    city = ndb.KeyProperty(kind=City)
    player = ndb.KeyProperty(kind=Player)
    long = ndb.FloatProperty()
    lat = ndb.FloatProperty()
    # TODO: Float or Integer?
    score = ndb.FloatProperty


class Game(ndb.Model):
    noOfPlayers = ndb.IntegerProperty()
    players = ndb.KeyProperty(kind=Player, repeated=True)
    cities = ndb.KeyProperty(kind=City, repeated=True)

    def todict(self):
        x = self.to_dict()
        x['id'] = self.key.id()
        return x


class Counter(ndb.Model):
    param = ndb.StringProperty()
    count = ndb.IntegerProperty(indexed=False)

    @classmethod
    def howmany(cls, key):
        return cls.query(Counter.param == key).count()

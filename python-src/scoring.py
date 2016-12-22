import math
from math import radians, cos, sin, asin, sqrt
# Some constants we need to define for timeScoring
timeScoreBase = 100
# Some constants we need to define for distanceScoring
distanceScoreBase = 100
roundNum = 10

def CalculateDistanceBetweenPoints(playerLong, playerLat, cityLong, cityLat):
    playerLong, playerLat, cityLong, cityLat = map(radians, [playerLong, playerLat, cityLong, cityLat])
    distanceLong = cityLong - playerLong 
    distanceLat = cityLat - playerLat 
    a = sin(distanceLat/2)**2 + cos(playerLat) * cos(cityLat) * sin(distanceLong/2)**2
    c = 2 * asin(sqrt(a)) 
    distanceAsKM = int(6367 * c)
    return distanceAsKM
	
def sigmoidFunction(x):
	return 1 / (1 + math.exp(-x))

def calc_score(difficulty, city_lat, city_long, player_time, player_lat, player_long): 
	#Assumes player_time is remaining time 
	
	#timeMultiplier = sigmoid(player_time)
	distanceAsKM = CalculateDistanceBetweenPoints(player_long, player_lat,city_long, city_lat)
    
	#if difficulty == 'easy':
    #    best_play_time = 2
    #    # A is how much we expect the score to decrease for each additional second spent by player
    #    time_penalty = 0.9
    #    # B is the rate we reduce the score according to the distance between player's click
    #    # and the city's central point
    #    distance_penalty = 0.95
    #elif difficulty == 'hard':
    #    best_play_time = 1
    #    time_penalty = 0.85
    #    distance_penalty = 0.9
    #time_score = timeScoreBase * math.pow(time_penalty, (player_time - best_play_time))
    #distance_score = distanceScoreBase * math.pow(distance_penalty, math.sqrt(
    #    math.pow(player_lat - city_lat, 2) + math.pow(player_long - city_long, 2)))
	#"""
	distanceScore = 40030 / distanceAsKM
	#40KM diameter per city is correct
	if(distanceScore > 1000):
		distanceScore = 1000
	
	#playerScore = distanceAsKM #timeMultiplier * 
	return distanceScore
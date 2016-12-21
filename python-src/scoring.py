from math import radians, cos, sin, asin, sqrt, exp

def calculate_distance_between_points(player_longtitude, player_latitude, city_longtitude, city_latitude):#Calculates spherical distance between points
    player_longtitude, player_latitude, city_longtitude, city_latitude = map(radians, [player_longtitude, player_latitude, city_longtitude, city_latitude])
    distance_long = city_longtitude - player_longtitude
    distanceLat = city_latitude - player_latitude
    a = sin(distanceLat/2)**2 + cos(player_latitude) * cos(city_latitude) * sin(distance_long/2)**2
    c = 2 * asin(sqrt(a)) 
    distance_as_km = int(6367 * c)
    return distance_as_km
	
def modified_sigmoid_function(x):#Used a modified sigmoid function, normalizes after 6~, check below link for detailed graph
	return 1 / (1 + exp((1/3)*(-x)))#https://www.wolframalpha.com/input/?i=1%2F+(1%2B+e%5E(-1%2F3*x))

def calc_score(difficulty, city_lat, city_long, remaining_time, player_lat, player_long):
	distance_as_km = calculate_distance_between_points(player_long, player_lat,city_long, city_lat)
	
	distance_score = 40030 / distance_as_km
	if(distance_score > 1000):#Maximum distance score a player can get is 1000
		distance_score = 1000
	
	player_score = distance_score * modified_sigmoid_function(remaining_time)#distance score is multiplied with sigmoided time to get rid of linear multiplication
	if player_lat == 200 or player_long == 200:#If played didnt click anything and timer ran out, lat and long are sent as 200(out of boundary for actual lat long, which is 90,180)
		player_score = 0
	return player_score
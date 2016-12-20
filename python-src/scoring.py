from math import radians, cos, sin, asin, sqrt

def calculate_distance_between_points(player_longtitude, player_latitude, city_longtitude, city_latitude):#Calculates spherical distance between points
    player_longtitude, player_latitude, city_longtitude, city_latitude = map(radians, [player_longtitude, player_latitude, city_longtitude, city_latitude])
    distanceLong = city_longtitude - player_longtitude 
    distanceLat = city_latitude - player_latitude 
    a = sin(distanceLat/2)**2 + cos(player_latitude) * cos(city_latitude) * sin(distanceLong/2)**2
    c = 2 * asin(sqrt(a)) 
    distance_as_km = int(6367 * c)
    return distance_as_km
	
def sigmoid_function(x):
	return 1 / (1 + math.exp(-x))

def calc_score(difficulty, city_lat, city_long, player_time, player_lat, player_long):
	distance_as_km = calculate_distance_between_points(player_long, player_lat,city_long, city_lat)
	
	distance_score = 40030 / distance_as_km
	if(distance_score > 1000):
		distance_score = 1000
	
	#player_score = distance_as_km * sigmoid(player_time) 
	return distance_score
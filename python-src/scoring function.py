#author name: Haihan Jiang
#function for Scoring Algorithm
import math


#Some constants we need to define for timeScoring
timeScoreBase = 100
#Some constants we need to define for distanceScoring
distanceScoreBase = 100
roundNum = 10
difficulty = #the level player choose, easy/hard
#final score for each game of roundNum rounds
finalScore = 0
if difficulty == 'easy':
    bestPlayTime = 2
    #A is how much we expect the score to decrease for each additional second spent by player
    A = 0.9
    #B is the rate we reduce the score according to the distance between player's click and the city's central point
    B = 0.95
elif difficulty == 'hard':
    bestPlayTime = 1
    A = 0.85
    B = 0.9

#suppose there are roundNum rounds for each game
for i in range(1,roundNum):
    #Need to get the values from Google Map
    playTime[i] = 
    playerLat[i] = 
    playerLog[i] = 
    cityLat[i] = 
    cityLog[i] = 
    #math.pow returns a float number,pow() and ** return an integer one, which one should we use?
    tScore[i] = def timeScore(playTime):
        return timeScoreBase * math.pow(A , (playTime[i]-bestPlayTime))
    dScore[i] = def distanceScore(playerX,playerY,cityX,cityY):
        return distanceScoreBase * math.pow(B , math.sqrt(math.pow(playerX[i]-cityX[i],2)+math.pow(playerY[i]-cityY[i],2)))
    roundScore[i] = round(tScore[i] + dScore[i]);
    finalScore += roundScore[i]
finalScore = finalScore/roundNum

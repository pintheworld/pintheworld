/* 'app' is the global namespace for this application.
 We'll add all the code artifacts to this one global object.
 Most application files export one thing by adding that thing to the app namespace. Our app.component.js file exports the AppComponent.
 */
import {Component, Inject} from '@angular/core';

import mapTemplate from './map.component.html';

import '../../public/css/styles.css';
import mapStyling from './map.component.css';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GameService} from './services/game.service';
import {PlayerService} from './services/player.service';
import {GuessService} from './services/guess.service';
import {ChannelService} from './services/channel.service';


import {GOOGLE_MAPS_DIRECTIVES, GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/esm/core';

let MapComponent = Component({
    template: mapTemplate,
    styles: [mapStyling],
    directives: GOOGLE_MAPS_DIRECTIVES,
    provider: GOOGLE_MAPS_PROVIDERS,
    viewProviders: [GameService, PlayerService, GuessService, ChannelService]
})
    .Class({
        constructor: [GameService, PlayerService, GuessService, ChannelService, Router, ActivatedRoute,
            function (gameService, playerService, guessService, channelService, router, activatedroute) {
                this.gameService = gameService;
                this.playerService = playerService;
                this.guessService = guessService;
                this.channelService = channelService;

                this.error = '';
                this.cities = [];
                this.markers = [];
                this.cityMarkers = [];//Cities' marker (different from player guess markers - markers)
                this.infoWindows = [];
                this.styleOfMap = [];
				this.pinColors = ["FFFF00", "FFA500", "008000", "0000FF"];//colors used for markers: yellow, orange, green, blue
				this.colorNames = ["Yellow", "Orange", "Green", "Blue"];
				this.pinLetters = 'ABCDE';//letters used for each round's marker

                // TODO: determine the style of each level and add more styles here
                this.noLabel = [{"elementType": 'labels', "stylers": [{"visibility": 'off'}]}];
                this.noLabelAndBorder = [{"elementType": "geometry.stroke", "stylers": [{"visibility": "off"}]},
                    {"elementType": "labels", "stylers": [{"visibility": "off"}]}];

                this.currentRound = -1;
                this.currentScore = 0;
                this.game = null;
                this.player = null;
                this.router = router;
                this.route = activatedroute;

                this.roundTimer = 10;//Timer in the round
                this.breakTimer = 3;//Breaks between rounds
                this.responseTaken = false;//Used this variable to not let user click more than once between rounds, that messes around timer and markers
                this.gameEnded = false;//Used this variable to see if the game ended, e.g: move to highscore page and stop initiating timers

                this.newGame();
            }],
        mapClicked: function (e) {
            if (!this.responseTaken) {
                //^Ut,Done: TODO: user should only be able to click when he is allowed to
                //^Ut,Done: (not between rounds, not without or after the game)

                var self = this;
				var colorNo = null;
				
				if(this.player.id === this.game.players[0].id)
				{
					colorNo = 0;
				} else if(this.player.id === this.game.players[1].id) {
					colorNo = 1;
				} else if(this.player.id === this.game.players[2].id) {
					colorNo = 2;
				} else if(this.player.id === this.game.players[3].id) {
				    colorNo = 3;
				}
				var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + this.pinLetters[this.currentRound] + "|" + this.pinColors[colorNo],
				new google.maps.Size(28, 40),
				new google.maps.Point(0,0),
				new google.maps.Point(14, 40));
                this.markers.push({lat: e == null ? 200 : e.coords.lat, lng: e == null ? 200 : e.coords.lng, img: pinImage});
				
                var currentCity = this.game.cities[this.currentRound];
				self.cityMarkers.push({lat: currentCity.lat, lng: currentCity.long});

                self.infoWindows.push({
                    isOpen: 'true',
                    details: currentCity.name
                });

                this.guessService
                    .submitGuess(this.game.id, this.player.id, currentCity.id, e == null ? 200 : e.coords.lat, e == null ? 200 : e.coords.lng, this.roundTimer)
                    .subscribe(function (guess) {
                        self.guessResponse(self, currentCity, guess);
                    });
            }
        },
        newGame: function () {
            var self = this;
            var player_id = this.route.snapshot.params['player_id'];
            var game_id = this.route.snapshot.params['game_id'];
            this.createChannel(player_id);
            this.playerService.getPlayer(player_id).subscribe(
                function (player) {
                    self.player = player;
                    self.gameService.getGame(game_id).subscribe(function (game) {
                        self.initGame(self, game);
                    });
                });
        },
        createChannel: function (player_id) {
            this.channelService.createChannel(player_id).subscribe(function (resp) {
                console.log("channel_token:");
                console.log(resp.token);
                var channel = new goog.appengine.Channel(resp.token);
                var handler = {
                    'onopen': function () {
                        console.log('opened channel');
                    },
                    'onmessage': function (msg) {
                        console.log('received message: ' + msg.data);
                    },
                    'onerror': function () {
                    },
                    'onclose': function () {
                    }
                };
                var socket = channel.open(handler);
            });
        },
        initGame: function (self, game) {
            self.game = game;
            self.styleOfMap = self.noLabelAndBorder;
            self.markers = [];
            self.cityMarkers = [];
            self.infoWindows = [];
            self.currentRound = 0;
            self.currentScore = 0;
            // self.startCountdown(0);//Initialize Round timer
        },
        guessResponse: function (self, currentCity, guess) {
            if (!this.responseTaken) {//If map is already clicked, dont let it be clicked again
                this.roundTimer = 0;//Set round timer to 0, round ended
                self.currentScore += guess.score;
                // TODO: push different colored markers
                self.markers.push({lat: currentCity.lat, lng: currentCity.long});
                if (self.currentRound < self.markers.length) {
                    this.responseTaken = true;
                    self.startCountdown(1);//Initialize Break timer
                    setTimeout(function () {
                        // self.startCountdown(0);//Initialize Round timer
                        self.markers = [];
                        self.cityMarkers = [];
                        self.infoWindows = [];
                        self.currentRound++;
                    }, 3000);
                } else {
                    this.gameEnded = true;//Game ended, do not initialize the counter for rounds
                    alert("Total Score: " + self.currentScore);
                    self.router.navigate(['/highscores', self.game.id, self.player.id])//Move to highscores when the game ends
                }
            }
        },
        handleCountdown: function (counterType) {
            var self = this;
            if (counterType == 0) {//Round timer, countdown from 10 during a round
                if (this.roundTimer === 0 && !this.gameEnded) {
                    self.mapClicked(null);
                    clearInterval(self.rndTimer);
                } else {
                    this.roundTimer--;
                }
            }
            if (counterType == 1) {//Break timer, breaks between games countdown from 3
                if (this.breakTimer === 0) {
                    clearInterval(self.brTimer);
                    this.responseTaken = false;
                } else {
                    this.breakTimer--;
                }
            }
        },
        startCountdown: function (counterType) {
            var self = this;
            self.countDown = 5;
            if (counterType == 0) {//Round timer, countdown from 10 during a round
                this.roundTimer = 10;
                self.rndTimer = setInterval(function () {
                    self.handleCountdown(counterType);
                }, 1000)
            }
            if (counterType == 1 && !this.gameEnded) {//Break timer, breaks between games countdown from 3 if it is between rounds
                this.breakTimer = 3;
                self.brTimer = setInterval(function () {
                    self.handleCountdown(counterType);
                }, 1000)
            }
        }
    });

export {MapComponent};

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
import {MessageService} from './services/message.service';

import {GOOGLE_MAPS_DIRECTIVES, GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/esm/core';

let MapComponent = Component({
    template: mapTemplate,
    styles: [mapStyling],
    directives: GOOGLE_MAPS_DIRECTIVES,
    provider: GOOGLE_MAPS_PROVIDERS,
    viewProviders: [GameService, PlayerService, GuessService, ChannelService, MessageService]
})
    .Class({
        constructor: [GameService, PlayerService, GuessService, ChannelService, MessageService, Router, ActivatedRoute,
            function (gameService, playerService, guessService, channelService, messageService, router, activatedroute) {
                this.gameService = gameService;
                this.playerService = playerService;
                this.guessService = guessService;
                this.channelService = channelService;
                this.messageService = messageService;
                this.router = router;
                this.route = activatedroute;

                this.cities = [];
                this.markers = [];
                this.cityMarkers = [];//Cities' marker (different from player guess markers - markers)
                this.infoWindows = [];
                this.playerMarkers = [];//Other players' markers after each round
                this.playerMarker = [];//Used to store name and marker color of each player
                this.styleOfMap = [];
                this.pinColors = ["0000FF", "008000", "B21E1E", "CEC510","B51E8F"]; //colors used for markers:
                this.pinLetters = '12345';
                this.msg = '';

                // TODO: determine the style of each level and add more styles here
                this.noLabel = [{"elementType": 'labels', "stylers": [{"visibility": 'off'}]}];
                this.noLabelAndBorder = [{"elementType": "geometry.stroke", "stylers": [{"visibility": "off"}]},
                    {"elementType": "labels", "stylers": [{"visibility": "off"}]}];

                this.currentRound = -1;
                this.currentScore = 0;
                this.guessesReceived = 0;
                this.game = null;
                this.player = null;

                this.roundTimer = 10;//Timer in the round
                this.breakTimer = 3;//Breaks between rounds
                this.responseTaken = false;//Used this variable to not let user click more than once between rounds, that messes around timer and markers
                this.gameEnded = false;//Used this variable to see if the game ended, e.g: move to highscore page and stop initiating timers

                this.startGame();
            }],
        mapClicked: function (e) {
            if (!this.responseTaken) {
                this.responseTaken = true;
                var self = this;
                if (self.game.players.length > 1)//only for multiple players
                    this.msg = 'waiting for other players...';
                clearInterval(this.rndTimer);

                var pin1 = this.getPinImage(this, this.player.id);
                this.markers.push({
                    lat: e == null ? 200 : e.coords.lat,
                    lng: e == null ? 200 : e.coords.lng,
                    img: pin1
                });

                var currentCity = this.game.cities[this.currentRound];
                this.guessService
                    .submitGuess(this.game.id, this.player.id, currentCity.id, e == null ? 200 : e.coords.lat, e == null ? 200 : e.coords.lng, this.roundTimer)
                    .subscribe(function (guess) {
                        self.currentScore += guess.score;
                    });
            }
        },
        startGame: function () {
            var self = this;
            var player_id = this.route.snapshot.params['player_id'];
            var game_id = this.route.snapshot.params['game_id'];
            this.createChannel(this, player_id);
            this.playerService.getPlayer(player_id).subscribe(
                function (player) {
                    self.player = player;
                    self.gameService.getGame(game_id).subscribe(function (game) {
                        self.initGame(self, game);

                        // show player's name and color name
                        for (var i = 0; i < game.players.length; i++) {
                            self.playerMarker.push({name: game.players[i].name, color: self.pinColors[i]});
                        }
                    });
                });
        },
        createChannel: function (self, player_id) {
            var self = this;
            this.msgTimer = setInterval(function () {
                self.messageService.getMessages(player_id, self.game.id).subscribe(function (data) {
                    for (var i = 0; i < data.length; i++) {
                        console.warn(data[i]);
                        self.handleIncomingMessage(self, data[i]);
                    }
                });
            }, 500);
            // this.channelService.createChannel(player_id).subscribe(function (resp) {
            //     console.log("channel_token:");
            //     console.log(resp.token);
            //     var channel = new goog.appengine.Channel(resp.token);
            //     var handler = {
            //         'onopen': function () {
            //             console.log('opened channel');
            //         },
            //         'onmessage': function (msg) {
            //             self.handleIncomingMessage(self, msg)
            //         },
            //         'onerror': function () {
            //         },
            //         'onclose': function () {
            //             console.log("channel closed");
            //         }
            //     };
            //     var socket = channel.open(handler);
            // });
        },
        handleIncomingMessage: function (self, msg) {
            self.guessesReceived += 1;
            if (self.guessesReceived == self.game.players.length) {
                self.guessesReceived = 0;

                var currentCity = self.game.cities[self.currentRound];
                self.cityMarkers.push({lat: currentCity.lat, lng: currentCity.long});
                self.infoWindows.push({
                    isOpen: 'true',
                    details: currentCity.name
                });
                self.guessService.getAllGuesses(self.game.id).subscribe(function (guesses) {
                    for (var i = 0; i < guesses.length; i++) {
                        if ((guesses[i].player.id != self.player.id) && (guesses[i].city.id == currentCity.id)) {
                            var pin2 = self.getPinImage(self, guesses[i].player.id);
                            self.playerMarkers.push({lat: guesses[i].lat, lng: guesses[i].long, img: pin2});
                        }
                    }
                    if (self.currentRound < (self.game.cities.length - 1)) {//first few rounds
                        self.startCountdown(1);//Initialize Break timer
                    } else {
                        //Game ended(last round), navigate to highscore page
                        self.gameEnded = true;
                        clearInterval(self.msgTimer);
                        setTimeout(function () {
                            self.router.navigate(['/highscores', self.game.id, self.player.id, self.game.diff]);
                        }, 3000);
                    }
                });
            }
        },
        initGame: function (self, game) {
            self.game = game;
            if (game.diff == "1")//easy: no label but have border
                self.styleOfMap = self.noLabel;
            else if (game.diff == "2")//difficult: no label or border
                self.styleOfMap = self.noLabelAndBorder;
            self.markers = [];
            self.cityMarkers = [];
            self.infoWindows = [];
            self.playerMarkers = [];
            self.playerInfo = [];
            self.currentRound = 0;
            self.currentScore = 0;
            self.guessesReceived = 0;
            self.msg = '';
            self.startCountdown(0);//Initialize Round timer
        },
        getPinImage: function (self, player_id) {
            var colorNo = self.game.players.findIndex(function (x) {
                return x.id === player_id;
            });
            var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=" + self.pinLetters[self.currentRound] + "|" + self.pinColors[colorNo],
                new google.maps.Size(28, 40),
                new google.maps.Point(0, 0),
                new google.maps.Point(14, 40));//Generate specific pin image of different letters and colors
            return pinImage;
        },
        handleCountdown: function (counterType) {
            var self = this;
            if (counterType === 0) {//Round timer, countdown from 30 during a round
                if (this.roundTimer === 0 && !this.gameEnded) {
                    self.mapClicked(null);
                } else {
                    this.msg = this.roundTimer + ' sec left';
                    this.roundTimer--;
                }
            }
            if (counterType === 1) {//Break timer, breaks between games countdown from 3
                if (this.breakTimer === 0) {
                    clearInterval(self.brTimer);
                    this.responseTaken = false;

                    self.startCountdown(0);//Initialize Round timer
                    this.markers = [];
                    this.cityMarkers = [];
                    this.infoWindows = [];
                    this.playerMarkers = [];
                    this.currentRound++;
                } else {
                    this.msg = 'next city in ' + this.breakTimer;
                    this.breakTimer--;
                }
            }
        },
        startCountdown: function (counterType) {
            var self = this;
            if (counterType == 0) {
                //Round timer, countdown from 30 during a round
                this.roundTimer = 30;
                self.rndTimer = setInterval(function () {
                    self.handleCountdown(counterType);
                }, 1000)
            }
            if (counterType == 1 && !this.gameEnded) {
                // Break timer, breaks between games countdown from 3 if it is between rounds
                this.breakTimer = 3;
                self.brTimer = setInterval(function () {
                    self.handleCountdown(counterType);
                }, 1000)
            }
        }
    });

export {MapComponent};

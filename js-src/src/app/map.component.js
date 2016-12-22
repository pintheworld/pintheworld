/* 'app' is the global namespace for this application.
 We'll add all the code artifacts to this one global object.
 Most application files export one thing by adding that thing to the app namespace. Our app.component.js file exports the AppComponent.
 */
import {Component, Inject} from '@angular/core';

import mapTemplate from './map.component.html';

import '../../public/css/styles.css';
import mapStyling from './map.component.css';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GameService} from './services/game.service';
import {PlayerService} from './services/player.service';
import {GuessService} from './services/guess.service';


import {GOOGLE_MAPS_DIRECTIVES, GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/esm/core';

let MapComponent = Component({
    template: mapTemplate,
    styles: [mapStyling],
    directives: GOOGLE_MAPS_DIRECTIVES,
    provider: GOOGLE_MAPS_PROVIDERS,
    viewProviders: [GameService, PlayerService, GuessService]
})
    .Class({
        constructor: [GameService, PlayerService, GuessService,  Router, ActivatedRoute, function (gameService, playerService, guessService, router, activatedroute) {
            this.gameService = gameService;
            this.playerService = playerService;
            this.guessService = guessService;

            this.error = '';
            this.cities = [];
            this.markers = [];
			this.cityMarkers = [];//Cities' marker (different from player guess markers - markers)
            this.infoWindows = [];
			this.styleOfMap = [];
			
			// TODO: determine the style of each level and add more styles here
			this.noLabel = [{"elementType": 'labels',"stylers": [{"visibility": 'off'}]}];
			this.noLabelAndBorder = [{"elementType": "geometry.stroke","stylers": [{"visibility": "off"}]},
									 {"elementType": "labels","stylers": [{"visibility": "off"}]}];

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
        }],
        mapClicked: function (e) {
            if(!this.responseTaken){
				//^Ut,Done: TODO: user should only be able to click when he is allowed to
				//^Ut,Done: (not between rounds, not without or after the game)

				var self = this;
				// TODO: push different colored markers
				this.markers.push({lat: e == null ? 200:e.coords.lat, lng: e == null ? 200:e.coords.lng});
				// this.infoWindows.push({
				//     isOpen: 'true',
				//     details: 'Your pin'
				// });
				var currentCity = this.game.cities[this.currentRound];
				
				// Changed the code from guessResponse to here for showing the city marker
				// and infowindow before the total mark alert appears
				// TODO: push different colored markers
				// Currently choose a random color to show city marker
				// Also shows an infowindow for each city
				var r = Math.floor((Math.random() * 10) + 1);
				if (r==1){
					self.cityMarkers.push({lat: currentCity.lat, lng: currentCity.long,
					 img: '../../public/img/pin.png'});
				}else if (r==4){
					self.cityMarkers.push({lat: currentCity.lat, lng: currentCity.long,
					 img: '../../public/img/yellow_MarkerC.png'});
				}else {
					self.cityMarkers.push({lat: currentCity.lat, lng: currentCity.long,
					 img: '../../public/img/blue_MarkerC.png'});
				}
				self.infoWindows.push({
					 isOpen: 'true',
					 details: 'It\'s here'
				 });
				
				this.guessService
					.submitGuess(this.game.id, this.player.id, currentCity.id, e == null ? 200:e.coords.lat, e == null ? 200:e.coords.lng, this.roundTimer)
					.subscribe(function (guess) {
						self.guessResponse(self, currentCity, guess);
					});
			}
        },
        newGame: function () {
            var self = this;
            // TODO player should be created and injected by the module
            // this.playerService.createPlayer("Wastl").subscribe(
            //     function (player) {
            //         self.player = player;
            //         self.gameService.createGame(player.id).subscribe(function (game) {
            //             self.initGame(self, game)
            //         });
            //     });
            var player_id = this.route.snapshot.params['id'];
            this.playerService.getPlayer(player_id).subscribe(
                function (player) {
                    self.player = player;
                    self.gameService.createGame(player.id).subscribe(function (game) {
                        self.initGame(self, game)
                    });
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
			self.startCountdown(0);//Initialize Round timer
        },
        guessResponse: function (self, currentCity, guess) {
            self.currentScore += guess.score;
			if(!this.responseTaken){//If map is already clicked, dont let it be clicked again
				this.roundTimer  = 0;//Set round timer to 0, round ended
				self.currentScore += guess.score;
				
				// Changed self.markers.length to 2 as seperated markers and cityMarkers
				if (self.currentRound < 2) {
					this.responseTaken = true;
					self.startCountdown(1);//Initialize Break timer
					setTimeout(function () {
						self.startCountdown(0);//Initialize Round timer
						self.markers = [];
						self.cityMarkers = [];
						self.infoWindows = [];
						self.currentRound++;
					}, 3000);
				} else {
					this.gameEnded = true;//Game ended, do not initialize the counter for rounds
					alert("Total Score: " + self.currentScore);
					self.router.navigate(['/highscores'])//Move to highscores when the game ends
				}
			}
        },
        handleCountdown: function (counterType) {
            var self = this;
			if (counterType==0){//Round timer, countdown from 10 during a round
				if(this.roundTimer === 0 && !this.gameEnded) {
					self.mapClicked(null);
					clearInterval(self.rndTimer);
				} else {
					this.roundTimer--;
				}
			}
			if (counterType==1){//Break timer, breaks between games countdown from 3
				if(this.breakTimer === 0) {
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
			if (counterType==0){//Round timer, countdown from 10 during a round
				this.roundTimer = 10;
				self.rndTimer = setInterval(function () {
					self.handleCountdown(counterType);
				}, 1000)
			}
			if (counterType==1 && !this.gameEnded){//Break timer, breaks between games countdown from 3 if it is between rounds
				this.breakTimer = 3;
				self.brTimer = setInterval(function () {
					self.handleCountdown(counterType);
				}, 1000)
			}
        }
    });

export {MapComponent};
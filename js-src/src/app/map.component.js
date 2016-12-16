/* 'app' is the global namespace for this application.
 We'll add all the code artifacts to this one global object.
 Most application files export one thing by adding that thing to the app namespace. Our app.component.js file exports the AppComponent.
 */
<<<<<<< HEAD
import {Component, Inject} from '@angular/core';
=======
import {Component} from '@angular/core';
>>>>>>> 25c54a7a8ff38ff99fef4e1a4c790df65d8de431

import mapTemplate from './map.component.html';

import '../../public/css/styles.css';
import 'rxjs/add/operator/switchMap';
import mapStyling from './map.component.css';
import {GameService} from './services/game.service';
import {PlayerService} from './services/player.service';
import {GuessService} from './services/guess.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import {GOOGLE_MAPS_DIRECTIVES, GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/esm/core';

let MapComponent = Component({
    template: mapTemplate,
    styles: [mapStyling],
    directives: GOOGLE_MAPS_DIRECTIVES,
    provider: GOOGLE_MAPS_PROVIDERS,
    viewProviders: [GameService, PlayerService, GuessService]
})
    .Class({
        constructor: [GameService, PlayerService, GuessService, Router, ActivatedRoute, function (gameService, playerService, guessService, router, activatedroute) {
            this.gameService = gameService;
            this.playerService = playerService;
            this.guessService = guessService;

            this.error = '';
            this.cities = [];
            this.markers = [];
            this.infoWindows = [];

            this.currentRound = -1;
            this.currentScore = 0;
            this.router = router;
            this.route = activatedroute;
            this.game = null;
            this.player = null;
        }],
        mapClicked: function (e) {
            // TODO: user should only be able to click when he is allowed to
            // (not between rounds, not without or after the game)

            var self = this;
            // TODO: push different colored markers
            this.markers.push({lat: e.coords.lat, lng: e.coords.lng});
            // this.infoWindows.push({
            //     isOpen: 'true',
            //     details: 'Latitude: ' + e.coords.lat.toFixed(6) + ', longitude: ' + e.coords.lng.toFixed(6) + '.'
            // });
            var currentCity = this.game.cities[this.currentRound];
            this.guessService
                .submitGuess(this.game.id, this.player.id, currentCity.id, e.coords.lat, e.coords.lng)
                .subscribe(function (guess) {
                    self.guessResponse(self, currentCity, guess);
                });
        },
        newGame: function () {
            var self = this;
            // TODO player should be created and injected by the module

            // console.log(this.route.params);

            var player_id = this.route.snapshot.params['id'];
            console.log(player_id)

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
            self.markers = [];
            self.currentRound = 0;
            self.currentScore = 0;
        },
        guessResponse: function (self, currentCity, guess) {
            self.currentScore += guess.score;
            // TODO: push different colored markers
            self.markers.push({lat: currentCity.lat, lng: currentCity.long});
            if (self.currentRound < self.markers.length) {
                self.startCountdown();
                setTimeout(function () {
                    self.markers = [];
                    self.currentRound++;
                }, 3000);
            } else {
                alert("Total Score: " + self.currentScore);
            }
        },
        handleCountdown: function (count) {
            var self = this;
            if(count === 0) {
                clearInterval(self.timer);
            } else {
                self.countDown--;
            }
        },
        startCountdown: function () {
            var self = this;
            self.countDown = 3;
            self.timer = setInterval(function () {
                self.handleCountdown(self.countDown);
            }, 1000)
        }
    });

export {MapComponent};

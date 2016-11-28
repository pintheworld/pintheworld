import {Component} from '@angular/core';

import homeTemplate from './home.component.html'

import {CityService} from './services/city.service';

import {PlayerService} from './services/player.service';

//import {GameService} from './services/game.service';

let HomeComponent = Component({
    template: homeTemplate,
    viewProviders: [PlayerService,CityService]
})
    .Class({
		//City***
        constructor: [PlayerService,CityService, function (playerService,cityService) {
            this.cityService = cityService;
			this.playerService = playerService;
            this.error = '';
            this.cities = [];
			//City
            this.myName = 'Southampton';
            this.myLat = 16;
            this.myLong = 32;
			//Players
			this.players = [];
            this.myPlayerName = 'Utku Doe';
        }],

		getPlayers: function () {
            var self = this;
            this.playerService.getPlayers().subscribe(
                function (data) {
                    console.log(data);
                    self.players = data;
                },
                function (err) {
                    console.error(err);
                    this.error = 'we have an error';
                }
            );
        },

        createPlayer: function () {
            var self = this;
            this.playerService.createPlayer(this.myPlayerName).subscribe(
                function (data) {
                    console.log(data);
                    self.getPlayers();
                },
                function (err) {
                    console.error(err);
                }
            );
        },

        deletePlayers: function () {
            var self = this;
            this.playerService.deletePlayers().subscribe(
                function (data) {
                    console.log(data);
                    self.getPlayers();
                },
                function (err) {
                    console.error(err);
                }
            );
		},

        getCities: function () {
            var self = this;
            this.cityService.getCities().subscribe(
                function (data) {
                    console.log(data);
                    self.cities = data;
                },
                function (err) {
                    console.error(err);
                    this.error = 'we have an error';
                }
            );
        },

        createCity: function () {
            var self = this;
            this.cityService.createCity(this.myName, this.myLat, this.myLong).subscribe(
                function (data) {
                    console.log(data);
                    self.getCities();
                },
                function (err) {
                    console.error(err);
                }
            );
        },

        deleteCities: function () {
            var self = this;
            this.cityService.deleteCities().subscribe(
                function (data) {
                    console.log(data);
                    self.getCities();
                },
                function (err) {
                    console.error(err);
                }
            );
        }
    });

export {HomeComponent};

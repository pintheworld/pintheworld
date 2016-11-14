import {Component} from '@angular/core';

import homeTemplate from './home.component.html'

import {CityService} from './services/city.service';

let HomeComponent = Component({
    template: homeTemplate,
    viewProviders: [CityService]
})
    .Class({
        constructor: [CityService, function (cityService) {
            this.cityService = cityService;
            this.error = '';
            this.cities = [];

            this.myName = 'Southampton';
            this.myLat = 16;
            this.myLong = 32;
        }],
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

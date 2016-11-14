/* 'app' is the global namespace for this application. 
    We'll add all the code artifacts to this one global object.
    Most application files export one thing by adding that thing to the app namespace. Our app.component.js file exports the AppComponent.
*/

import {Component} from '@angular/core';

import mapTemplate from './map.component.html';

import '../../public/css/styles.css';
import mapStyling from './map.component.css';
/* 'app' is the global namespace for this application. 
    We'll add all the code artifacts to this one global object.
    Most application files export one thing by adding that thing to the app namespace. Our app.component.js file exports the AppComponent.
*/

import {Component} from '@angular/core';

import mapTemplate from './map.component.html';

import '../../public/css/styles.css';
import mapStyling from './map.component.css';
import {CityService} from './services/city.service';

import {GOOGLE_MAPS_DIRECTIVES,GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/esm/core';

let MapComponent = Component({
    template: mapTemplate,
    styles: [mapStyling],
    directives: GOOGLE_MAPS_DIRECTIVES,
    provider: GOOGLE_MAPS_PROVIDERS,
    viewProviders: [CityService]
})
.Class({
    constructor: [CityService, function(cityService) {
        this.cityService = cityService;
        this.error = '';
        this.cities = [];
        this.markers = [];
        this.infoWindows = [];
        
        this.myName = 'Southampton';
        this.myLat = 16;
        this.myLong = 32;
    }],
    mapClicked: function(e){
        if(this.markers.length === 0){
            this.markers.push({lat:e.coords.lat, lng:e.coords.lng});
            this.infoWindows.push({isOpen: 'true', details: 'Latitude: '+e.coords.lat.toFixed(6) + ', longitude: ' + e.coords.lng.toFixed(6) + '.'});
            //this.getCities();
            //this.submitGuess(this.cities[0].name, e.coords.lat, e.coords.lng);
        }
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
    submitGuess: function(cityName, userLat, userLng){
        console.log('user guess: city: '+cityName+', userLat: '+userLat+', userlng: '+userLng);
    }
});

export {MapComponent};

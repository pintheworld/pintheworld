/* 'app' is the global namespace for this application. 
    We'll add all the code artifacts to this one global object.
    Most application files export one thing by adding that thing to the app namespace. Our app.component.js file exports the AppComponent.
*/

import {Component} from '@angular/core';

import mapTemplate from './map.component.html';

import '../../public/css/styles.css';
import mapStyling from './map.component.css';

import {GOOGLE_MAPS_DIRECTIVES,GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/esm/core';

let MapComponent = Component({
    template: mapTemplate,
    styles: [mapStyling],
    directives: [GOOGLE_MAPS_DIRECTIVES],
    provider: [GOOGLE_MAPS_PROVIDERS]
})
.Class({
    constructor: function() {
        this.markers = [];
        this.infoWindows = [];
    },
    mapClicked: function(e){
        if(this.markers.length === 0){
            this.markers.push({lat:e.coords.lat, lng:e.coords.lng});
            this.infoWindows.push({isOpen: 'true', details: 'Latitude: '+e.coords.lat.toFixed(6) + ', longitude: ' + e.coords.lng.toFixed(6) + '.'});
        }
        console.log('clicked');
    },
    clickedMarker: function(lat, lng, index) {
        console.log(`clicked the marker at: lat: ` + lat + ", lng: "+ lng + ". " + index);
    },
    getCity: function(city){
        return [{
            "lat": city.lat,
            "name": city.name,
            "lng": city.lng,
            "id": city.id
        }];
    }
});

export {MapComponent};

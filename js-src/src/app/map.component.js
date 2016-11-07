/* 'app' is the global namespace for this application. 
    We'll add all the code artifacts to this one global object.
    Most application files export one thing by adding that thing to the app namespace. Our app.component.js file exports the AppComponent.
*/

import {Component} from '@angular/core';

import MapTemplate from './map.component.html';

import '../../public/css/styles.css';
import '../main.js';
import MapStyle from './map.component.css';

import {GOOGLE_MAPS_DIRECTIVES,GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/esm/core';

let MapComponent = Component({
    selector: 'my-map',
    template: MapTemplate,
    styles: [MapStyle],
    directives: [GOOGLE_MAPS_DIRECTIVES],
    provider: [GOOGLE_MAPS_PROVIDERS]
})
.Class({
    constructor: function() {
        //this.alertshit();
        this.markers = [
            {
                lat: 51.673858,
                lng: 7.815982,
                label: 'A',
                draggable: true
            },
            {
                lat: 51.373858,
                lng: 7.215982,
                label: 'B',
                draggable: false
            },
            {
                lat: 51.723858,
                lng: 7.895982,
                label: 'C',
                draggable: true
            }
        ];
        
    },
    alertshit: function(){
        alert("this is an alert: ");
    },
    mapClicked: function(e){
        console.log('clicked');
    },
    clickedMarker: function(label, index) {
        console.log(`clicked the marker:` + label + index);
    },
    markerDragEnd: function(m, event) {
        console.log('dragEnd', m, event);
    }
});

export {MapComponent};

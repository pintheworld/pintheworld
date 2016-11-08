import {Component} from '@angular/core';

import mapTemplate from './map.component.html'
import mapStyling from './map.component.css';

let MapComponent = Component({
    template: mapTemplate,
    styles: [mapStyling]
})
    .Class({
        constructor: function () {
        }
    });

export {MapComponent};

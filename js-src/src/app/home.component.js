import {Component} from '@angular/core';

import homeTemplate from './home.component.html'


let HomeComponent = Component({
    template: homeTemplate,
    viewProviders: []
})
    .Class({
        constructor: [function () {
        }],
    });

export {HomeComponent};

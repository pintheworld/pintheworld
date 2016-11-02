import {Component} from '@angular/core';

import appTemplate from './app.component.html'

import '../../public/css/styles.css';
import appStyling from './app.component.css';

let AppComponent = Component({
  selector: 'my-app',
  template: appTemplate,
  styles: [appStyling]
})
.Class({
  constructor: function() {}
});

export {AppComponent};

(function(app) {
  app.AppComponent =
    ng.core.Component({
      selector: 'my-app',
      templateUrl: 'app/app.component.html',
      directives: [app.HelloWorldComponent]
    })
    .Class({
      constructor: function() {

      }
    });
})(window.app || (window.app = {}));

/*
Copyright 2016 thoughtram GmbH. All Rights Reserved.
Use of this source code is governed by an TTML-style license that
can be found in the license.txt file at http://thoughtram.io/license.txt
*/
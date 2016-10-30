(function(app) {
  app.HelloWorldComponent =
    ng.core.Component({
      selector: 'hello-world',
      template: '{{greeting}} World!',
      providers: [app.GreetingService]
    })
    .Class({
      constructor: [app.GreetingService, function(greetingService) {
        this.greeting = greetingService.greet();
      }]
    });
})(window.app || (window.app = {}));

/*
Copyright 2016 thoughtram GmbH. All Rights Reserved.
Use of this source code is governed by an TTML-style license that
can be found in the license.txt file at http://thoughtram.io/license.txt
*/
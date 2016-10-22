import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app.module';

let boot = document.addEventListener('DOMContentLoaded', function() {
  const platform = platformBrowserDynamic();
  platform.bootstrapModule(AppModule);
});

module.exports = boot;

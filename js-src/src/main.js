import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';

if (process.env.ENV === 'production') {
  enableProdMode();
}

let boot = document.addEventListener('DOMContentLoaded', function() {
  const platform = platformBrowserDynamic();
  platform.bootstrapModule(AppModule);
});

module.exports = boot;

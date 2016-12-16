import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule}   from '@angular/forms';
import {CommonModule}   from '@angular/common';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { HomeComponent } from './home.component';
import { MapComponent } from './map.component';
import { HighscoresComponent } from './highscores.component';
import { PlayerComponent } from './player.component';

import { AgmCoreModule } from 'angular2-google-maps/esm/core';

let AppModule = NgModule({
    imports: [BrowserModule,
        FormsModule,
        HttpModule,
        CommonModule,
        NgbModule.forRoot(),
        RouterModule.forRoot([
            {path: 'map/:id', component: MapComponent},
            {path: 'highscores', component: HighscoresComponent},
            {path: '', component: HomeComponent},
<<<<<<< HEAD
            {path: 'player', component: PlayerComponent}]),
=======
            {path: 'player/:id', component: PlayerComponent}]),
>>>>>>> 25c54a7a8ff38ff99fef4e1a4c790df65d8de431
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAgOrFWDMyp4XFYQRlY1a-cNxKNPz56ZQ4'
        })
    ],
    declarations: [AppComponent, MapComponent, HomeComponent, HighscoresComponent, PlayerComponent],
    bootstrap: [AppComponent],
})
.Class({
  constructor: function() {}
});

export {AppModule};

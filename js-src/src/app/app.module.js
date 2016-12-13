import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule}   from '@angular/forms';
import {CommonModule}   from '@angular/common';
import {HttpModule} from '@angular/http';

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
        RouterModule.forRoot([
            {path: 'map/:id', component: MapComponent},
            {path: 'highscores', component: HighscoresComponent},
            {path: '', component: HomeComponent},
            {path: 'player', component: PlayerComponent}]),
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

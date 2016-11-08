import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {HomeComponent} from './home.component';
import {MapComponent} from './map.component';
import {HighscoresComponent} from './highscores.component';

import { HttpModule } from '@angular/http';

let AppModule = NgModule({
    imports: [BrowserModule, RouterModule.forRoot([
        {path: 'map', component: MapComponent},
        {path: 'highscores', component: HighscoresComponent},
        {path: '', component: HomeComponent}]), HttpModule],
    declarations: [AppComponent, MapComponent, HomeComponent, HighscoresComponent],
    bootstrap: [AppComponent]
})
    .Class({
        constructor: function () {
        }
    });

export {AppModule};

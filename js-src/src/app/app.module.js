import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule}   from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HomeComponent} from './home.component';
import {MapComponent} from './map.component';
import {HighscoresComponent} from './highscores.component';


let AppModule = NgModule({
    imports: [BrowserModule, FormsModule, HttpModule,
        RouterModule.forRoot([
            {path: 'map', component: MapComponent},
            {path: 'highscores', component: HighscoresComponent},
            {path: '', component: HomeComponent}])],
    declarations: [AppComponent, MapComponent, HomeComponent, HighscoresComponent],
    bootstrap: [AppComponent]
})
    .Class({
        constructor: function () {
        }
    });

export {AppModule};

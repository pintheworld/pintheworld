import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {FormsModule}   from '@angular/forms';
import {CommonModule}   from '@angular/common';
import {HttpModule} from '@angular/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {HomeComponent} from './home.component';
import {MapComponent} from './map.component';
import {HighscoresComponent} from './highscores.component';
import {PlayerComponent} from './player.component';
import {GamesComponent} from './games.component';
import {RoomComponent} from './room.component';
import {JoinComponent} from './join.component';



import {AgmCoreModule} from 'angular2-google-maps/esm/core';

let AppModule = NgModule({
    imports: [BrowserModule,
        FormsModule,
        HttpModule,
        CommonModule,
        NgbModule.forRoot(),
        RouterModule.forRoot([
            {path: 'game/:player_id', component: GamesComponent},
			{path: 'room/:game_id/:player_id', component: RoomComponent},
            {path: 'map/:game_id/:player_id', component: MapComponent},
            {path: 'highscores/:id1/:id2', component: HighscoresComponent},
            {path: '', component: HomeComponent},
			{path: ':player_id', component: HomeComponent}]),
            // {path: 'games/:player_id', component: GamesComponent},
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyAgOrFWDMyp4XFYQRlY1a-cNxKNPz56ZQ4'
        })
    ],
    declarations: [
        AppComponent,
        MapComponent,
        HomeComponent,
        HighscoresComponent,
        PlayerComponent,
        GamesComponent,
        RoomComponent,
        JoinComponent
    ],
    bootstrap: [AppComponent],
}).Class({
    constructor: function () {
        var $script = require("scriptjs");
        $script("/_ah/channel/jsapi");
    }
});

export {AppModule};

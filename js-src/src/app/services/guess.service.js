import {Class} from '@angular/core';
import {Http} from '@angular/http';

var GuessService = Class({
    constructor: [Http, function (http) {
        this.http = http;
        //TODO: the base url (everything up to /api/..) should be injected by the module
        // using GAE
        // this.baseUrl = "https://pintheworld-146615.appspot.com/api/games/";
        // using local development
        this.baseUrl = "http://localhost:8081/api/games";
    }],
    submitGuess: function (game_id, player_id, city_id, lat, long) {
        return this.http.post(this.getServiceUrl(game_id), {player_id, city_id, long, lat}).map(
            function (res) {
                return res.json()
            }
        )
    },
    getServiceUrl: function (game_id) {
        return this.baseUrl + "/" + game_id + "/guesses";
    }
});

export {GuessService};

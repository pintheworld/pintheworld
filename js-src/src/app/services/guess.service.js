import {Class} from '@angular/core';
import {Http} from '@angular/http';

var GuessService = Class({
    constructor: [Http, function (http) {
        this.http = http;
        this.baseUrl = '/api/games';
    }],
    submitGuess: function (game_id, player_id, city_id, lat, long, remaining_time) {
        return this.http.post(this.getServiceUrl(game_id), {player_id, city_id, long, lat, remaining_time}).map(
            function (res) {
                return res.json();
            }
        );
    },
    getServiceUrl: function (game_id) {
        return this.baseUrl + '/' + game_id + '/guesses';
    },

    getAllGuesses: function (game_id) {
        return this.http.get(this.getServiceUrl(game_id)).map(
            function (res) {
                return res.json();
            }
        );
    }
});

export {GuessService};

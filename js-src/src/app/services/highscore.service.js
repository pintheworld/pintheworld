import {Class} from '@angular/core';
import {Http} from '@angular/http';

var HighscoreService = Class({
    constructor: [Http, function (http) {
        this.http = http;
        //TODO: the base url (everything up to /api/..) should be injected by the module
        // using GAE
        // this.baseUrl = "https://pintheworld-146615.appspot.com/api/highscores";
        // using local development
        this.baseUrl = "http://localhost:8081/api/highscores";
    }],
    getHighscores: function () {
		return this.http.get(this.baseUrl).map(
			function(res) {
				return res.json()
			}
		)
	},
	getGameScores: function (game_id) {
		return this.http.get(this.baseUrl + '/' + game_id).map(
			function(res) {
				return res.json()
			}
		)
	}
});

export {HighscoreService};

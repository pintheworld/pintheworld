import {Class} from '@angular/core';
import {Http} from '@angular/http';

var HighscoreService = Class({
    constructor: [Http, function (http) {
        this.http = http;
        this.baseUrl = "/api/highscores";
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

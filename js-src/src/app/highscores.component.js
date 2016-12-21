import { Component } from '@angular/core';
//import { GuessService } from './services/guess.service';
import { HighscoreService } from './services/highscore.service';

import highscoresTemplate from './highscores.component.html'

let HighscoresComponent = Component({
    template: highscoresTemplate,
	viewProviders: [HighscoreService]
})
    .Class({
        constructor: [HighscoreService, function (highscoreService) {
			//this.guessService = guessService;
			this.highscoreService = highscoreService;
			
			this.highscores = [];
			this.gamescores = [];
			this.error = '';
		}],
		getScores: function (game_id) {
			var self = this;
			this.highscoreService.getGameScores(game_id).subscribe (
				function (scores) {
					self.gamescores =scores;
				},
				function (err) {
					console.error(err);
					this.error = 'we have an error with game scores';
				}
			);
		},
		getHighscores: function () {
			var self = this;
			this.highscoreService.getHighscores().subscribe (
				function (highscore) {
					self.highscores = highscore;
				},
				function (err) {
					console.error(err);
					this.error = 'we have an error with highscores';
				}
			);
		}
    });

export {HighscoresComponent};

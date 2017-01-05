import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {HighscoreService} from './services/highscore.service';
import {GameService} from './services/game.service';

import highscoresTemplate from './highscores.component.html'
import highscoresStyling from './highscores.component.css';

let HighscoresComponent = Component({
    template: highscoresTemplate,
	viewProviders: [HighscoreService, GameService],
	styles: [highscoresStyling]
})
    .Class({
        constructor: [HighscoreService, GameService, Router, ActivatedRoute, function (highscoreService, gameService, router, activatedroute) {
			this.highscoreService = highscoreService;
			this.gameService = gameService;
			this.router = router;
			this.route = activatedroute;

			this.highscores = [];
			this.gamescores = [];
			this.error = '';
		}],
		getScores: function () {
			var self = this;
			var game_id = this.route.snapshot.params['id1'];
			this.highscoreService.getGameScores(game_id).subscribe (
				function (scores) {
					self.gamescores =scores;
				}
			);
		},
		getHighscores: function () {
			var self = this;
			this.highscoreService.getHighscores().subscribe (
				function (highscore) {
					self.highscores = highscore;
				}
			);
		},
        ngOnInit: function() {
            this.getScores();
            this.getHighscores();
        },
		startNewGame: function () {
			var self = this;
			var player_id = this.route.snapshot.params['id2'];
			var difficulty = parseInt(this.route.snapshot.params['id3']);
			this.gameService.createGame(player_id, difficulty).subscribe(function (game) {
				self.router.navigate(['/room', game.id, player_id]);
			});
		}
    });

export {HighscoresComponent};

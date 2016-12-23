import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HighscoreService } from './services/highscore.service';

import highscoresTemplate from './highscores.component.html'
import highscoresStyling from './highscores.component.css';

let HighscoresComponent = Component({
    template: highscoresTemplate,
	viewProviders: [HighscoreService],
	styles: [highscoresStyling]
})
    .Class({
        constructor: [HighscoreService, Router, ActivatedRoute, function (highscoreService, router, activatedroute) {
			this.highscoreService = highscoreService;
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
			var player_id = this.route.snapshot.params['id2'];
			this.router.navigate(['/map', player_id]);
		}
    });

export {HighscoresComponent};

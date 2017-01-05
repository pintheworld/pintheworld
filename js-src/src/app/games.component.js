import {Component} from '@angular/core';
import {GameService} from './services/game.service';
import {PlayerService} from './services/player.service';
import gamesTemplate from './games.component.html';
import {Router, ActivatedRoute, Params} from '@angular/router';

let GamesComponent = Component({
    selector: 'games-component',
    template: gamesTemplate,
    viewProviders: [GameService, PlayerService]
})

    .Class({
        constructor: [GameService, PlayerService, Router, ActivatedRoute,
            function (gameService, playerService, router, activatedRoute) {
                this.gameService = gameService;
                this.playerService = playerService;
                this.router = router;
                this.route = activatedRoute;
                this.player = null;
                this.games = [];
				this.difficulty = null;
            }],
		easy: function() {
			this.difficulty = 1;
			console.log(this.difficulty);
		},
		difficult: function() {
			this.difficulty = 2;
			console.log(this.difficulty);
		},
        createRoom: function () {
            var self = this;
            if (this.myPlayerName) {
                this.playerService.createPlayer(this.myPlayerName).subscribe(
                    function (player) {
						console.log("self.difficulty: " + self.difficulty);
						if (!self.difficulty) {
							self.difficulty = 1;
						}
						self.gameService.createGame(player.id, self.difficulty).subscribe(function (game) {
							console.log("game id: " + game.id + " player id: " + player.id);
							self.router.navigate(['/room', game.id, player.id]);
						});
                    });
            }
        },
		getGames: function () {
            var self = this;
			if (this.difficulty == 1 || this.difficulty == null) {
				this.gameService.getWaitingGames(1).subscribe(
					function (games) {
						console.log(games);
						self.games = games;
					});
			}
            else {
				this.gameService.getWaitingGames(2).subscribe(
					function (games) {
						console.log(games);
						self.games = games;
					});
			}
        },
        join: function (game_id) {
            var self = this;
            if (this.myPlayerName) {
                this.playerService.createPlayer(this.myPlayerName).subscribe(function (player) {
                    console.log(player);
                    self.gameService.join(player.id, game_id).subscribe(function () {
                        self.router.navigate(['/room', game_id, player.id]);
                    });
                })
            } else {
                alert("Please enter your player name first :)");
            }
        }
    });

export {GamesComponent};
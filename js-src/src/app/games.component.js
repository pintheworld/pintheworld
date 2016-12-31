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
            var games = [];
        }],

		createRoom: function () {
            var self = this;
            this.playerService.createPlayer(this.myPlayerName).subscribe(
                function (player) {
                    self.gameService.createGame(player.id).subscribe(function (game) {
						console.log("game id: " + game.id + " player id: " + player.id);
                        self.router.navigate(['/room', game.id, player.id]);
                    });
                });

        },
        update: function () {
            var self = this;
            this.gameService.getWaitingGames().subscribe(
                function (games) {
                    console.log(games);
                    self.games = games;
                });
        },
        join: function (game_id) {
            var self = this;
			var player_id = this.route.snapshot.params['player_id'];
			console.log(player_id);
			this.gameService.join(player_id, game_id).subscribe(function () {
				self.router.navigate(['/room', game_id, player_id]);
			});
        }

    });

export {GamesComponent};

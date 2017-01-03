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
			if(this.myPlayerName) {
				this.playerService.createPlayer(this.myPlayerName).subscribe(
					function (player) {
						self.gameService.createGame(player.id).subscribe(function (game) {
							console.log("game id: " + game.id + " player id: " + player.id);
							self.router.navigate(['/room', game.id, player.id]);
						});
                });
        }
    });

export {GamesComponent};
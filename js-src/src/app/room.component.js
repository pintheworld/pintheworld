import {Component} from '@angular/core';
import {GameService} from './services/game.service';
import {PlayerService} from './services/player.service';
import roomTemplate from './room.component.html';
import {Router, ActivatedRoute, Params} from '@angular/router';

let RoomComponent = Component({
    selector: 'room-component',
    template: roomTemplate,
    viewProviders: [GameService, PlayerService]
})

    .Class({
        constructor: [GameService, PlayerService, Router, ActivatedRoute,
					  function (gameService, playerService, router, activatedRoute) {
            this.gameService = gameService;
            this.playerService = playerService;
            this.router = router;
			this.route = activatedRoute;
			this.players = [];
            this.game = null;
			this.playerid = null;
						  
			this.timer = 60;
			
			this.getPlayersInRoom();
        }],
		start: function () {
			var self = this;
			var game_id = this.route.snapshot.params['game_id'];
			var player_id = this.route.snapshot.params['player_id'];
			this.timer = 0;
			this.gameService.getGame(game_id).subscribe(function () {
				console.log("start " + game_id);
				self.router.navigate(['/map', game_id, player_id]);
			});
		},
		getPlayersInRoom: function () {
			var self = this;
			var game_id = this.route.snapshot.params['game_id'];
			var player_id = this.route.snapshot.params['player_id'];
			this.playerid = player_id;
			this.gameService.getGame(game_id).subscribe(function (game) {
				self.game = game;
				console.log(self.game.players);
				self.players = self.game.players;
			});
			self.startCounting();
		},
        startCounting: function () {
            var self = this;
			this.timer = 60;
			self.myTimer = setInterval(function () {
				self.handleCounting();
			}, 1000);
        },
		handleCounting: function() {
			var self = this;
			if (this.timer === 0) {
				clearInterval(self.myTimer);
				this.router.navigate(['/map', this.game.id, this.playerid]);
			} else {
				this.timer--;
			}
		}
    });

export {RoomComponent};

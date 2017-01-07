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
				this.playerColors = ["#0000FF", "#008000", "#B21E1E", "#CEC510","#B51E8F"]; //colors used for markers:
                this.gameService = gameService;
                this.playerService = playerService;
                this.router = router;
                this.route = activatedRoute;
                this.players = [];
                this.game = null;

                this.game_id = this.route.snapshot.params['game_id'];
                this.player_id = this.route.snapshot.params['player_id'];

                var self = this;
                self.getPlayersInRoom(self);
                this.updateInterval = setInterval(function () {
                    self.getPlayersInRoom(self);
                }, 2000);
            }],
        start: function () {
            clearInterval(this.updateInterval);
            this.gameService.startGame(this.game_id).subscribe(function () {
                // no-op
            });

            var self = this;
            this.gameService.getGame(this.game_id).subscribe(function (game) {
                self.router.navigate(['/map', game.id, self.player_id]);
            });
        },
        getPlayersInRoom: function (context) {
            context.gameService.getGame(context.game_id).subscribe(function (game) {
                context.game = game;
                context.players = context.game.players;
            });
        }
    });

export {RoomComponent};

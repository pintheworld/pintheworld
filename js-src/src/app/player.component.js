import {Component} from '@angular/core';
import {PlayerService} from './services/player.service';
import {GameService} from './services/game.service';
import playerTemplate from './player.component.html';
import {Router} from '@angular/router';

let PlayerComponent = Component({
    selector: 'player-component',
    template: playerTemplate,
    viewProviders: [GameService, PlayerService]
})

    .Class({
        constructor: [GameService, PlayerService, Router, function (gameService, playerService, router) {
            this.gameService = gameService;
            this.playerService = playerService;

            this.player = null;
            this.router = router;
        }],

        createplayer: function () {
            var self = this;
            this.playerService.createPlayer(this.myPlayerName).subscribe(
                function (player) {
                    self.player = player;
                    console.log("player_id:");
                    console.log(self.player.id);
					// TODO: asynchronize now. cannot show player's name when player create a name at the first time
 					// but can show when more names created
 					self.playerService.getPlayer(self.player.id).subscribe(
 						function (p) {
 							self.thisPlayer = p;
 						});
 					self.router.navigate(['', self.player.id]);
                });
        }
    });

export {PlayerComponent};

import { Component } from '@angular/core';
import { PlayerService } from './services/player.service';
import { GameService } from './services/game.service';
<<<<<<< HEAD
import {Router} from '@angular/router';
=======
>>>>>>> 25c54a7a8ff38ff99fef4e1a4c790df65d8de431
import playerTemplate from './player.component.html';

let PlayerComponent = Component({
    template: playerTemplate,
    viewProviders: [GameService, PlayerService]
})
<<<<<<< HEAD

    .Class({
        constructor: [GameService, PlayerService, Router ,function (gameService, playerService, router) {
            this.gameService = gameService;
            this.playerService = playerService;

            this.router = router;
            this.player = null;
        }],

        createplayer: function () {
            var self = this;
            this.playerService.createPlayer(this.myPlayerName).subscribe (
                function (player) {
                    self.player = player;
                    console.log(player.id)
                    self.router.navigate(['/map', player.id]);
                    });

        }

=======
    .Class({
        constructor: [GameService, PlayerService, function (gameService, playerService) {
            this.gameService = gameService;
            this.playerService = playerService;
        }],

        // I guess this where we create a new game?
>>>>>>> 25c54a7a8ff38ff99fef4e1a4c790df65d8de431
    });

export {PlayerComponent};

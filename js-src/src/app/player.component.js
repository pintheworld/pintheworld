import { Component } from '@angular/core';
import { PlayerService } from './services/player.service';
import { GameService } from './services/game.service';
import playerTemplate from './player.component.html';
import {Router} from '@angular/router';

let PlayerComponent = Component({
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
            this.playerService.createPlayer(this.myPlayerName).subscribe (
                function (player) {
                    self.player = player;
                    console.log(player.id)
                    self.router.navigate(['/map', player.id]);
                    });

        }

    });

export {PlayerComponent};

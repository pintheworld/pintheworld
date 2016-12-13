import { Component } from '@angular/core';
import { PlayerService } from './services/player.service';
import { GameService } from './services/game.service';
import {Router} from '@angular/router';
import playerTemplate from './player.component.html';

let PlayerComponent = Component({
    template: playerTemplate,
    viewProviders: [GameService, PlayerService]
})

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

    });

export {PlayerComponent};

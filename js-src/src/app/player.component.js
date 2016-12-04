import { Component } from '@angular/core';
import { PlayerService } from './services/player.service';
import { GameService } from './services/game.service';
import playerTemplate from './player.component.html';

let PlayerComponent = Component({
    template: playerTemplate,
    viewProviders: [GameService, PlayerService]
})

    .Class({
        constructor: [GameService, PlayerService, function (gameService, playerService) {
            this.gameService = gameService;
            this.playerService = playerService;

            this.player = null;
        }],

        createplayer: function () {
            var self = this;
            this.playerService.createPlayer(this.myPlayerName).subscribe (
                function (player) {
                    self.player = player;
                    console.log(player.id)
                    window.location.href="http://localhost:8080/map?playid="+ player.id;
                    });

        }

    });

export {PlayerComponent};

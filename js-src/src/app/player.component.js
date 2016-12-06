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
        }],

        // I guess this where we create a new game?
    });

export {PlayerComponent};

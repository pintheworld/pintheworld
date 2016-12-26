import {Component} from '@angular/core';
import {GameService} from './services/game.service';
import {PlayerService} from './services/player.service';
import gamesTemplate from './games.component.html';
import {Router} from '@angular/router';

let GamesComponent = Component({
    selector: 'games-component',
    template: gamesTemplate,
    viewProviders: [GameService, PlayerService]
})

    .Class({
        constructor: [GameService, PlayerService, Router, function (gameService, playerService, router) {
            this.gameService = gameService;
            this.playerService = playerService;
            this.router = router;
            var games = []
        }],

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
            this.playerService.createPlayer("asdf").subscribe(
                function (player) {
                    // TODO player should be created some where else i.e. come from player component
                    self.gameService.join(player.id, game_id).subscribe(function () {
                        console.log("joining " + game_id + " as player " + player.id);
                        self.router.navigate(['/map', game_id, player.id]);
                    });
                });
        }

    });

export {GamesComponent};

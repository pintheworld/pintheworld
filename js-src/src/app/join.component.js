import {Component} from '@angular/core';
import {GameService} from './services/game.service';
import {PlayerService} from './services/player.service';
import joinTemplate from './join.component.html';
import {Router, ActivatedRoute} from '@angular/router';

let JoinComponent = Component({
    selector: 'join-component',
    template: joinTemplate,
    viewProviders: [GameService, PlayerService]
})

    .Class({
        constructor: [GameService, PlayerService, Router, ActivatedRoute,
            function (gameService, playerService, router, activatedRoute) {
                this.gameService = gameService;
                this.playerService = playerService;
                this.router = router;
                this.route = activatedRoute;
                this.games = [];
            }
        ],
        getGames: function () {
            var self = this;
            this.gameService.getWaitingGames().subscribe(
                function (games) {
                    console.log(games);
                    self.games = games;
                });
        },
        join: function (game_id) {
            var self = this;
            var player_id = this.route.snapshot.params['player_id'];
            if (typeof player_id === 'undefined') {
                this.playerService.createPlayer('FIXTHIS').subscribe(function (player) {
                    console.log(player);
                    self.gameService.join(player.id, game_id).subscribe(function () {
                        self.router.navigate(['/room', game_id, player.id]);
                    });
                })
            } else {
                console.log('YOU SHOUDNT BE HERE FIX ME')
            }

        }

    });

export {JoinComponent};

import {Component} from '@angular/core';
import {GameService} from './services/game.service';
import joinTemplate from './join.component.html';
import {Router, ActivatedRoute} from '@angular/router';

let JoinComponent = Component({
    selector: 'join-component',
    template: joinTemplate,
    viewProviders: [GameService]
})

    .Class({
        constructor: [GameService, Router, ActivatedRoute,
            function (gameService, router, activatedRoute) {
                this.gameService = gameService;
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
            console.log(player_id);
            this.gameService.join(player_id, game_id).subscribe(function () {
                self.router.navigate(['/room', game_id, player_id]);
            });
        }

    });

export {JoinComponent};

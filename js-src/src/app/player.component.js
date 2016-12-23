import {Component} from '@angular/core';
import {PlayerService} from './services/player.service';
import {ChannelService} from './services/channel.service';
import playerTemplate from './player.component.html';
import {Router} from '@angular/router';

let PlayerComponent = Component({
    selector: 'player-component',
    template: playerTemplate,
    viewProviders: [ChannelService, PlayerService]
})

    .Class({
        constructor: [ChannelService, PlayerService, Router, function (channelService, playerService, router) {
            this.channelService = channelService;
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
                    self.channelService.createChannel(self.player.id).subscribe(function (resp) {
                        console.log("channel_token:");
                        console.log(resp.token);
                        var channel = new goog.appengine.Channel(resp.token);
                        var handler = {
                            'onopen': function () {
                                console.log('opened channel');
                            },
                            'onmessage': function (msg) {
                                console.log('received message: ' + msg.data);
                            },
                            'onerror': function () {
                            },
                            'onclose': function () {
                            }
                        };
                        var socket = channel.open(handler);
                    });
                    self.router.navigate(['/map', player.id]);
                });

        }

    });

export {PlayerComponent};

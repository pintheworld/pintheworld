import {Class} from '@angular/core';
import {Http} from '@angular/http';

var MessageService = Class({
    constructor: [Http, function (http) {
        this.http = http;
        this.baseUrl = '/api/messages';
    }],
    getMessages: function (player_id, game_id) {
        return this.http.get(this.baseUrl + '/' + player_id + '/' + game_id).map(
            function (res) {
                return res.json();
            }
        );
    }
});

export {MessageService};

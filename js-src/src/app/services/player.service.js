import {Class} from '@angular/core';
import {Http} from '@angular/http';

var PlayerService = Class({
    constructor: [Http, function (http) {
        this.http = http;
        this.baseUrl = "/api/players";
    }],
    getPlayers: function () {
        return this.http.get(this.baseUrl).map(
            function (res) {
                return res.json()
            }
        )
    },
    getPlayer: function (player_id) {
        return this.http.get(this.baseUrl + "/" + player_id).map(
            function (res) {
                return res.json()
            }
        )
    },
    createPlayer: function (name) {
        return this.http.post(this.baseUrl, {name}).map(
            function (res) {
                return res.json()
            }
        )
    },
    deletePlayers: function () {
        return this.http.delete(this.baseUrl).map(
            function (res) {
                return res.json()
            }
        )
    }
});

export {PlayerService};

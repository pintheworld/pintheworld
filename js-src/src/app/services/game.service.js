import {Class} from '@angular/core';
import {Http} from '@angular/http';

var GameService = Class({
    constructor: [Http, function (http) {
        this.http = http;
        this.baseUrl = "/api/games";
    }],
    getAllGames: function () {
        return this.http.get(this.baseUrl).map(
            function (res) {
                return res.json()
            }
        )
    },
    getWaitingGames: function () {
        return this.http.get(this.baseUrl + '?state=waitingForPlayers').map(
            function (res) {
                return res.json()
            }
        )
    },
    join: function (player_id, game_id) {
        return this.http.post(this.baseUrl + "/" + game_id, {player_id}).map(
            function (res) {
                return res.json()
            }
        )
    },
    startGame: function (game_id) {
        return this.http.post(this.baseUrl + "/" + game_id, {'state': 'running'}).map(
            function (res) {
                return res.json()
            }
        )
    },
    getGame: function (game_id) {
        return this.http.get(this.baseUrl + "/" + game_id).map(
            function (res) {
                return res.json()
            }
        )
    },
    createGame: function (player_id) {
        return this.http.post(this.baseUrl, {player_id}).map(
            function (res) {
                return res.json()
            }
        )
    },
    deleteGames: function () {
        return this.http.delete(this.baseUrl).map(
            function (res) {
                return res.json()
            }
        )
    }
});

export {GameService};

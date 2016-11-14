import {Class} from '@angular/core';
import {Http} from '@angular/http';

var PlayerService = Class({
    constructor: [Http, function (http) {
        this.http = http;
        // using GAE
        this.baseUrl = "https://pintheworld-146615.appspot.com/api/players";
        // using local development
        // this.baseUrl = "http://localhost:8081/api/cities";
    }],
    getPlayers: function () {

        return this.http.get(this.baseUrl).map(
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

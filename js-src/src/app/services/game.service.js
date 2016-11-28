import {Class} from '@angular/core';
import {Http} from '@angular/http';

var GameService = Class({
    constructor: [Http, function (http) {
        this.http = http;
        // using GAE
        this.baseUrl = "https://pintheworld-146615.appspot.com/api/games";
        // using local development
        // this.baseUrl = "http://localhost:8081/api/games";
    }],
    getAllGames: function () {

        return this.http.get(this.baseUrl).map(
            function (res) {
                return res.json()
            }
        )
    },
	/*getGame: function () {//TODO: filter the game

        return this.http.get(this.baseUrl).map(
            function (res) {
                return res.json()
            }
        )
    },*/
    createGame: function (name) {
        return this.http.post(this.baseUrl, {name}).map(
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

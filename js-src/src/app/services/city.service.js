import {Class} from '@angular/core';
import {Http} from '@angular/http';

var CityService = Class({
    constructor: [Http, function (http) {
        this.http = http;
        this.baseUrl = "/api/cities";
    }],
    getCities: function () {

        return this.http.get(this.baseUrl).map(
            function (res) {
                return res.json()
            }
        )
    },
    createCity: function (name, lat, long) {
        return this.http.post(this.baseUrl, {name, lat, long}).map(
            function (res) {
                return res.json()
            }
        )
    },
    deleteCities: function () {
        return this.http.delete(this.baseUrl).map(
            function (res) {
                return res.json()
            }
        )
    }
});

export {CityService};

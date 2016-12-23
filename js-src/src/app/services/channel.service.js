import {Class} from '@angular/core';
import {Http} from '@angular/http';

var ChannelService = Class({
    constructor: [Http, function (http) {
        this.http = http;
        //TODO: the base url (everything up to /api/..) should be injected by the module
        // using GAE
        // this.baseUrl = "https://pintheworld-146615.appspot.com/api/players";
        // using local development
        this.baseUrl = "http://localhost:8081/api/channel";
    }],
    createChannel: function (channel_id) {
        return this.http.post(this.baseUrl, {channel_id}).map(
            function (res) {
                return res.json()
            }
        )
    },
});

export {ChannelService};

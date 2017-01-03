import {Class} from '@angular/core';
import {Http} from '@angular/http';

var ChannelService = Class({
    constructor: [Http, function (http) {
        this.http = http;
        this.baseUrl = "/api/channel";
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

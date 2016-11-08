import {Class} from '@angular/core';
import {Http} from '@angular/http';

var CountryService = Class({
    constructor: [Http, function(http) {
      this.http = http;
  }],
  getCountriesByRegion: function (region) {
      var baseUrl = "https://restcountries.eu/rest/v1/region/";
      return this.http.get(baseUrl + region).map(
          function(res) {
              res = res.json();
              return res;
          }
      )
  }
});

export {CountryService};

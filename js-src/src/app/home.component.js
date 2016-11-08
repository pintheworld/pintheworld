import {Component} from '@angular/core';

import homeTemplate from './home.component.html'

import {CountryService} from './country.service';

let HomeComponent = Component({
    template: homeTemplate,
    viewProviders: [CountryService]
})
    .Class({
        constructor: [CountryService, function (CountryService) {
            this.CountryService = CountryService;
        }],
        getCountriesByRegion: function () {
            var self = this;
            self.countries = [];
            self.error = '';
            var region = 'oceania';
            this.CountryService.getCountriesByRegion(region).subscribe(
                function(data) {
                    console.log(data);
                    self.countries = data;
                },
                function (err) {
                    self.error = 'we have an error';
                }
            );
        }
    });

export {HomeComponent};

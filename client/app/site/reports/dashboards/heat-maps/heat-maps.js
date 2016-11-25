'use strict';

angular.module('fakiyaMainApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('ap.heat-maps', {
                url: '/reports/dashboards/heat-maps',
                template: '<heat-maps></heat-maps>'
            });
    });

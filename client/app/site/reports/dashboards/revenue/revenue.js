'use strict';

angular.module('fakiyaMainApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('ap.revenue', {
                url: '/reports/dashboards/revenue',
                template: '<revenue></revenue>'
            });
    });

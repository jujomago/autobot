'use strict';

angular.module('fakiyaMainApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('ap.head-maps', {
                url: '/reports/dashboards/head-maps',
                template: '<head-maps></head-maps>'
            });
    });

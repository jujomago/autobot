'use strict';

angular.module('fakiyaMainApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('ap.gauges', {
                url: '/reports/dashboards/gauges',
                template: '<gauges></gauges>'
            });
    });
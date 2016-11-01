'use strict';

angular.module('fakiyaMainApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('ap.customer-journey', {
                url: '/reports/dashboards/customer-journey',
                template: '<customer-journey></customer-journey>'
            });
    });
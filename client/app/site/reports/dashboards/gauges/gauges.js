'use strict';

angular.module('fakiyaMainApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('gauges', {
                parent: 'dashboards',
                url: '/',
                template: '<gauges></gauges>'
            });
    });
'use strict';

angular.module('fakiyaMainApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboards', {
                parent: 'ap.reports',
                url: '/'
            });
    });
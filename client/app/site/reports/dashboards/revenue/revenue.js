'use strict';

angular.module('fakiyaMainApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('revenue', {
                parent: 'dashboards',
                url: '/revenue',
                template: '<revenue></revenue>'
            });
    });

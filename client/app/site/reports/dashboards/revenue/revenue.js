'use strict';

angular.module('fakiyaMainApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('revenue', {
                parent: 'dashboards',
                url: '/',
                template: '<revenue></revenue>'
            });
    });

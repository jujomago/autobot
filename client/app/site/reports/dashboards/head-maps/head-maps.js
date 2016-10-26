'use strict';

angular.module('fakiyaMainApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('head-maps', {
                parent: 'dashboards',
                url: '/head-maps',
                template: '<headMaps></headMaps>'
            });
    });

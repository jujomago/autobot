'use strict';

angular.module('fakiyaMainApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('head-maps', {
                parent: 'dashboards',
                url: '/',
                template: '<headMaps></headMaps>'
            });
    });

'use strict';

angular.module('fakiyaMainApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('customer-journey', {
                parent: 'dashboards',
                url: '/customer-journey',
                template: '<customerJourney></customerJourney>'
            });
    });
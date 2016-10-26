'use strict';

angular.module('fakiyaMainApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('customer-journey', {
                parent: 'dashboards',
                url: '/',
                template: '<customerJourney></customerJourney>'
                // templateUrl: '/reports/dashboards/customer-journey/customer-journey.html',
                // controller: 'CustomerJourneyController',
                // controllerAs: 'customerJourney'
            });
    });
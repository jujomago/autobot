'use strict';

angular.module('fakiyaMainApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('score-cards-kpi', {
                parent: 'dashboards',
                url: '/',
                template: '<scoreCardsKpi></scoreCardsKpi>'
            });
    });
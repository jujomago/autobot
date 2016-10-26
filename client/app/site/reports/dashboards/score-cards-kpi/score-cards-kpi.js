'use strict';

angular.module('fakiyaMainApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('score-cards-kpi', {
                parent: 'dashboards',
                url: '/score-cards-kpi',
                template: '<scoreCardsKpi></scoreCardsKpi>'
            });
    });
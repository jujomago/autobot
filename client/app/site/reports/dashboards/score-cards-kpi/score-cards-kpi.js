'use strict';

angular.module('fakiyaMainApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('score-cards-kpi', {
                url: '/reports/dashboards/score-cards-kpi',
                template: '<score-cards-kpi></score-cards-kpi>'
            });
    });
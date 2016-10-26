'use strict';

angular.module('fakiyaMainApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('ap.scorecard-kpi', {
                url: '/reports/dashboards/scorecard-kpi',
                template: '<score-card-kpi></score-card-kpi>'
            });
    });
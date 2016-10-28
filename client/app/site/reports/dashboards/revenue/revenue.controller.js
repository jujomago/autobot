'use strict';
(function(){

    class RevenueComponent {
        constructor() {
        }
    }

    angular.module('fakiyaMainApp')
        .component('revenue', {
            templateUrl: 'app/site/reports/dashboards/revenue/revenue.html',
            controller: RevenueComponent
        });
})();

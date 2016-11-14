'use strict';
(function(){

    class GaugesComponent {
        constructor() {
        }
    }

    angular.module('fakiyaMainApp')
        .component('gauges', {
            templateUrl: 'app/site/reports/dashboards/gauges/gauges.html',
            controller: GaugesComponent
        });
})();

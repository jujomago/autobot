'use strict';
(function(){

    class HeadMapsComponent {
        constructor() {
        }
    }

    angular.module('fakiyaMainApp')
        .component('heatMaps', {
            templateUrl: 'app/site/reports/dashboards/heat-maps/heat-maps.html',
            controller: HeadMapsComponent
        });
})();
'use strict';
(function(){

    class HeadMapsComponent {
        constructor() {
        }
    }

    angular.module('fakiyaMainApp')
        .component('headMaps', {
            templateUrl: 'app/site/reports/dashboards/head-maps/head-maps.html',
            controller: HeadMapsComponent
        });
})();
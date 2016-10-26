'use strict';
(function(){

    class CustomerJourneyComponent {
        constructor() {
        }
    }

    angular.module('fakiyaMainApp')
        .component('customerJourney', {
            templateUrl: 'app/site/reports/dashboards/customer-journey/customer-journey.html',
            controller: CustomerJourneyComponent
        });
})();

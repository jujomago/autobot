'use strict';
(function(){

    class CustomerJourneyComponent {
        constructor() {
            console.log('Customer Journey Component');
        }
    }

    angular.module('fakiyaMainApp')
        .component('customerJourney', {
            templateUrl: 'app/site/reports/dashboards/customer-journey/customer-journey.html',
            controller: CustomerJourneyComponent
        });
})();

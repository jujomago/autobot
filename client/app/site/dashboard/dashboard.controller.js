'use strict';
(function(){

class DashboardComponent {
  constructor() {
    //this.message = 'Hello';
  }
}

angular.module('fakiyaMainApp')

  .component('dashboard', {
    templateUrl: 'app/site/dashboard/dashboard.html',
    controller: DashboardComponent
  });

})();

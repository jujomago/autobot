'use strict';
(function(){

class PartnerAcoountsListComponent {
  constructor($location) {
    this.location=$location;
    this.accountsList=[
      {name:'JSmith1162',avatar:'jsmith.jpg'},
      {name:'anniehal23',avatar:'jsmith.jpg'},
    ];
  }
  clickList(){
    this.location.path('/underconstruction');
  }
}
PartnerAcoountsListComponent.$inject=['$location'];

angular.module('fakiyaMainApp')
  .component('accounts.partneraccounts', {
    templateUrl: 'app/site/partneraccounts/partneraccounts.html',
    controller: PartnerAcoountsListComponent
  });

})();

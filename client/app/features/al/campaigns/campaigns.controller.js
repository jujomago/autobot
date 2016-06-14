'use strict';
(function(){

class CampaignsComponent {
  constructor($state,$sessionStorage) {  
      if(!$sessionStorage.logged){
          $state.go('login');
      } 
  }
}

CampaignsComponent.$inject=['$state','$sessionStorage'];

angular.module('fakiyaMainApp')
  .component('al.campaigns', {
    templateUrl: 'app/features/al/campaigns/campaigns.html',
    controller: CampaignsComponent
  });

})();

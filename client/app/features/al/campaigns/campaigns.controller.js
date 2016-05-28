'use strict';
(function(){

class CampaignsComponent {
  constructor() {  
  }
}

CampaignsComponent.$inject=[];

angular.module('fakiyaMainApp')
  .component('al.campaigns', {
    templateUrl: 'app/features/al/campaigns/campaigns.html',
    controller: CampaignsComponent
  });

})();

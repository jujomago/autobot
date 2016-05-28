'use strict';
(function(){
  
let  _CampaignService,_state,_stateParams;

class OutboundComponent {
  constructor($state,$stateParams,CampaignService) {
    //this.message = 'Hello';
    _CampaignService=CampaignService;
    _stateParams=$stateParams;
    _state=$state;
    this.message = { show: false };
    this.campaign = {};
    this.SubmitText='Save';
    this.found=false;
  }
  $onInit(){
    if(_stateParams.campaign!==null){
      let campaignType=_stateParams.campaign.type.toLowerCase();
      let campaignName=_stateParams.campaign.name;
      this.getCampaign(campaignType,campaignName);
    }
  }
  getCampaign(type,name){    
    return _CampaignService.getCampaign(type,name)
    .then(response=>{
      if(response.statusCode===200){
         this.campaign={
           name:response.data.name,
           description:response.data.description,
           trainingMode:response.data.trainingMode,
           autoRecord:response.data.autoRecord,
           noOutOfNumbersAlert:response.data.noOutOfNumbersAlert,
           maxQueueTime:{
             minutes:response.data.maxQueueTime.minutes,
             seconds:response.data.maxQueueTime.seconds
           }
         };
         this.found=true;
         return response;
      }else{
         this.message = { show: true, type: 'danger', text: response.error.body };
         return null;
      }
    })
    .catch(error=>{
       console.log('error in client');
       console.log(error);
       this.message = { show: true, type: 'danger', text: error };
    });
  }
  update(){  
    this.SubmitText='Saving...';
    return _CampaignService.updateOutBoundCampaign(this.campaign)
    .then(response=>{  
      if(response.statusCode===200 && response.error===null){
         let messageObj={show:true,type:'success',text:'Campaign "'+this.campaign.name+'" Updated'};
         _state.go('campaigns.list', { message: messageObj });       
      }else{
         this.message = { show: true, type: 'danger', text: response.error.body };
         this.SubmitText='Save';       
      }
      return response;
    })
    .catch(error=>{
         console.log('error in client');
         this.SubmitText='Save';
         console.log(error);
         this.message = { show: true, type: 'danger', text: error };
    });
    
  }
  
}
 OutboundComponent.$inject = ['$state','$stateParams','CampaignService'];

angular.module('fakiyaMainApp')
  .component('al.campaigns.edit.outbound', {
    templateUrl: 'app/features/al/campaigns/edit/outbound/outbound.html',
    controller: OutboundComponent
  });

})();

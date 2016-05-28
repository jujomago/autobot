'use strict';
(function(){
  
  let  _CampaignService,_state,_stateParams;

class InboundComponent {
  constructor($state,$stateParams,CampaignService) {
    _CampaignService=CampaignService;
    _stateParams=$stateParams;
    _state=$state;
    this.message = { show: false };
    this.campaign = {};
    this.SubmitText='Save';
    this.found=false;
    this.ivrScripts=[];
  }
  $onInit(){
    if(_stateParams.campaign!==null){
      let campaignType=_stateParams.campaign.type.toLowerCase();
      let campaignName=_stateParams.campaign.name;
      this.getCampaign(campaignType,campaignName);
    }
    this.getIVRScripts();
  }
  getIVRScripts() {
    return _CampaignService.getIVRScripts()
        .then(response => {
            console.log('response in client');
            if (response.statusCode === 200) {
                this.ivrScripts=response.data;
                for (var i = 0; i < this.ivrScripts.length; i++) {
                  var el = this.ivrScripts[i];
                  if( el.name===this.campaign.ivrscript){          
                    console.log(el.name);
                    this.campaign.ivrscript=el;
                    break;
                  }
                }             
           
            } else {
                console.warn('there is an error');
                this.message = { show: true, type: 'danger', text: response.error.body };                     
            }
            return response;                   
        }).catch(err => {
            console.log('error in client');
            console.error(err);
            this.message = { show: true, type: 'warning', text: err };
            return null;
        });
  }  
  
  getCampaign(type,name){    
    return _CampaignService.getCampaign(type,name)
    .then(response=>{
      console.log('response in client 1');
      console.log(response.data);
      if(response.statusCode===200){
         this.campaign={
           name:response.data.name,
           description:response.data.description,          
           autoRecord:response.data.autoRecord,        
           maxNumOfLines:response.data.maxNumOfLines
           
         };
         if(response.data.defaultIvrSchedule){
           this.campaign.ivrscript=response.data.defaultIvrSchedule.scriptName;
         }        
         
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
    console.log(this.campaign);
    
    return _CampaignService.updateInBoundCampaign(this.campaign)
    .then(response=>{
      console.log('response in client 1');
      console.log(response);
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


InboundComponent.$inject=['$state','$stateParams','CampaignService'];


angular.module('fakiyaMainApp')
  .component('al.campaigns.edit.inbound', {
    templateUrl: 'app/features/al/campaigns/edit/inbound/inbound.html',
    controller: InboundComponent
  });

})();

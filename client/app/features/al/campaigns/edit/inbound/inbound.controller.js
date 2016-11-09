'use strict';
(function(){

  let  _CampaignService,_timeout,_state,_stateParams;

class InboundComponent {
  constructor($state,$timeout,$stateParams,CampaignService) {
    _CampaignService=CampaignService;
    _stateParams=$stateParams;
    _state=$state;
    _timeout=$timeout;
    this.message = { show: false };
    this.campaign = {};
    this.SubmitText='Save';
    this.found=false;
    this.ivrScripts=[];
    this.dnisAssigned=[];
    this.dnisAvailable=[];
  }
  $onInit(){
    if(_stateParams.name!==null){
      let campaignType= 'inbound';
      let campaignName=_stateParams.name;
      this.getCampaign(campaignType,campaignName);
      this.getAttachedDnis(campaignName);
    }
    this.getIVRScripts();
  }

  getIVRScripts() {
    return _CampaignService.getIVRScripts()
        .then(response => {
            if (response.statusCode === 200) {
                this.ivrScripts=response.data;
                for (var i = 0; i < this.ivrScripts.length; i++) {
                  var el = this.ivrScripts[i];
                  if( el.name===this.campaign.ivrscript){
                    this.campaign.ivrscript=el;
                    break;
                  }
                }
            }
            return response;
        })
        .catch(error =>{
            this.message={ show: true, type: 'danger', text: error.errorMessage };
            return error;
        });
  }

  getAttachedDnis(campaignName){
        return _CampaignService.getAttachedDnis(campaignName)
          .then(response => {
              if (response.statusCode === 200) {
                   if(response.data){
                      this.dnisAssigned=response.data;
                   }
                //   this.listsAssigned=response.data.map(e=>e.listName);
                   this.getDnis();
              }
              return response;
          })
         .catch(error =>{
            this.message={ show: true, type: 'danger', text: error.errorMessage };
            return error;
         });
   }
   getDnis(){
         return _CampaignService.getDNIS()
          .then(response => {
              if (response.statusCode === 200) {
                   this.dnisAvailable=response.data;
              }
              return response;
          })
         .catch(error =>{
            this.message={ show: true, type: 'danger', text: error.errorMessage };
            return error;
         });
   }

  getCampaign(type,name){
    return _CampaignService.getCampaign(type,name)
    .then(response=>{
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
      }
       return response;
    })
    .catch(error =>{
        this.message={ show: true, type: 'danger', text: error.errorMessage };
        return error;
    });
 }

  removeDni(dniItemAssigned){
     let requiredFormat={
       campaignName:this.campaign.name,
       DNISList:[dniItemAssigned]
     };
      let indexElem = this.dnisAssigned.indexOf(dniItemAssigned);

     return _CampaignService.removeDnis(requiredFormat)
     .then(response=>{
        if (response.statusCode === 200){
            this.dnisAssigned.splice(indexElem, 1);
            this.dnisAvailable.unshift(dniItemAssigned);
            this.message={ show: true, type: 'success', text: 'DNI Removed Successfully', expires:1500 };
        }
        return response;
     })
    .catch(error =>{
        this.message={ show: true, type: 'danger', text: error.errorMessage };
        return error;
    });
  }

  addDnis(dnisItem){
     let requiredFormat={
       campaignName:this.campaign.name,
       DNISList:[dnisItem]
     };

     let indexElem = this.dnisAvailable.indexOf(dnisItem);

     return _CampaignService.addDNIS(requiredFormat)
     .then(response=>{
        if (response.statusCode === 200){
            this.dnisAvailable.splice(indexElem, 1);
            this.dnisAssigned.unshift(dnisItem);
            this.message={ show: true, type: 'success', text: 'DNI Added Successfully', expires:1500 };

        }
        return response;
     })
    .catch(error =>{
        this.message={ show: true, type: 'danger', text: error.errorMessage };
        return error;
    });
  }


  update(){
    this.SubmitText='Saving...';
    this.campaign.defaultIvrSchedule={scriptName: this.campaign.ivrscript.name};

    return _CampaignService.updateInBoundCampaign(this.campaign)
    .then(response=>{
      if(response.statusCode===200 && response.errorMessage===null){
         let messageObj={show:true,type:'success',text:'Campaign Updated Successfully'};
         _state.go('ap.al.campaigns', { message: messageObj });
      }
      return response;
    })
    .catch(error =>{
          this.SubmitText='Save';
          this.message={ show: true, type: 'danger', text: error.errorMessage, expires: 3000 };
          return error;
    });
 }
}


InboundComponent.$inject=['$state','$timeout','$stateParams','CampaignService'];


angular.module('fakiyaMainApp')
  .component('al.campaigns.edit.inbound', {
    templateUrl: 'app/features/al/campaigns/edit/inbound/inbound.html',
    controller: InboundComponent
  });

})();

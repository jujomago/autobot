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
    if(_stateParams.campaign!==null){
      let campaignType=_stateParams.campaign.type.toLowerCase();
      let campaignName=_stateParams.campaign.name;
      this.getCampaign(campaignType,campaignName);
      this.getAttachedDnis(campaignName);
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
            } 
            return response;                   
        })
        .catch(e =>{    
           let theMsg= (e.error)? e.error.body:e; 
           this.message={ show: true, type: 'danger', text: theMsg };
           return e;
        });
  }  
  
  getAttachedDnis(campaignName){           
        return _CampaignService.getAttachedDnis(campaignName)
          .then(response => {
              console.log('response ATTACHED DNIS in client');
              console.log(response);       
              if (response.statusCode === 200) {
                   if(response.data){
                      this.dnisAssigned=response.data;  
                   }                                              
                //   this.listsAssigned=response.data.map(e=>e.listName);
                 //  console.log(this.listsAssigned);
                   this.getDnis();                 
              }
              return response;                   
          })
         .catch(e =>{    
            let theMsg= (e.error)? e.error.body:e; 
            this.message={ show: true, type: 'danger', text: theMsg };
            return e;
          });     
   }
   getDnis(){
         return _CampaignService.getDNIS()
          .then(response => {
              console.log('response  DNIS in client');
                console.log(response);       
              if (response.statusCode === 200) {
                   this.dnisAvailable=response.data;  
              }
              return response;                   
          })
         .catch(e =>{    
            let theMsg= (e.error)? e.error.body:e; 
            this.message={ show: true, type: 'danger', text: theMsg };
            return e;
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
      }
       return response;
    })
    .catch(e =>{    
        let theMsg= (e.error)? e.error.body:e; 
        this.message={ show: true, type: 'danger', text: theMsg };
        return e;
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
            this.message={ show: true, type: 'success', text: 'Dni Removed Correctly', expires:1500 };
        }
        return response;
     })
    .catch(e =>{    
        let theMsg= (e.error)? e.error.body:e; 
        this.message={ show: true, type: 'danger', text: theMsg };
        return e;
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
            this.message={ show: true, type: 'success', text: 'Dni Added Correctly', expires:1500 };
           
        }
        return response;
     })
    .catch(e =>{    
        let theMsg= (e.error)? e.error.body:e; 
        this.message={ show: true, type: 'danger', text: theMsg };
        return e;
    });
  } 
   
  
  update(){  
    this.SubmitText='Saving...';
    this.campaign.defaultIvrSchedule={scriptName: this.campaign.ivrscript.name};
    
    return _CampaignService.updateInBoundCampaign(this.campaign)
    .then(response=>{
      console.log('response in client 1');
      console.log(response);
      if(response.statusCode===200 && response.error===null){
         let messageObj={show:true,type:'success',text:'Campaign "'+this.campaign.name+'" Updated'};
         _state.go('ap.al.campaigns', { message: messageObj });
      }
      return response;
    })
    .catch(e =>{    
       this.SubmitText='Save';
        let theMsg= (e.error)? e.error.body:e; 
        this.message={ show: true, type: 'danger', text: theMsg , expires:3000};
        return e;
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

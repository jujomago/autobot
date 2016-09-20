'use strict';
(function(){
  
let  _CampaignService,_timeout,_state,_stateParams;

class AutodialComponent {
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
    this.listsAssigned=[];
    this.listsAvailable=[];   
  }
  
  $onInit(){
    if(_stateParams.name !== null){
      let campaignType= 'autodial';
      let campaignName= _stateParams.name;
      this.getCampaign(campaignType,campaignName);
      this.getAttachedLists(campaignName);
    }
    this.getIVRScripts();
  }
    
  addList(listItem){   
      let listState=[{listName:listItem.name,campaignName:this.campaign.name}];
      let requiredAddListFormat={ 
          campaignName:this.campaign.name, 
          lists: listState 
       };         

      return _CampaignService.addLists(requiredAddListFormat)
     .then(response=>{
        if (response.statusCode === 200){   
            this.listsAssigned.unshift(listItem.name);
            this.message={ show: true, type: 'success', text: 'List Added Correctly', expires:1500};
         //   this.showMessage('success','List Added Correctly',1500);
        }
        return response;
     })
    .catch(error =>{    
        this.message={ show: true, type: 'danger', text: error.errorMessage };
        return error;
    });
      
  }
       
   removeList(listItemAssigned){
     let requiredFormat={
       campaignName:this.campaign.name,
       lists:[listItemAssigned]
     };
    
     let indexElem = this.listsAssigned.indexOf(listItemAssigned);
     
     return _CampaignService.removeLists(requiredFormat)
     .then(response=>{
        if (response.statusCode === 200){            
            this.listsAssigned.splice(indexElem, 1);
             this.message={ show: true, type: 'success', text: 'List Removed Correctly', expires:1500};
        //    this.showMessage('success','List Removed Correctly',1500);
        }
        return response;
     })
      .catch(error =>{    
        this.message={ show: true, type: 'danger', text: error.errorMessage };
        return error;
      });
    } 
  
   getLists(){           
        return _CampaignService.getLists()
          .then(response => {
              console.log('response in client');
              if (response.statusCode === 200) {                       
                  this.listsAvailable=response.data;
               
              }
              return response;                   
          })
          .catch(error =>{    
              this.message={ show: true, type: 'danger', text: error.errorMessage };
              return error;
          });
          
   }
   
   getAttachedLists(campaignName){           
        return _CampaignService.getAttachedLists(campaignName)
          .then(response => {
              console.log('response ATTACHED LISTS in client');
                console.log(response);       
              if (response.statusCode === 200) {
                  if(response.data){                          
                      this.listsAssigned=response.data.map(e=>e.listName);
                  }
                  console.log(this.listsAssigned);
                  this.getLists();                  
              }
              return response;                   
          })
          .catch(error =>{    
              this.message={ show: true, type: 'danger', text: error.errorMessage };
              return error;
          });
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
       .catch(error =>{    
            this.message={ show: true, type: 'danger', text: error.errorMessage };
            return error;
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
           noOutOfNumbersAlert:response.data.noOutOfNumbersAlert,
           maxNumOfLines:response.data.maxNumOfLines,
           dnisAsAni:response.data.dnisAsAni
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
  
  update(){  
    this.SubmitText='Saving...';
    this.campaign.defaultIvrSchedule={scriptName: this.campaign.ivrscript.name};
    
    return _CampaignService.updateAutoDialCampaign(this.campaign)
    .then(response=>{
      console.log('response in client 1');
      console.log(response);
      if(response.statusCode===200 && response.errorMessage===null){
         let messageObj={show:true,type:'success',text:'Campaign "'+this.campaign.name+'" Updated'};
         _state.go('ap.al.campaigns', { message: messageObj });      
      }
      return response;
    })
    .catch(error =>{ 
        this.SubmitText='Save';   
        this.message={ show: true, type: 'danger', text: error.errorMessage };
        return error;
    });
  }  
}

AutodialComponent.$inject=['$state','$timeout','$stateParams','CampaignService'];


angular.module('fakiyaMainApp')
  .component('al.campaigns.edit.autodial', {
    templateUrl: 'app/features/al/campaigns/edit/autodial/autodial.html',
    controller: AutodialComponent
  });

})();

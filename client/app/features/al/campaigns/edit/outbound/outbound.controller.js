'use strict';
(function(){
  
let  _CampaignService,_window, _timeout, _state,_stateParams;

class OutboundComponent {
  constructor($state, $window,$timeout, $stateParams,CampaignService) {

    _CampaignService=CampaignService;
    _stateParams=$stateParams;
    _state=$state;
    _window = $window;
    _timeout=$timeout;
    
    this.message = { show: false };
    this.campaign = {};
    this.SubmitText='Save';
    this.found=false;
    this.listsAssigned=[];
    this.listsAvailable=[];      
  }
  
  $onInit(){
    if(_stateParams.campaign!==null){
      console.log(_stateParams);
      let campaignType=_stateParams.campaign.type.toLowerCase();
      let campaignName=_stateParams.campaign.name;
      this.getCampaign(campaignType,campaignName);
      this.getAttachedLists(campaignName);
    }
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
            this.message={ show: true, type: 'success', text: 'List Added Correctly', expires:1500 };
         //   this.showMessage('success','List Added Correctly',1500);
        }
        return response;
     })
    .catch(e =>{    
          let theMsg= (e.error)? e.error.body:e; 
          this.message={ show: true, type: 'danger', text: theMsg };
          return e;
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
            this.message={ show: true, type: 'success', text: 'List Removed Correctly', expires:1500 };
//            this.showMessage('success','List Removed Correctly',1500);
        }
        return response;
     })
     .catch(e =>{    
          let theMsg= (e.error)? e.error.body:e; 
          this.message={ show: true, type: 'danger', text: theMsg };
          return e;
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
         .catch(e =>{    
                let theMsg= (e.error)? e.error.body:e; 
                this.message={ show: true, type: 'danger', text: theMsg };
                return e;
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
          .catch(e =>{    
                let theMsg= (e.error)? e.error.body:e; 
                this.message={ show: true, type: 'danger', text: theMsg };
                return e;
          });
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
      }
    })
    .catch(e =>{    
          let theMsg= (e.error)? e.error.body:e; 
          this.message={ show: true, type: 'danger', text: theMsg };
          return e;
    });
  }
  
  update(){  
    this.SubmitText='Saving...';
    return _CampaignService.updateOutBoundCampaign(this.campaign)
    .then(response=>{  
      if(response.statusCode===200 && response.error===null){
         let messageObj={show:true,type:'success',text:'Campaign "'+this.campaign.name+'" Updated'};
         _state.go('ap.al.campaigns', { message: messageObj });       
      }
      return response;
    })
   .catch(e =>{    
          this.SubmitText='Save';    
          let theMsg= (e.error)? e.error.body:e; 
          this.message={ show: true, type: 'danger', text: theMsg };
          return e;
    });

  }  
}
 OutboundComponent.$inject = ['$state','$window','$timeout','$stateParams','CampaignService'];

angular.module('fakiyaMainApp')
  .component('al.campaigns.edit.outbound', {
    templateUrl: 'app/features/al/campaigns/edit/outbound/outbound.html',
    controller: OutboundComponent
  });

})();

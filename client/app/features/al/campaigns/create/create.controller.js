'use strict';
(function () {

    let _state, _window, _timeout, _CampaignService;

    class CreateComponent {

        constructor($state, $window, $timeout, CampaignService) {
            this.newCampaign = { ivrscript: '', type: 'outbound' };
            this.SubmitText = 'Save';
            this.message = { show: false };
            this.ivrScripts=[];
            this.dnis=[];
            this.lists=[];
            this.dnisToSend=[];
            this.listToSend=[];
            this.loadingIVR=false;
            this.loadedOnceDNIS=false;
            this.loadedOnceLISTS=false;            

            _CampaignService = CampaignService;
            _state = $state;    
            _window = $window;
            _timeout = $timeout;    
          
        }
        $onInit(){
             this.checkRadio(); 
        }        
        
        checkRadio(){       
            console.log('checking radio');
            if(this.newCampaign.type!=='outbound'){
                if(this.ivrScripts.length===0 && !this.loadingIVR){
                   this.getIVRScripts();         
                }       
            }
  
           if(this.newCampaign.type==='inbound' && !this.loadedOnceDNIS){
                if(this.dnis.length===0){
                   this.getDNIS();
                }
           }  
          
           if( (this.newCampaign.type==='autodial' || this.newCampaign.type==='outbound')  && !this.loadedOnceLISTS){
              if(this.lists.length===0){
                    this.getLists();
               }
           }  
        }
        addDni(dniNumber){
           if (this.dnisToSend.indexOf(dniNumber) < 0 && this.dnis.indexOf(dniNumber) >= 0) {
                let indexElem = this.dnis.indexOf(dniNumber);
                this.dnis.splice(indexElem, 1);
                this.dnisToSend.unshift(dniNumber);
                return true;
            } else {
                return false;
            }
          
        }
        
        removeDni(dniNumber){
           if (this.dnis.indexOf(dniNumber) < 0 && this.dnisToSend.indexOf(dniNumber) >= 0) {
                let indexElem = this.dnisToSend.indexOf(dniNumber);
                this.dnisToSend.splice(indexElem, 1);
                this.dnis.unshift(dniNumber);
                return true;
            } else {
                return false;
            }
        }
        
        addList(listItem){
            if (this.listToSend.indexOf(listItem) < 0 && this.lists.indexOf(listItem) >= 0) {
                if(listItem.size <= 0){
                     _window.alert('Please select a list with al least 1 record');
                     return false;                       
                }else{
                    let indexElem = this.lists.indexOf(listItem);
                    this.lists.splice(indexElem, 1);
                    this.listToSend.unshift(listItem);
                    return true;
                }   
            } else {
                return false;
            }
        }
        
        removeList(listItem){
            if (this.lists.indexOf(listItem) < 0 && this.listToSend.indexOf(listItem) >= 0) {
                let indexElem = this.listToSend.indexOf(listItem);
                this.listToSend.splice(indexElem, 1);
                this.lists.unshift(listItem);
                return true;
            } else {
                return false;
            }
        }    
        

    
        getIVRScripts() {
            this.loadingIVR=true;
           return _CampaignService.getIVRScripts()
                .then(response => {
                    console.log('response in client');
                    if (response.statusCode === 200) {
                       this.ivrScripts=response.data;
                       this.newCampaign.ivrscript=this.ivrScripts[0];
                       this.loadingIVR=false;
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
        
        getDNIS(){           
             return _CampaignService.getDNIS()
                .then(response => {
                    console.log('response in client');
                    if (response.statusCode === 200) {
                       this.dnis=response.data;              
                       this.loadedOnceDNIS=true;
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
        
        getLists(){           
              return _CampaignService.getLists()
                .then(response => {
                    console.log('response in client');
                    if (response.statusCode === 200) {                       
                        this.lists=response.data;
                        this.loadedOnceLISTS=true;
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
        
  
        saveWithList(){
            let thecampaign=this.newCampaign;
            let listState=this.listToSend.map((element)=>{
                                   return {listName:element.name, campaignName:thecampaign.name };
                            });                        
                        
            let requiredAddListFormat={ campaignName:thecampaign.name   , lists: listState };                               
            
            return _CampaignService.createCampaign(thecampaign)
                .then(response=>{
                    console.log('first then response');
                    console.log(response);   
                    if(response.statusCode===201){
                        console.log('create campaign');
                        return _CampaignService.addLists(requiredAddListFormat);
                    }else{
                        return Promise.reject(response);
                    } 
                })
                .then(response=>{
                    console.log('second then response');
                    console.log(response);
                    if (response.statusCode===200){
                        console.log('assingned lists to campaign');
                        var messageObj = {
                            type: 'success',
                            text: 'Campaign Created SuccessFully'
                        };
                        _state.go('campaigns.list', { message: messageObj });    
                        return 'Created OK';               
                    }else{
                        return Promise.reject(response); 
                    }
                })
                .catch(e=>{
                    console.log('error in client');
                    console.error(e);                   
                    let erroMsg= (e.error)? e.error.body:e; 
                    this.SubmitText='Save';
                    this.message = { show: true, type: 'warning', text: erroMsg };
                });
        }
        
        saveWithDnis(){
    
            let requiredAddListFormat={ campaignName:this.newCampaign.name , DNISList: this.dnisToSend };                               
            
            return _CampaignService.createCampaign(this.newCampaign)
                .then(response=>{
                    console.log('first then response');
                    console.log(response);   
                    if(response.statusCode===201){
                        console.log('create campaign');
                        return _CampaignService.addDNIS(requiredAddListFormat);
                    }else{
                        return Promise.reject(response);
                    } 
                })
                .then(response=>{
                    console.log('second then response');
                    console.log(response);
                    if (response.statusCode===200){
                        console.log('assingned lists to campaign');
                        var messageObj = {
                            type: 'success',
                            text: 'Campaign Created SuccessFully'
                        };
                        _state.go('campaigns.list', { message: messageObj });    
                        return 'Created OK';               
                    }else{
                        return Promise.reject(response); 
                    }
                })
                .catch(e=>{
                    console.log('error in client');
                    console.error(e);                   
                    let erroMsg= (e.error)? e.error.body:e; 
                    this.SubmitText='Save';
                    this.message = { show: true, type: 'warning', text: erroMsg };
                });
        }
        

        save() {      
           
            if(this.newCampaign.type!=='inbound'){
                if(!this.listToSend.length){
                     this.message = { show: true, type: 'warning', text: 'you must select at least one list' };
                       _timeout(() => {
                            this.message.show = false;
                      }, 3000);
                     
                     
                }else{
                     this.SubmitText = 'Saving...';
                    this.saveWithList();
                }
            }
            else{
                 if(!this.dnisToSend.length){
                     this.message = { show: true, type: 'warning', text: 'you must select at least one list' };
                     _timeout(() => {
                            this.message.show = false;
                      }, 3000);
                }else{
                     this.SubmitText = 'Saving...';
                    this.saveWithDnis();
                }
            }                
        }
    }
    

    CreateComponent.$inject = ['$state', '$window', '$timeout', 'CampaignService'];

    angular.module('fakiyaMainApp')
        .component('al.campaigns.create', {
            templateUrl: 'app/features/al/campaigns/create/create.html',
            controller: CreateComponent
        });

})();

'use strict';
(function () {

    let _state, _timeout, _CampaignService;

    class CreateComponent {

        constructor($state, $timeout, CampaignService) {
            this.newCampaign = { ivrscript: '', type: 'outbound' };
            this.SubmitText = 'Save';
            this.message = { show: false };
            this.ivrScripts=[];
            this.loadingIVR=false;
            _CampaignService = CampaignService;
            _state = $state;    
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
                   return 'loadingIVR';
                }else{
                    return 'loadedIVR';
                }       
            }else{
                return null;
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
                    }
                    return response;                   
                })
                .catch(e =>{    
                    let theMsg= (e.error)? e.error.body:e; 
                    this.message={ show: true, type: 'danger', text: theMsg };
                    return e;
                });
                
        }
        
        save() {
            if(this.newCampaign.type !== 'outbound'){
                this.newCampaign.defaultIvrSchedule={scriptName: this.newCampaign.ivrscript.name};
            }
            this.SubmitText = 'Saving...';
            return _CampaignService.createCampaign(this.newCampaign)
                .then(response=>{
                    console.log('first then response');
                    console.log(response);   
                    if(response.statusCode===201){
                        console.log('created campaign');
                        var messageObj = {
                            type: 'success',
                            text: 'Campaign Created SuccessFully'
                        };
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
    

    CreateComponent.$inject = ['$state', '$timeout', 'CampaignService'];

    angular.module('fakiyaMainApp')
        .component('al.campaigns.create', {
            templateUrl: 'app/features/al/campaigns/create/create.html',
            controller: CreateComponent
        });

})();

'use strict';
(function(){
	let _DispositionsService, _$state;
	function setDispositionParams(disposition,params){
		disposition.typeParameters={allowChangeTimer: params.allowChangeTimer, attempts: params.attempts*1, timer: params.timer, useTimer: params.useTimer};
	}

	class EditComponent {
		constructor($state,$stateParams,DispositionsService) {
			this.message='';
			this.groupActive='';
			this.action='Disposition';
			this.actionName=$stateParams.dispositionName;
			this.found = false;
			this.SubmitText = 'Save';
			this.redial={useTimer: false, validAttempts: true, timer: {}, allowChangeTimer: false};
			this.notDial={useTimer: false, timer: {}, allowChangeTimer: false};
			this.redial.timer={minutes: 1, days: 0, hours: 0};
			this.notDial.timer={minutes: 1, days: 0, hours: 0};
			this.disposition={agentMustCompleteWorksheet: true};
			this.nameDisposition = $stateParams.dispositionName;
			_$state = $state;
			_DispositionsService = DispositionsService;
		}
		$onInit(){
			this.getDisposition();
		}
		getDisposition()
		{
	        return _DispositionsService.getDisposition(this.nameDisposition)
	          .then(response => {
	              this.found = true;
	              if (response.statusCode === 200) {                       
                  	this.disposition=response.data;
					if(this.disposition.type === 'RedialNumber'){
						this.redial = this.disposition.typeParameters;
						this.redial.timer.days = this.disposition.typeParameters.timer.days;
					}
					else if(this.disposition.type === 'DoNotDial'){
						this.notDial = this.disposition.typeParameters;
					}
					else if(this.disposition.type === 'FinalDisp' || this.disposition.type === 'FinalApplyToCampaigns'){
						this.groupActive='finalDisp';
					}
					else{
						this.groupActive='dnc';
					}
	              }
	              return response;                   
	          })
	          .catch(error =>{    
	            this.message={ show: true, type: 'danger', text: error.errorMessage};
	            return error;
	          });
	          
		}
		clearGroup(){
			this.groupActive='';
		}
		finalDispActive(){
			this.disposition.type='FinalDisp';
		}
		maxOfDays(type){
			if(type.hours>0 || type.minutes>0){
				return 59;
			}
			return 60;
		}
		minOfHours(type){
			if(type.days!==0 || type.minutes!==0){
				return 0;
			}
			return 1;
		}
		minOfDays(type){
			if(type.hours!==0 || type.minutes!==0){
				return 0;
			}
			return 1;
		}
		minOfMinutes(type){
			if(type.days!==0 || type.hours!==0){
				return 0;
			}
			return 1;
		}
		save() {
			let type=null;
			if(this.disposition.type === 'RedialNumber'){
				type = this.redial;
			}
			else if(this.disposition.type === 'DoNotDial'){
				type = this.notDial;
			}
			else{
				delete this.disposition.typeParameters;
			}
			if(type!==null){	
		    	setDispositionParams(this.disposition, type);
			}
		    this.SubmitText = 'Saving...';
		    this.disposition.oldName = this.nameDisposition;
		    return _DispositionsService.updateDisposition(this.disposition)
		        .then(response=>{  
		            if(response.statusCode===200){
		                this.message = {
		                    type: 'success',
		                    text: 'Disposition Updated SuccessFully'
		                };
		                _$state.go('ap.al.dispositions', { message: this.message });   
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
	EditComponent.$inject = ['$state','$stateParams', 'DispositionsService'];
	angular.module('fakiyaMainApp')
	  .component('al.dispositions.edit', {
	    templateUrl: 'app/features/al/dispositions/create/create.html',
	    controller: EditComponent
	  });

})();

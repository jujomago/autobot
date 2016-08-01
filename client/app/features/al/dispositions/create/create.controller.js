'use strict';
(function(){
	let _DispositionsService, _$state;
	function setDispositionParams(disposition,params){
		disposition.typeParameters={allowChangeTimer: params.allowChangeTimer, attempts: params.attempts, timer: params.timer, useTimer: params.useTimer};
	}
	class CreateComponent {
		constructor($state,DispositionsService) {
			this.message='';
			this.groupActive='finalDisp';
			this.SubmitText = 'Save';
			this.found = true;
			this.action='Dispositions';
			this.actionName='New Disposition';
			this.redial={useTimer: false, validAttempts: true, timer: {}, allowChangeTimer: false};
			this.notDial={useTimer: false, timer: {}, allowChangeTimer: false};
			this.redial.timer={minutes: 1, days: 0, hours: 0};
			this.notDial.timer={minutes: 1, days: 0, hours: 0};
			this.disposition={agentMustCompleteWorksheet: true};
			_$state = $state;
			_DispositionsService = DispositionsService;
		}
		$onInit(){
			angular.element('#name').focus();
		}
		clearGroup(){
			this.groupActive='';
		}
		finalDispActive(){
			this.disposition.type='FinalDisp';
		}
		minOfHours(type){
			if(type.days!==0 || type.minutes!==0){
				return 0;
			}
			return 1;
		}
		maxOfDays(type){
			if(type.hours>0 || type.minutes>0){
				return 59;
			}
			return 60;
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
			if(type!==null){	
		    	setDispositionParams(this.disposition, type);
			}
		    this.SubmitText = 'Saving...';
		    return _DispositionsService.createDisposition(this.disposition)
		        .then(response=>{  
		            if(response.statusCode===201){
		                this.message = {
		                    type: 'success',
		                    text: 'Disposition Created SuccessFully'
		                };
		                _$state.go('ap.al.dispositions', { message: this.message });   
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
	CreateComponent.$inject = ['$state', 'DispositionsService'];
	angular.module('fakiyaMainApp')
	  .component('al.dispositions.create', {
	    templateUrl: 'app/features/al/dispositions/create/create.html',
	    controller: CreateComponent
	  });
})();

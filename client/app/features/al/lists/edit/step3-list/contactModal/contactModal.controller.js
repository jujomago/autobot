'use strict';

let _$modalInstance;
class modalCtrl{
    constructor($uibModalInstance, contactModal, fields){
        
        _$modalInstance = $uibModalInstance;

	  	this.data = contactModal;
	  	
		this.contact = angular.copy(this.data);
	  		
	  	this.formDataModal = this.getValidation(fields);
    }

    getValidation(fields){

		    let validation = [];
		    let typeInput;
		    let required;

		    //I have changed this because I just use lodash once time
		    fields.map(function(value){
		      
		      switch(value.type){
		        case 'PHONE': typeInput = 'tel';
		          break;
		        case 'STRING': typeInput = 'text';
		          break;
		        case 'EMAIL': typeInput = 'email';
		          break;
		        default:
		          typeInput = 'text';
		          break;
		      }

		      required = (value.isKey) ? true : false;

		      if(typeInput === 'tel'){
		      	validation.push({'name': value.name, 'type': typeInput, 'required': required, 'min-length': 10, 'max-lentgh': 20});	
		      }else{
		      	validation.push({'name': value.name, 'type': typeInput, 'required': required, 'min-length': 5, 'max-lentgh': 50});	
		      }

		    });
		    return validation;
	}

    save(form){
    	if(form.$valid && form.$submitted){
			_$modalInstance.close(this.contact);
    	}
	}

    cancel(form){
    	form.$setPristine();
        _$modalInstance.dismiss('cancel');
    }
}

modalCtrl.$inject = ['$uibModalInstance', 'contactModal', 'fields'];

angular.module('fakiyaMainApp')
    .controller('ContactModalCtrl', modalCtrl);
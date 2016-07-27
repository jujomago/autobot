'use strict';

let _$modalInstance;
let _lodash;
class modalCtrl{
    constructor($uibModalInstance, lodash, contactModal, fields, keys){
        
        _$modalInstance = $uibModalInstance;

        _lodash = lodash;

	  	this.data = contactModal;
	  	
		this.contact = angular.copy(this.data);
	  		
	  	this.formDataModal = this.getValidation(keys, fields);
    }

    getValidation(keys, fields){

		    let validation = [];
		    let typeInput;
		    let required;
		    let index;
		    let i = 0;

		    let restrictions;

		    _lodash.map(fields, function(value){
		      
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

		      index = keys.indexOf(value.name);

		      required = (index !== -1) ? true:false;

		      if(value.restrictions){
		        validation.push({name: value.name, type: typeInput, required: required});
		        restrictions = value.restrictions;
		        _lodash.map(function(restrictions, valueRes){
		          let keyRes = valueRes.type;
		          let value = valueRes.value;
		          validation[i][keyRes] = value;
		        });
		        i++;
		      }else{
		          validation.push({name: value.name, type: typeInput, required: required});        
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

modalCtrl.$inject = ['$uibModalInstance', 'lodash', 'contactModal', 'fields', 'keys'];

angular.module('fakiyaMainApp')
    .controller('ContactModalCtrl', modalCtrl);
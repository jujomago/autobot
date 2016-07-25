'use strict';
(function(){
	let _ListService, _$state;
    function _getFormatedMessage(message)
    {
        switch(message)
        {
            case ORIGINAL_CAMPAIGN_MESSAGE:
                return CUSTOM_CAMPAIGN_MESSAGE;
            case ORIGINAL_SYSTEM_MESSAGE:
                return CUSTOM_SYSTEM_MESSAGE;
        }
        return message;
    }
    function _getErrorMessage(xmlMessage)
    {
        let firstStep=xmlMessage.split('<faultstring>');
        if(firstStep.length<2){
            return xmlMessage;
        }
        let secondStep=firstStep[1].split('</faultstring>');
        if(secondStep.length>0){
            return secondStep[0];
        }
        return xmlMessage;
    }
	class CreateComponent {
	  constructor($state, ListsService) {
	    this.message = {text: ''}; 
	    this.SubmitText = 'Save';
	    _ListService = ListsService;
	    _$state = $state;
	  }
	  $onInit(){
	  	this.instance = this.parent.modalInstance;
	  }
	  close(){
	  	if(this.instance){
	  		this.instance.dismiss('cancel');
	  	}
	  }
	  save(){
	  	this.SubmitText = 'Saving...';
		    return _ListService.createList(this.list)
	        .then(response=>{  
	            if(response.statusCode===201){
	                this.message = {
	                    type: 'success',
	                    text: 'List Created SuccessFully',
	                    expires: 3000
	                };
	                this.close();
	                _$state.go('ap.al.lists', { message: this.message }, {reload: true});   
	            }
	            else{
		            this.SubmitText='Save';
		            let theMsg= _getErrorMessage(response.errorMessage); 
		            this.message={ show: true, type: 'danger', text: theMsg, expires: 5000 };
	            }
	            return response;
	         });
	  }
	}
	CreateComponent.$inject = ['$state', 'ListsService'];
	angular.module('fakiyaMainApp')
	  .component('al.lists.create', {
	    templateUrl: 'app/features/al/lists/create/create.html',
	    controller: CreateComponent,
	    require: {
            parent : '^al.lists.list'
        }
	  });

})();

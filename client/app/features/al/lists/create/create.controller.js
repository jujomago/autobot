'use strict';
(function(){
	let _ListService, _$state;
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
                this.message = {
                    type: 'success',
                    text: 'List Created SuccessFully',
                    expires: 3000
                };
                this.close();
                _$state.go('ap.al.lists', { message: this.message }, {reload: true});   
            	return response;
	         })
	        .catch(error =>{    
	            this.SubmitText='Save';
	            this.message={ show: true, type: 'danger', text: error.errorMessage, expires: 5000 };
	            return error;
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

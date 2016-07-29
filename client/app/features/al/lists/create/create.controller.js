'use strict';
(function(){
	let _ListService, _$state;
	class CreateComponent {
	  constructor($state, ListsService) {
	    this.message = { show: false }; 
	    this.SubmitText = 'Save';
	    _ListService = ListsService;
	    _$state = $state;
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
	                _$state.go('ap.al.lists', { message: this.message });   
	            }
	            else{
		            this.SubmitText='Save';
		            let theMsg= response.errorMessage; 
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
	    controller: CreateComponent
	  });

})();
'use strict';
(function(){
	let _ListService, _$state;
	class CreateComponent {
	  constructor($state, ListsService) {
	    this.message = {text: ''};
	    this.SubmitText = 'Save';
			this.selectedRow = null;
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
									_$state.go('ap.al.lists', { message: this.message, list:this.list }, {reload: true});
									return response;
	        		}
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

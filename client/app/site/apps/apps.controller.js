'use strict';
(function(){
	class AppsComponent {
	constructor($state, AppsService) {
		this.partners = [];
		this.message = {show: false};
		this.AppsService = AppsService;
	}
	$onInit(){
		this.getApps();
	}
	getApps(){
		return this.AppsService.getApps()
		.then(response => {
			this.partners=response.data;
			return response;
		})
		.catch(error => {
			let theMsg= error.errorMessage; 
            this.message={ show: true, type: 'danger', text: theMsg };
            return error;
		});
	}
}
	AppsComponent.$inject = ['$state', 'AppsService'];
	angular.module('fakiyaMainApp')
	  .component('apps', {
	    templateUrl: 'app/site/apps/apps.html',
	    controller: AppsComponent
	  });

})();

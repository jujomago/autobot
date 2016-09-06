'use strict';
(function(){
	let _SelectLastAccount;
	class AppsComponent {
	constructor($state, AppsService, SelectLastAccount) {
		this.partners = [];
		this.message = {show: false};
		this.AppsService = AppsService;
		_SelectLastAccount = SelectLastAccount;
	}
	$onInit(){
		this.getApps();
	}
	selectInstalledApp(partnerId, appName){
		_SelectLastAccount(partnerId, appName);
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
	AppsComponent.$inject = ['$state', 'AppsService', 'SelectLastAccount'];
	angular.module('fakiyaMainApp')
	  .component('apps', {
	    templateUrl: 'app/site/apps/apps.html',
	    controller: AppsComponent
	  });

})();

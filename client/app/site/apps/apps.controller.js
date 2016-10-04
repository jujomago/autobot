'use strict';
(function(){
	let _$state;
	let _GetHomePage;
	class AppsComponent {
	constructor($state, AppsService, GetHomePage, EnumManager) {
		this.partners = [];
		this.message = {show: false};
		this.AppsService = AppsService;
		this.appStatus = EnumManager.getEnums();
		_$state = $state;
		_GetHomePage = GetHomePage;
	}
	$onInit(){
		this.getApps();
	}
	selectInstalledApp(appName){
		_$state.go(_GetHomePage.of(appName));
	}
	getApps(){
		return this.AppsService.getApps()
		.then(response => {
			this.partners = response.data;
			return response;
		})
		.catch(error => {
			let theMsg= error.errorMessage;
            this.message={ show: true, type: 'danger', text: theMsg };
            return error;
		});
	}
}
	AppsComponent.$inject = ['$state', 'AppsService', 'GetHomePage', 'EnumManager'];
	angular.module('fakiyaMainApp')
	  .component('apps', {
	    templateUrl: 'app/site/apps/apps.html',
	    controller: AppsComponent
	  });
})();

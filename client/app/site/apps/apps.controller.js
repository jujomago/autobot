'use strict';
(function(){
	let _$state,_$anchorScroll,_$stateParams;
	let _GetHomePage;
	class AppsComponent {
	constructor($stateParams,$state, $anchorScroll,AppsService, GetHomePage, EnumManager) {
		this.partners = [];
		this.message = {show: false};
		this.AppsService = AppsService;
		this.appStatus = EnumManager.getEnums();
		_$state = $state;
		_GetHomePage = GetHomePage;
		_$stateParams=$stateParams;
		_$anchorScroll = $anchorScroll;	
		this.found = false;
	}
	$onInit(){		
		this.getApps();
	}
	//BUG 2110 The Partner name does not redirect me to the corresponding Partner section
	$postLink() {
		this.getApps()
			.then(() => {
				angular.element(document).ready(function () {
					if (_$stateParams.paramAppSelected) {
						_$anchorScroll.yOffset = 90;
						_$anchorScroll(_$stateParams.paramAppSelected);
					}
				});
			});
	}
	selectInstalledApp(appName){
		_$state.go(_GetHomePage.of(appName));
	}
	selectNoInstalledApp(item){
		_$state.go('ap.partneraccounts', { partnerId: item.partner.partnerName, appName: item.app.appName });
	}
	getApps(){
		return this.AppsService.getApps()
		.then(response => {
			this.partners = response.data;
			this.found = true;
			return response;
		})
		.catch(error => {
			let theMsg= error.errorMessage;
            this.message={ show: true, type: 'danger', text: theMsg };
            return error;
		});
	}
}
	AppsComponent.$inject = ['$stateParams','$state', '$anchorScroll','AppsService', 'GetHomePage', 'EnumManager'];
	angular.module('fakiyaMainApp')
	  .component('apps', {
	    templateUrl: 'app/site/apps/apps.html',
	    controller: AppsComponent
	  });
})();

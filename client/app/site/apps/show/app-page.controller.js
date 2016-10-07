'use strict';
(function () {
	let _$state;
	let _AppsService, _GetHomePage;
	class AppPageComponent {

		constructor($stateParams, $state, AppsService, GetHomePage, EnumManager) {
			this.appName = $stateParams.appName;		
			this.message = { show: false };
			_AppsService = AppsService;
			_GetHomePage = GetHomePage;
			this.appStatus = EnumManager.getEnums();
			this.application = {};
			_$state = $state;
		}
		$onInit() {
			this.getApp();
		}
		selectNoInstalledApp(){
			_$state.go('ap.partneraccounts', { partnerId: this.partner.partnerName, appName: this.application.appName });
		}
		selectInstalledApp(){
			_$state.go(_GetHomePage.of(this.application.appName));
		}
		getApp() {
			return _AppsService.getApp(this.appName)
				.then(response => {
					this.partner = response.data.partner;
					this.application=response.data.app;
					this.application.isInstalled = response.data.installed;
					return response;
				})
				.catch(error => {
					let theMsg = error.errorMessage;
					this.message = { show: true, type: 'danger', text: theMsg };
					return error;
				});
		}
	}

	AppPageComponent.$inject = ['$stateParams', '$state', 'AppsService', 'GetHomePage', 'EnumManager'];

	angular.module('fakiyaMainApp')
		.component('apppage', {
			templateUrl: 'app/site/apps/show/app-page.html',
			controller: AppPageComponent
		});

})();

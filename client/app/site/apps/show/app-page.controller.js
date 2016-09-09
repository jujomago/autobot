'use strict';
(function () {
	let _$state;
	let _AppsService, _GetHomePage;
	class AppPageComponent {

		constructor($stateParams, $state, AppsService, GetHomePage) {
			this.appName = $stateParams.appName;		
			this.message = { show: false };
			_AppsService = AppsService;
			_GetHomePage = GetHomePage;
			this.application = {};
			_$state = $state;
		}
		$onInit() {
			this.getApp();
		}
		selectInstalledApp(){
			_$state.go(_GetHomePage.of(this.application.appName));
		}
		getApp() {
			return _AppsService.getApp(this.appName)
				.then(response => {
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

	AppPageComponent.$inject = ['$stateParams', '$state', 'AppsService', 'GetHomePage'];

	angular.module('fakiyaMainApp')
		.component('apppage', {
			templateUrl: 'app/site/apps/show/app-page.html',
			controller: AppPageComponent
		});

})();

'use strict';
(function () {
	let _AppsService;
	class AppPageComponent {

		constructor($stateParams, AppsService) {
			this.appName = $stateParams.appName;		
			this.message = { show: false };
			_AppsService = AppsService;
			this.application = {};
		}
		$onInit() {
			this.getApp();
		}
		getApp() {
			return _AppsService.getApp(this.appName)
				.then(response => {
					this.application=response.data.app;
					this.application.isInstalled = response.data.installed;
				})
				.catch(error => {
					let theMsg = error.errorMessage;
					this.message = { show: true, type: 'danger', text: theMsg };
					return error;
				});
		}
	}

	AppPageComponent.$inject = ['$stateParams', 'AppsService'];

	angular.module('fakiyaMainApp')
		.component('apppage', {
			templateUrl: 'app/site/apps/show/app-page.html',
			controller: AppPageComponent
		});

})();

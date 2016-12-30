'use strict';
(function () {
	let _$state;
	let _AppsService, _GetHomePage;
	class AppPageComponent {

		constructor($stateParams, $state, AppsService, GetHomePage, EnumManager,DummyServices) {
			this.appName = $stateParams.appName;			
			this.appDescription = $stateParams.description;
			this.appList = $stateParams.list;	
			this.message = { show: false };
			_AppsService = AppsService;
			_GetHomePage = GetHomePage;
			this.appStatus = EnumManager.getEnums();
			this.application = {};
			_$state = $state;
			this.name = '';
			this.serviceApp=DummyServices.getData(this.appName)[0];
		}
		$onInit() {
			if(['tfsg','tfss','tfsb','ccc'].indexOf(this.appName)===-1){						
				this.getApp();				
			}else{			
				this.application =  {
					appName: this.serviceApp.name,
					appFullName: this.serviceApp.fullName,
					description: this.serviceApp.description,
					list: this.serviceApp.list,
					partner: this.serviceApp.partner
				};
			}
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
					this.application.partner = this.partner.partnerFullName;
					return response;
				})
				.catch(error => {
					let theMsg = error.errorMessage;
					this.message = { show: true, type: 'danger', text: theMsg };
					return error;
				});
		}
	}

	AppPageComponent.$inject = ['$stateParams', '$state', 'AppsService', 'GetHomePage', 'EnumManager','DummyServices'];

	angular.module('fakiyaMainApp')
		.component('apppage', {
			templateUrl: 'app/site/apps/show/app-page.html',
			controller: AppPageComponent
		});

})();

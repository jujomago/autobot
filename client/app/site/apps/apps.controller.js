'use strict';
(function(){
	class AppsComponent {
	constructor($state, AppsService, lodash) {
		this.partners = [];
		this.apps = [];
		this.appsByPartner = [];
		this.appsPartner = {};
		this.message = {show: false};
		this.AppsService = AppsService;
		_lodash = lodash;
		this.getter = 'partner.partnerFullName';
	}
	$onInit(){
		this.getApps();
	}
	getApps(){
		return this.AppsService.getApps()
		.then(response => {
			console.log("=====APPS CONTROLLER====");
			console.log(response);
			this.apps=this.groupBy(response.data);
			this.partners = Object.getOwnPropertyNames(this.apps);
			//this.partners = response.data;
			let x = this.apps.Five9;
			let partn = this.partners;
			partn = partn[1];
			console.log(partn);
			for(let i = 0; i<x.length;i++){
					this.appsByPartner[i] = this.apps.Five9[i].app;

			}
			this.appsPartner = { apps: this.appsByPartner, partnerName: 'Five9' }
			console.log(this.appsPartner.partnerName);
			return response;
		})
		.catch(error => {
			let theMsg= error.errorMessage;
            this.message={ show: true, type: 'danger', text: theMsg };
            return error;
		});
	}
	groupBy(list){
    let getter = _$parse(this.getter);
    return _lodash.groupBy(list, function(item) {
        return getter(item);
    });
  }
}
	AppsComponent.$inject = ['$state', 'AppsService', 'lodash'];
	angular.module('fakiyaMainApp')
	  .component('apps', {
	    templateUrl: 'app/site/apps/apps.html',
	    controller: AppsComponent
	  });

})();

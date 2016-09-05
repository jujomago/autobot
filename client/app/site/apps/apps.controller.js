'use strict';
(function(){
	class AppsComponent {
	constructor($state, AppsService, lodash) {
		//this.partners = [];
		this.apps = [];
		this.appsPartner = [];
		this.message = {show: false};
		this.AppsService = AppsService;
		_lodash = lodash;
		this.getter = 'partner.partnerFullName';
	}
	$onInit(){
		this.getApps();
	}

	//This needs a refactor to be able for any partner.
	getApps(){
		return this.AppsService.getApps()
		.then(response => {
			this.apps=this.groupBy(response.data);
			console.log(this.apps);
			//this.partners = response.data;
			console.log(this.apps);
			let f9 = this.apps.Five9;
			for(let i = 0; i<f9.length;i++){
				this.appsPartner[i] = {app: f9[i].app, installed: f9[i].installed};
			}
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

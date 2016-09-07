'use strict';
(function(){
	let _lodash;
	let _$parse;
	class AppsComponent {
	constructor($state, AppsService, lodash, $parse) {
		this.partners = [];
		this.apps = [];
		this.message = {show: false};
		this.AppsService = AppsService;
		_$parse = $parse;
		_lodash = lodash;
		this.getter = 'partner.partnerName';
	}
	$onInit(){
		this.getApps();
	}

	getApps(){
		return this.AppsService.getApps()
		.then(response => {
			this.apps=this.groupBy(response.data);
			var j = 0;
			for(let partnerName in this.apps)
			{
				console.log(partnerName);
				this.partners[j] = {apps: this.apps[partnerName], partner: partnerName};
				j++;
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
	AppsComponent.$inject = ['$state', 'AppsService', 'lodash', '$parse'];
	angular.module('fakiyaMainApp')
	  .component('apps', {
	    templateUrl: 'app/site/apps/apps.html',
	    controller: AppsComponent
	  });

})();

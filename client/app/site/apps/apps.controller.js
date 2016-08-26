'use strict';
(function(){
	class AppsComponent {
	constructor($state, AppsService) {
		this.partners = [];
		this.message = {show: false};
		this.AppsService = AppsService;
	}
	$onInit(){
		this.getApps();
	}
	getApps(){
		return this.AppsService.getApps()
		.then(response => {
			console.log("=====APPS CONTROLLER====");
			// console.log(response);
			// let sales = new Array();
			// let five9 = new Array();
			// let ganalitics = new Array();
			// let analitics = new Array();
			// let i=0;
			// let s=0;
			// let f=0;
			// let g=0;
			// let a=0;
			 this.partners=response.data;
			 console.log(response.data);
			// console.log(response.data.length);
			// while(i<response.data.length){
			// 	if(this.partners[i].partner.partnerName == "Five9"){
			// 		five9[f] = this.partners[i];
			// 		f++;
			// 	}else if(this.partners[i].partner.partnerName == "SalesForce"){
			// 		sales[s] = this.partners[i];
			// 		s++;
			// 	}else if(this.partners[i].partner.partnerName == "GoogleAnalitics"){
			// 		ganalitics[g] = this.partners[i];
			// 		g++;
			// 	}else if(this.partners[i].partner.partnerName == "Analitics"){
			// 		analitics[a] = this.partners[i];
			// 		a++;
			// 	}
			// 	i++;
			// }
			// response =
			// console.log(sales);
			// console.log(five9);
			// console.log(ganalitics);
			// console.log(analitics);
			console.log(response);
			return response;
		})
		.catch(error => {
			let theMsg= error.errorMessage;
            this.message={ show: true, type: 'danger', text: theMsg };
            return error;
		});
	}
	getAppsByPartner(partner, data){
		let i = 0;
		let j = 0;
		while(i<data.length){
			if(data[i].partner.partnerName == partner){
				apps[j] = this.partners[i];
				j++;
			}
			i++;
		}
	}
}
	AppsComponent.$inject = ['$state', 'AppsService'];
	angular.module('fakiyaMainApp')
	  .component('apps', {
	    templateUrl: 'app/site/apps/apps.html',
	    controller: AppsComponent
	  });

})();

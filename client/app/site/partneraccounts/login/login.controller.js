'use strict';
(function(){
	let _$state;
	let _PartnersService;
	class LoginComponent {
	  constructor($state, PartnersService) {
	  	_$state = $state;
	  	_PartnersService = PartnersService;
	  }
	  login(){
	  	return _PartnersService.partnerLogin({partnerId: 'f9', appName: 'al', username: 'five9_1@five.com', password: this.password})
	  	.then(response => {
	  		console.log(response);
	  	})
	  	.catch(error => {
	  		console.log(error);
	  	});
	  }
	}
	LoginComponent.$inject = ['$state', 'PartnersService'];
	angular.module('fakiyaMainApp')
	  .component('al.accounts.login', {
	    templateUrl: 'app/site/partneraccounts/login/login.html',
	    controller: LoginComponent
	  });

})();
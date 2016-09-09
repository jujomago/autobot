'use strict';
(function(){
	let _$state, _$stateParams;
	let _PartnersService, _GetHomePage;
	function _getPartnerName(partnerId){
		switch(partnerId){
			case 'f9':
				return 'Five9';
		}
		return partnerId;
	}
	class LoginComponent {
	  constructor($state, $stateParams, PartnersService, GetHomePage) {
	  	_$state = $state;
	  	_$stateParams = $stateParams;
	  	_PartnersService = PartnersService;
	  	_GetHomePage = GetHomePage;
	  	this.partnerName = _getPartnerName(_$stateParams.partnerId);
	  	this.credentials = {partnerId: _$stateParams.partnerId, appName: _$stateParams.appName, username: _$stateParams.username};
	  	this.message = { show: false };
	  	this.sendingInfo = false;
	  }
	  login(){
	  	this.sendingInfo = true;
	  	return _PartnersService.partnerLogin(this.credentials)
	  	.then(response => {
	  		_$state.go(_GetHomePage.of(this.credentials.appName));
	  		return response;
	  	})
	  	.catch(error =>{    
	  	  this.sendingInfo = false;
          this.message={ show: true, type: 'danger', text: error.errorMessage};
          return error;
        });  
	  }
	  allAccounts(){
	  	_$state.go('partneraccounts', {partnerId: this.credentials.partnerId});
	  }
	}
	LoginComponent.$inject = ['$state', '$stateParams', 'PartnersService', 'GetHomePage'];
	angular.module('fakiyaMainApp')
	  .component('partners.accounts.login', {
	    templateUrl: 'app/site/partneraccounts/login/login.html',
	    controller: LoginComponent
	  });

})();
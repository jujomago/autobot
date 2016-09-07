'use strict';
(function(){
	let _$state, _$stateParams;
	let _PartnersService;
	function _getPartnerName(partnerId){
		switch(partnerId){
			case 'f9':
				return 'Five9';
		}
		return partnerId;
	}
	class LoginComponent {
	  constructor($state, $stateParams, PartnersService) {
	  	_$state = $state;
	  	_$stateParams = $stateParams;
	  	_PartnersService = PartnersService;
	  	this.partnerName = _getPartnerName(_$stateParams.partnerId);
	  	this.credentials = {partnerId: _$stateParams.partnerId, appName: _$stateParams.appName, username: _$stateParams.username};
	  	this.message = { show: false };
	  	this.sendingInfo = false;
	  }
	  login(){
	  	this.sendingInfo = true;
	  	return _PartnersService.partnerLogin(this.credentials)
	  	.then(response => {
	  		console.log(this.credentials);
	  		console.log(response);
	  		if(this.credentials.appName === 'al'){
	  			_$state.go('ap.al.skills');
	  		}
	  		else{
	  			_$state.go('underconstruction');
	  		}
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
	LoginComponent.$inject = ['$state', '$stateParams', 'PartnersService'];
	angular.module('fakiyaMainApp')
	  .component('partners.accounts.login', {
	    templateUrl: 'app/site/partneraccounts/login/login.html',
	    controller: LoginComponent
	  });

})();
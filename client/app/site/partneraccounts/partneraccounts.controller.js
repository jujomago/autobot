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
class PartnerAcoountsListComponent {
  constructor($location, $state, $stateParams, PartnersService) {
    this.location=$location;
    _$state = $state;
    _$stateParams = $stateParams;
    _PartnersService = PartnersService;
    this.partnerName = _getPartnerName(_$stateParams.partnerId);
    this.credentials = {partnerId: _$stateParams.partnerId, appName: _$stateParams.appName};
    this.message = { show: false };
    this.accountsList = [];
    this.emptyPartnerAccounts = true;
    this.found = false;
  }
  $onInit(){
		this.getAccounts();
	}
  getAccounts(){
    return _PartnersService.getPartnerAccounts(_$stateParams.partnerId)
    .then(response => {
      this.accountsList = response.data;
      this.found = true;
      if(this.accountsList.length === 0){
          this.emptyPartnerAccounts = null;
      }
      return response;
    })
    .catch(error =>{
        this.message={ show: true, type: 'danger', text: error.errorMessage};
        return error;
      });
  }
  goToLoginAccount(user){
     _$state.go('ap.login', {partnerId: this.credentials.partnerId, appName: this.credentials.appName, username: user});
  }
  goToSubscribeAccount(){
     _$state.go('ap.partnersubscribe', {partnerId: this.credentials.partnerId, appName: this.credentials.appName});
  }
}
PartnerAcoountsListComponent.$inject=['$location', '$state', '$stateParams', 'PartnersService'];
angular.module('fakiyaMainApp')
  .component('accounts.partneraccounts', {
    templateUrl: 'app/site/partneraccounts/partneraccounts.html',
    controller: PartnerAcoountsListComponent
  });

})();

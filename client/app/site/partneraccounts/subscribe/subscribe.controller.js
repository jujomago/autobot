'use strict';
let _$state;
let _PartnersService, _GetHomePage;
(function () {
  function _getPartnerName(partnerId){
    switch(partnerId){
      case 'f9':
        return 'Five9';
    }
    return partnerId;
  }
  class SubscribeController {

    constructor($state, $stateParams, PartnersService, GetHomePage) {
      _$state = $state;
      _PartnersService = PartnersService;
      this.credentials = {partnerId: $stateParams.partnerId, appName: $stateParams.appName, username: '', password: ''};
      this.message = { show: false };
      this.cleanWrongPassword=false;
      this.partnerInfo = {partnerId: $stateParams.partnerId, appName: $stateParams.appName};
      _GetHomePage = GetHomePage;
      this.partnerName = _getPartnerName(this.partnerInfo.partnerId);
      this.sendingInfo = false;
    }
    login(){
      return _PartnersService.partnerLogin(this.credentials)
      .then(response => {
        _$state.go(_GetHomePage.of(this.credentials.appName));
        return response;
      })
      .catch(error => {
        let message = {show: true, type: 'danger', text: error.errorMessage, expires: 5000 };
        _$state.go('ap.login', {partnerId: this.partnerInfo.partnerId, appName: this.partnerInfo.appName, username: this.credentials.username, message: message});
        return error;
      });
    }
    goToAllAccounts(){
       _$state.go('partneraccounts', {partnerId: this.partnerInfo.partnerId, appName: this.partnerInfo.appName});
    }
    subscribe(){
      this.sendingInfo = true;
      this.partnerInfo.credentials = {username: this.credentials.username, password: this.credentials.password};
      return _PartnersService.partnerAccountSubscription(this.partnerInfo)
      .then(() => {
        return this.login();
      })
      .catch(error => {
        this.sendingInfo = false;
        this.message = {show: true, type: 'danger', expires: 5000, text: error.errorMessage};
      });
    }
  

  }

  SubscribeController.$inject = ['$state', '$stateParams', 'PartnersService', 'GetHomePage'];


angular.module('fakiyaMainApp')
  .component('accounts.partnersubscribe', {
    templateUrl: 'app/site/partneraccounts/subscribe/subscribe.html',
    controller: SubscribeController
  });
})();

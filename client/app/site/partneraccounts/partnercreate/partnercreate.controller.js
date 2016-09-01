'use strict';
let _$state;
let _PartnersService;
(function () {

  class CreateController {

    constructor($state, PartnersService) {
      _$state = $state;
      _PartnersService = PartnersService;
      this.username = '';
      this.password = '';
      this.message = { show: false };
      this.cleanWrongPassword=false;
    }

    addAccount(){
      return _PartnersService.addAppToPartner({partnerId: 'f9', appName: 'al', credentials: {username: this.username}})
      .then(response => {
        console.log(response);
      })
      .catch(error =>{
        console.log(error);
      })
      //_$state.go('underconstruction');
    }

  }

  CreateController.$inject = ['$state', 'PartnersService'];


angular.module('fakiyaMainApp')
  .component('accounts.partnercreate', {
    templateUrl: 'app/site/partneraccounts/partnercreate/partnercreate.html',
    controller: CreateController
  });
})();

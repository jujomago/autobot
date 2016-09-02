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

  }

  CreateController.$inject = ['$state', 'PartnersService'];


angular.module('fakiyaMainApp')
  .component('accounts.partnercreate', {
    templateUrl: 'app/site/partneraccounts/partnercreate/partnercreate.html',
    controller: CreateController
  });
})();

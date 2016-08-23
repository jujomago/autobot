'use strict';
let _$state;
(function () {

  class CreateController {

    constructor($state) {
      _$state = $state;
      this.username = '';
      this.password = '';
      this.message = { show: false };
      this.cleanWrongPassword=false;
    }

    addAccount(){
      _$state.go('underconstruction');
    }

  }

  CreateController.$inject = ['$state'];


angular.module('fakiyaMainApp')
  .component('accounts.partnercreate', {
    templateUrl: 'app/site/partneraccounts/partnercreate/partnercreate.html',
    controller: CreateController
  });
})();

'use strict';

(function () {

  class CreateController {

    constructor($state) {
      this.state = $state;
      this.username = '';
      this.password = '';
      this.message = { show: false };
      this.cleanWrongPassword=false;
    }
  }

  CreateController.$inject = ['$state'];


angular.module('fakiyaMainApp')
  .component('accounts.partnercreate', {
    templateUrl: 'app/site/partneraccounts/partnercreate/partnercreate.html',
    controller: CreateController
  });
})();

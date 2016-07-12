'use strict';

(function () {

  class LoginController {

    constructor($state) {
      this.state = $state;
      this.username = '';
      this.password = '';
      this.message = { show: false };
    }

    autentichate() {
      if (this.username === 'admin@autoboxcorp.com' && this.password === 'Password1') {
        this.state.go('ap.al.skills');
      } else {
        this.message = { show: true, text: 'Invalid username and/or password. Please try again', type: 'danger'};
        this.password = '';
      }
    }

  }

  LoginController.$inject = ['$state'];



angular.module('fakiyaMainApp')
  .component('login', {
    templateUrl: 'app/site/login/login.html',
    controller: LoginController
  });
})();

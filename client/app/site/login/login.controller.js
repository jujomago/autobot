'use strict';

(function () {

  class LoginController {

    constructor($state) {
      this.state = $state;
      this.username = '';
      this.password = '';
      this.message = { show: false };
      this.cleanWrognPassword=false;
    }

    autentichate() {

      if (this.username === 'admin@autoboxcorp.com' && this.password === 'Password1') {
        this.state.go('ap.dashboard');
      } else {
        this.message = { show: true, text: 'Invalid username and/or password. Please try again', type: 'danger'};

        if(this.password){
            this.cleanWrognPassword=true;
            this.password = '';
        } else{
           this.cleanWrognPassword=false;
        }
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

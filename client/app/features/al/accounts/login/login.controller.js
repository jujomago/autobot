'use strict';
(function(){

class LoginComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('fakiyaMainApp')
  .component('al.accounts.login', {
    templateUrl: 'app/features/al/accounts/login/login.html',
    controller: LoginComponent
  });

})();

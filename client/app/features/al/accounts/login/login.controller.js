'use strict';
(function(){
let _$state;
class LoginComponent {
  constructor($state) {
  	_$state = $state;
  }
  login(){
  	_$state.go('underconstruction');
  }
}
LoginComponent.$inject = ['$state'];
angular.module('fakiyaMainApp')
  .component('al.accounts.login', {
    templateUrl: 'app/features/al/accounts/login/login.html',
    controller: LoginComponent
  });

})();

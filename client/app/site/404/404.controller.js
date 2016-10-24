'use strict';
(function(){
let AuthService;
class notfoundController {
  constructor($injector) {
    AuthService=$injector.get('AuthService');
    this.isLoggedIn = AuthService.isAuthenticated();
  }
}
notfoundController.$inject = ['$injector'];
angular.module('fakiyaMainApp')
  .component('notfound', {
    templateUrl: 'app/site/404/404.html',
    controller: notfoundController
  });
})();

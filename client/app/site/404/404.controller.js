'use strict';
(function(){
let AuthService;
class notfoundController {
  constructor(AuthService) {
    this.isLoggedIn = AuthService.isAuthenticated();
  }
}
notfoundController.$inject = ['AuthService'];
angular.module('fakiyaMainApp')
  .component('notfound', {
    templateUrl: 'app/site/404/404.html',
    controller: notfoundController
  });
})();

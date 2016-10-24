'use strict';
(function(){
let AuthService;
class notfoundController {
  constructor($injector) {
    AuthService=$injector.get('AuthService');
    this.isLoggedIn = false;
    this.isNotLoggedIn = false;
  }
  $onInit(){
    if(AuthService.isAuthenticated()){
      this.isLoggedIn = true;
    }else{
      this.isNotLoggedIn = true;
    }
  }
}
notfoundController.$inject = ['$injector'];
angular.module('fakiyaMainApp')
  .component('notfound', {
    templateUrl: 'app/site/404/404.html',
    controller: notfoundController
  });
})();

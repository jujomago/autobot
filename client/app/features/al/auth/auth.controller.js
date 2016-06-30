'use strict';
(function(){

class AuthComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('fakiyaMainApp')
  .component('ap.al.auth', {
    templateUrl: 'app/features/al/auth/auth.html',
    controller: AuthComponent
  });

})();

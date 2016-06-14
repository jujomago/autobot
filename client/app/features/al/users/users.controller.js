'use strict';
(function() {

class UsersComponent {
  constructor($state,$sessionStorage) {
      console.log('constructor UsersComponent');
      if(!$sessionStorage.logged){
          $state.go('login');
      }
   }
}
UsersComponent.$inject=['$state','$sessionStorage']; 
angular.module('fakiyaMainApp')
  .component('al.users', {
    templateUrl: 'app/features/al/users/users.html',
    controller: UsersComponent
  });


})();

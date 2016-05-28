'use strict';
(function() {

class UsersComponent {
  constructor($state) {
      console.log('constructor UsersComponent');
    this.messageRedirect='In 3 seconds,  it will redirect to stage => users.list';
      $state.go('users.list');
   }
}
UsersComponent.$inject=['$state']; 
angular.module('fakiyaMainApp')
  .component('al.users', {
    templateUrl: 'app/features/al/users/users.html',
    controller: UsersComponent
  });


})();

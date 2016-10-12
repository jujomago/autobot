'use strict';
(function(){

class notfoundComponent {
  constructor() {
    //this.message = 'Hello';
  }
}

angular.module('fakiyaMainApp')
  .component('notfound', {
    templateUrl: 'app/site/404/404.html',
    controller: notfoundComponent
  });

})();

'use strict';

(function(){

class ContactusComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('fakiyaMainApp')
  .component('contactus', {
    templateUrl: 'app/site/contactus/contactus.html',
    controller: ContactusComponent
  });

})();

'use strict';

(function(){

class ContactusComponent {
  constructor() {
    this.message = 'Hello';
    this.submitText='Submit';
  }
  sendmail(){
    console.log('sending the mail');
        this.submitText='Submitting..';
  }
}

angular.module('fakiyaMainApp')
  .component('contactus', {
    templateUrl: 'app/site/contactus/contactus.html',
    controller: ContactusComponent
  });

})();

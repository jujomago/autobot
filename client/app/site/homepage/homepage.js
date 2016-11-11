'use strict';
(function () {

  class HomePageController {
    constructor() {
      console.log('HomePageController');
      this.submitText='Submit';
      
    }
    sendmail(){
      console.log('now sending mail');
      console.log(this.cform);
      this.submitText='Submitting..';
    
    }
  }

  angular.module('fakiyaMainApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'app/site/homepage/homepage.html',
          controller: HomePageController,
          controllerAs: '$ctrl'
        });
    });

})();

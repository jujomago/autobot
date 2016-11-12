'use strict';
(function () {

  let _$http;
  class HomePageController {
  
    constructor($http) {
      console.log('HomePageController');
      this.submitText='Submit';
      _$http=$http;
    }
    sendmail(){
      console.log('now sending mail');
      console.log(this.cform);
      this.submitText='Submitting..';
          
    }
  }
  HomePageController.$inject=['$http'];

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

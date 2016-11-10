'use strict';
(function () {

  class HomePageController {
    constructor() {
      console.log('HomePageController');
      
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

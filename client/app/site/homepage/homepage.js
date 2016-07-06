'use strict';

angular.module('fakiyaMainApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('home', {  
        url: '/',
        templateUrl: 'app/site/homepage/homepage.html'
      });
  });

'use strict';

angular.module('fakiyaMainApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('home', {  
        url: '/',
        templateUrl: 'app/homepage/homepage.html'
      });
  });

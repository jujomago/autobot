'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al', {  
         url:'/al',   
         templateUrl: 'app/templates/adminlite/adminlite.html',
         params: {
            isLoggedIn: null
         }
      });
  });

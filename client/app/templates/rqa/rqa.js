'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.rqa', {  
         url:'/rqa',   
         templateUrl: 'app/templates/rqa/rqa.html',
         params: {
            isLoggedInToRqa: null
         }
      });
  });
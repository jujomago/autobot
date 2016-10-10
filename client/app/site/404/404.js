'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('notfound', {
       url: '/404',
       template: '<notfound></notfound>'   
     });
  });

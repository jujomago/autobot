'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.contactus', {
        url: '/contactus',
        template: '<contactus></contactus>'
      });
  });

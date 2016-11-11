'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('checkDNCModal', {
        url: '/checkDNCModal',
        views: {
        	'crud': {
        		template: '<check-dnc-modal></check-dnc-modal>'
        	}
        }
      });
  });

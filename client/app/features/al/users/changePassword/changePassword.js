'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.changePassword', {
        url: '/users/changePassword',
        views: {
        	'crud': {
        		template: '<al.users.changePassword></al.users.changePassword>'
        	}
    	}
      });
  });

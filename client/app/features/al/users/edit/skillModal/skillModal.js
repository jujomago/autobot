'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.skillModal', {
        url: '/users/skillModal',
        views: {
        	'crud': {
        		template: '<al.users.skillModal></al.users.skillModal>'
        	}
    	}
      });
  });

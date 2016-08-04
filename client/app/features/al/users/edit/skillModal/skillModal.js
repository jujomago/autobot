'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.addSkill', {
        url: '/users/addSkill',
        views: {
        	'crud': {
        		template: '<al.users.addSkill></al.users.addSkill>'
        	}
    	}
      });
  });

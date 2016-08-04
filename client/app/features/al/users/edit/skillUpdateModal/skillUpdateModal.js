'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.updateSkill', {
        url: '/users/updateSkill',
        views: {
        	'crud': {
        		template: '<al.users.updateSkill></al.users.updateSkill>'
        	}
    	}
      });
  });

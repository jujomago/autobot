'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.contactModal', {
        url: '/users/contactModal',
        views: {
        	'crud': {
        		template: '<al.lists.contactModal></al.lists.contactModal>'
        	}
    	}
      });
  });
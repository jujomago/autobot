'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.listsCreate', {
        url: '/lists/create',
        views:{
          'crud':{
            	template:'<al.lists.create></al.lists.create>' 
          	}
          },
         params: {
            message: null
         } 
      });
  });

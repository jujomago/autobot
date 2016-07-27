'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.mapping', {
        url: '/lists/edit/mapping/:name',
        views:{
          'crud':{
            template:'<al.lists.mapping></al.lists.mapping>', 
          	}
          },
         params: {
            settings: null
         } 
      });
  });

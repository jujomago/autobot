'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.lists', {
        url: '/lists',
        views:{
          'crud':{
            template:'<al.lists.list></al.lists.list>',
          	}
          },
         params: {
            message: null,
            name: null,
            identifier: null,
            list: null,
            isUpdate: null
         }
      });
  });

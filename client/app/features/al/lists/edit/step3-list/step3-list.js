'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.listsEdit-list', {
        url: '/lists/edit-list',
        views:{
          'crud':{
            template:'<al.lists.edit.list></al.lists.edit.list>', 
          	}
          },
         params: {
            message: null
         } 
      });
  });

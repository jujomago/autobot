'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.listsEdit-list', {
        url: '/lists/edit-list/:name',
        views:{
          'crud':{
            template:'<al.lists.edit.list></al.lists.edit.list>', 
            }
          },
         params: {
            settings: null
         } 
      });
  });
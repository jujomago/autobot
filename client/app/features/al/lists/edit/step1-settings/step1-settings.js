'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.listsEdit', {
        url: '/lists/edit/:name',
        views:{
          'crud':{
            template: '<al.lists.settings></al.lists.settings>',
          }
        }, 
        params:{
          isUpdate: null
        }
               
      });
  });

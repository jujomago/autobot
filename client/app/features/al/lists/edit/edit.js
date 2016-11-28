'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.listsEdit', {
        url: '/lists/edit/:name/:action',
        views:{
          'crud':{
            template: '<al.lists.edit></al.lists.edit>',
          }
        },
        params:{
          isUpdate: null
        }

      });
  });

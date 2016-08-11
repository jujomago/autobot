'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap.al.mapping', {
        url: '/lists/edit/mapping/:name',
        views:{
          'crud':{
              templateProvider:function($stateParams){
                if($stateParams.manual===true){
                   return '<al.lists.mapping manual="true"></al.lists.mapping>';
                }else{
                   return '<al.lists.mapping manual="false"></al.lists.mapping>';
                }
              }
           	}
          },
         params: {
            settings: null,
            manual:null
         } 
      });
  });

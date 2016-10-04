'use strict';

angular.module('fakiyaMainApp')
  .factory('GetHomePage', function () {
    
    function getHomePage(appName){
      switch(appName){
        case 'al':
          return 'ap.al.skills';
        default:
          return 'ap.underconstruction';
      }
    }

    return {
      of: getHomePage
    };
  });

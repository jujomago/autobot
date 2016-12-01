'use strict';

angular.module('fakiyaMainApp')
  .factory('GetHomePage', function () {
    
    function getHomePage(appName){
      switch(appName){
        case 'al':
          return 'ap.al.skills';
        case 'rqa':
          return 'ap.rqa.home';
        default:
          return 'ap.underconstruction';
      }
    }

    return {
      of: getHomePage
    };
  });

'use strict';

angular.module('fakiyaMainApp')
  .factory('GetHomePage', function () {

    function getHomePage(appName){
      switch(appName){
        case 'al':
          return 'ap.al.skills';
        case 'rqa':
          return 'ap.rqa.home';
        case 'sc':
          return 'ap.sc';
        default:
          return 'ap.underconstruction';
      }
    }

    return {
      of: getHomePage
    };
  });

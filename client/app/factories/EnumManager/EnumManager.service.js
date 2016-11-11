'use strict';

angular.module('fakiyaMainApp')
  .factory('EnumManager', function () {
    
    function getEnums(){
      //immutable object
      return  Object.freeze({
        COMING_SOON: 3
      });
    }
    

    return {
      getEnums: getEnums
    };
  });

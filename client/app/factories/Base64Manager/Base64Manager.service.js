'use strict';

angular.module('fakiyaMainApp')
  .factory('Base64Manager', function () {
    
    function encode(value){
      return btoa(value);
    }
    function decode(value){
      let decoded;
      try{
        decoded = atob(value);
      }catch(ex){
        decoded = null;
      }
      return decoded;
    }

    return {
      encode: encode,
      decode: decode 
    };
  });

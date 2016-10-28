'use strict';

angular.module('fakiyaMainApp')
  .factory('MultisetStrategy', function (DefaultValidator) {
    let validateType = function(value){
      return true;
    }
    let validateRequired = function(required, value) {
      return value && value.length>0;
    }
    let getMethods = function(){
      let setMethods = new DefaultValidator();
      setMethods.validateType = validateType;
      setMethods.Required = validateRequired;
      return setMethods;
    }
    return {
      getMethods: getMethods
    };
  });

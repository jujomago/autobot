'use strict';

angular.module('fakiyaMainApp')
  .factory('FieldValidator', function ($injector) {

    let validator;
    let setStrategy = function (name) {
        validator = $injector.get(name+'Strategy');
    };
    let getMethods = function(){
      if(validator){
        return validator.getMethods();
      }
      return null;
    };
    return {
      setStrategy: setStrategy,
      getMethods: getMethods
    };
  });

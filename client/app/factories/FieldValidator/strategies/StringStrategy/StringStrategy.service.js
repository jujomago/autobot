'use strict';

angular.module('fakiyaMainApp')
  .factory('StringStrategy', function (DefaultValidator) {
    let validateType = function(value){
      return typeof value === 'string';
    }
    let validateMinValue = function(min, value) {
      return value.length>=min;
    }
    let validateMaxValue = function(max, value) {
      return value.length<=max;
    }
    let getMethods = function(){
      let stringMethods = new DefaultValidator();
      stringMethods.validateType = validateType;
      stringMethods.MinValue = validateMinValue;
      stringMethods.MaxValue = validateMaxValue;
      return stringMethods;
    }
    return {
      getMethods: getMethods
    };
  });

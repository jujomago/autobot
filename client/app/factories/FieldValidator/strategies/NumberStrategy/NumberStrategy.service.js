'use strict';
angular.module('fakiyaMainApp')
  .factory('NumberStrategy', function (DefaultValidator) {
    let validateType = function(value){
      return !isNaN(value);
    }
    let validateMinValue = function(min, value) {
      return value*1>=min*1;
    }
    let validateMaxValue = function(max, value) {
      return value*1<=max*1;
    }

    let getMethods = function(){
      let numberMethods = new DefaultValidator();
      numberMethods.validateType = validateType;
      numberMethods.MinValue = validateMinValue;
      numberMethods.MaxValue = validateMaxValue;
      return numberMethods;
    }
    return {
      getMethods: getMethods
    };
  });

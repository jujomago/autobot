'use strict';

angular.module('fakiyaMainApp')
  .factory('PercentStrategy', function (DefaultValidator) {
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
      let percentMethods = new DefaultValidator();
      percentMethods.validateType = validateType;
      percentMethods.MinValue = validateMinValue;
      percentMethods.MaxValue = validateMaxValue;
      return percentMethods;
    }
    return {
      getMethods: getMethods
    };
  });

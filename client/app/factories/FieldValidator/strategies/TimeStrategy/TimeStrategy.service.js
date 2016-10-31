'use strict';

angular.module('fakiyaMainApp')
  .factory('TimeStrategy', function (DefaultValidator) {
    let validateType = function(){
      
      return true;
    };
    let validateMinValue = function(min, value) {
      return value>=new Date(min);
    };
    let validateMaxValue = function(max, value) {
      return value<=new Date(max);
    };
    let getMethods = function(){
      let timeMethods = new DefaultValidator();
      timeMethods.validateType = validateType;
      timeMethods.MinValue = validateMinValue;
      timeMethods.MaxValue = validateMaxValue;
      return timeMethods;
    };
    return {
      getMethods: getMethods
    };
  });

'use strict';

angular.module('fakiyaMainApp')
  .factory('DateStrategy', function (DefaultValidator) {
  	let validateType = function(value){
      console.log(typeof value);
      console.log(value);
      return true;
    };
    let validateMinValue = function(min, value) {
      return value>=new Date(min);
    };
    let validateMaxValue = function(max, value) {
      return value<=new Date(max);
    };
    let getMethods = function(){
      let dateMethods = new DefaultValidator();
      dateMethods.validateType = validateType;
      dateMethods.MinValue = validateMinValue;
      dateMethods.MaxValue = validateMaxValue;
      return dateMethods;
    };
    return {
      getMethods: getMethods
    };
  });

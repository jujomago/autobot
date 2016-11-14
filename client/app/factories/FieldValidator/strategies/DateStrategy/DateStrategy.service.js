'use strict';

angular.module('fakiyaMainApp')
  .factory('DateStrategy', function (DefaultValidator) {
  	let validateType = function(){
      return true;
    };
    let validateMinValue = function(min, value) {
      let date = new Date(min);
      date = (new Date(date.valueOf() + (date.getTimezoneOffset()-1440) * 60000 ));
      return value>= date;
    };
    let validateMaxValue = function(max, value) {
      let date = new Date(max);
      date = (new Date(date.valueOf() + (date.getTimezoneOffset()-1440) * 60000 ));

      return value<= date;
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

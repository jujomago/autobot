'use strict';

angular.module('fakiyaMainApp')
  .factory('CurrencyStrategy', function (DefaultValidator) {
    let validateType = function(value){
      return !isNaN(value);
    };
    let validateMinValue = function(min, value) {
      return value*1>=min*1;
    };
    let validateMaxValue = function(max, value) {
      return value*1<=max*1;
    };

    let getMethods = function(){
      let currencyMethods = new DefaultValidator();
      currencyMethods.validateType = validateType;
      currencyMethods.MinValue = validateMinValue;
      currencyMethods.MaxValue = validateMaxValue;
      return currencyMethods;
    };
    return {
      getMethods: getMethods
    };
  });

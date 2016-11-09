'use strict';

angular.module('fakiyaMainApp')
  .factory('DefaultValidator', function () {
    let validateType = function(){
      return false;
    };
    let validateMinValue = function(min, value) {
      return value>=min;
    };
    let validateMaxValue = function(max, value) {
      return value<=max;
    };
    let validateRegexp = function(regex, value) {
      regex = new RegExp(regex, 'g');
      return (value.match(regex)||[]).length === 1 && value.replace(regex, '')==='';
    };
    let validateRequired = function(required, value) {
      let result = value?true:false;
      return result;
    };
    let validateScale = function(scale, value) {
      let result = value.split('.');
      if(result.length>1){
        return result[1].length<=scale;
      }
      return true;
    };
    let validatePrecision = function(precision, value) {
      value = value.replace('-', '');
      let result = value.split('.');
      return result[0].length<=precision;
    };
    return function(){
     return {
      validateType: validateType,
      MinValue: validateMinValue,
      MaxValue: validateMaxValue,
      Regexp: validateRegexp,
      Required: validateRequired,
      Precision: validatePrecision,
      Scale: validateScale
    };
  };
  });

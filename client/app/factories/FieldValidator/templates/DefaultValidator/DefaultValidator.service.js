'use strict';

angular.module('fakiyaMainApp')
  .factory('DefaultValidator', function () {
    let validateType = function(value){
      return false;
    }
    let validateMinValue = function(min, value) {
      return value>=min;
    }
    let validateMaxValue = function(max, value) {
      return value<=max;
    }
    let validateRegexp = function(regex, value) {
      if(regex[0]!=='^'){
        regex = '^'+regex;
      }
      if(regex[regex.length-1]!=='$'){
        regex += '$';
      }
      let validator = new RegExp(regex, 'u');

      return validator.test(value);
    }
    let validateRequired = function(required, value) {
      let result = value?true:false;
      return result;
    }
    let validateScale = function(scale, value) {
      value = (value*1)+'';
      let result = value.split('.');
      if(result.length>1){
        return result[1].length<=scale;
      }
      return true;
    }
    let validatePrecision = function(precision, value) {
      value = (value*1)+'';
      let result = value.split('.');
        return result[0].length<=precision;
    }
    return function(){
     return {
      validateType: validateType,
      MinValue: validateMinValue,
      MaxValue: validateMaxValue,
      Regexp: validateRegexp,
      Required: validateRequired,
      Precision: validatePrecision,
      Scale: validateScale
    }
  };
  });

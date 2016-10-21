'use strict';

angular.module('fakiyaMainApp')
  .factory('UrlStrategy', function (DefaultValidator) {
    let validateType = function(value){
      if(value ===''){
            return true;
        }
        let regex = new RegExp(/^(ftp|https?):\s*[^#\\\s]([^\\]*\s[^\\\s]|[^\\\s]*)$/g);     
        console.log(regex.test(value));   
        return regex.test(value);
    }
    let validateMinValue = function(min, value) {
      return value.length>=min;
    }
    let validateMaxValue = function(max, value) {
      return value.length<=max;
    }
    let getMethods = function(){
      let urlMethods = new DefaultValidator();
      urlMethods.validateType = validateType;
      urlMethods.MinValue = validateMinValue;
      urlMethods.MaxValue = validateMaxValue;
      return urlMethods;
    }
    return {
      getMethods: getMethods
    };
  });

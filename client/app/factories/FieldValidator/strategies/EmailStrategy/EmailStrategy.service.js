'use strict';

angular.module('fakiyaMainApp')
  .factory('EmailStrategy', function (DefaultValidator) {
    let validateType = function(value){
       if(value ===''){
            return true;
        }
        let regex = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);        
        return regex.test(value);
    }
    let validateMinValue = function(min, value) {
      return value.length>=min;
    }
    let validateMaxValue = function(max, value) {
      return value.length<=max;
    }
    let getMethods = function(){
      let emailMethods = new DefaultValidator();
      emailMethods.validateType = validateType;
      emailMethods.MinValue = validateMinValue;
      emailMethods.MaxValue = validateMaxValue;
      return emailMethods;
    }
    return {
      getMethods: getMethods
    };
  });

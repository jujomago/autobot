'use strict';

angular.module('fakiyaMainApp')
  .factory('PhoneStrategy', function (DefaultValidator) {
    let validateType = function(value){
      if(value===''){
        return true;
      }
      let numberParsed = value.replace(/[- () +]+/g, '');
      let first = numberParsed.substring(0,1);
      let number;
      if(first === '1'){
        return false;
      }
      if(numberParsed.length <= 10 && numberParsed.substr(0,3)!=='011'){
        number = new RegExp(/^[2-9]{1}[0-9]{9}$/im);
      }else{
        number = new RegExp(/^(?:011)(?:[. ()-]*\d){2,17}[. ()-]*$/g);
      }
      let valid = (number.test(numberParsed)) ? true: false;
      return valid;
    };
    let getMethods = function(){
      let phoneMethods = new DefaultValidator();
      phoneMethods.validateType = validateType;
      return phoneMethods;
    };
    return {
      getMethods: getMethods
    };
  });

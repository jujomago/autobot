'use strict';

function ValidatorService() {
  let regex;

  let Validator={
      phone:function(numberPhone){         
          if(numberPhone===''){
              return true;
          }
          if (numberPhone.length <= 10) { // phone us number
              regex = new RegExp(/^[(]?[2-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);
          } else { // international numbers
              regex = new RegExp(/^(?:011)(?:[. ()-]*\d){10,17}[. ()-]*$/g);
          }
          return regex.test(numberPhone);
      },
      email:function(email){ 
          if(email===''){
              return true;
          }
          regex = new RegExp(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);        
          return regex.test(email);
      },
      balance:function(quantity){
          if(quantity===''){
              return true;
          }
          regex = new RegExp(/^[0-9]{0,3}\.[0-9]{0,2}$/g);
          return regex.test(quantity);
      }
  };

  // Public API here
  return Validator;
}


angular.module('fakiyaMainApp')
  .factory('ValidatorService', ValidatorService);

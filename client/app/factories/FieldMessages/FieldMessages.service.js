'use strict';

angular.module('fakiyaMainApp')
  .factory('FieldMessages', function ($filter) {
      function getTypeMessage(field){
      let type = 'field';
      if(field.type==='PHONE'){
        return `Contact Field "${field.name}" has an invalid value. Number must either be 10 digits for dialing within North America, or begin with "011" for international number. International number length should be no more than 20 digits. Please correct it.`;
      }
      else if(['PERCENT','NUMBER','CURRENCY'].indexOf(field.type) > -1) {
        type = 'number';
      }
      else if(field.type === 'EMAIL'){
       type = 'email'; 
      }
      else if(field.type === 'URL'){
        type = 'URL';
      }
      return `Contact Field "${field.name}" has an invalid value. Invalid ${type}. Please correct it.`;
     }
     function getMinMessage(field){
      let type = 'field';
      let chars ='';
      let prefix = 'less';
      let value = field.minValue;
      if(['STRING','EMAIL','URL'].indexOf(field.type) > -1) {
        type = 'String length';
        chars = ' characters';
      }
      else if(['PERCENT','NUMBER','CURRENCY'].indexOf(field.type) > -1) {
        type = 'Number';
      }
      else if(field.type === 'DATE'){
        type = 'Date';
        let date = new Date(field.minValue);
        value = $filter('date')((new Date(date.valueOf() + (date.getTimezoneOffset()-1440) * 60000 )), 'yyyy-MM-dd'); 
        prefix = 'earlier';
      }
      return `Contact Field "${field.name}" has an invalid value. ${type} cannot be ${prefix} than ${value}${chars}. Please correct it.`;
     }
     function getMaxMessage(field){
      let type = 'field';
      let chars ='';
      let prefix = 'more';
      let value = field.maxValue;
      if(['STRING','EMAIL','URL'].indexOf(field.type) > -1) {
        type = 'String length';
        chars = ' characters';
      }
      else if(['PERCENT','NUMBER','CURRENCY'].indexOf(field.type) > -1) {
        type = 'Number';
        prefix = 'greater';
      }
      else if(field.type === 'DATE'){
        type = 'Date';
        let date = new Date(field.maxValue);
        value = $filter('date')((new Date(date.valueOf() + (date.getTimezoneOffset()-1440) * 60000 )), 'yyyy-MM-dd');  
        prefix = 'later';
      }
      return `Contact Field "${field.name}" has an invalid value. ${type} cannot be ${prefix} than ${value}${chars}. Please correct it.`;
     }
     function getRequiredMessage(field){
      return `Contact Field "${field.name}" has an invalid value. Value cannot be empty. Please correct it.`;
     }
     function getRegexMessage(field){
      return `Contact Field "${field.name}" has an invalid value. Value does not match the pattern: ${field.regex} Please correct it.`;
     }
     function getPrecisionMessage(field){
      return `Contact Field "${field.name}" has an invalid value. Limit for digits before decimal point (${field.precision}) has been reached. Please correct it.`;
     }
     function getScaleMessage(field){
      return `Contact Field "${field.name}" has an invalid value. Limit for digits after decimal point (${field.scale}) has been reached. Please correct it.`;
     }
    return {
      getTypeMessage: getTypeMessage,
      getMinMessage: getMinMessage,
      getMaxMessage: getMaxMessage,
      getRequiredMessage: getRequiredMessage,
      getRegexMessage: getRegexMessage,
      getPrecisionMessage: getPrecisionMessage,
      getScaleMessage: getScaleMessage
    };
  });

'use strict';

angular.module('fakiyaMainApp')
  .factory('FieldFormatter', function ($filter) {
    function getFormatMultiset(field, value){
      switch(field.realType){
        case 'CURRENCY':
          if(value.length>0){
            return field.currencyType+value.map(item =>{return item.value;}).join(';'+field.currencyType);
          }
          else{
            return '';
          }
        break;
        case 'PERCENT':
          if(value.length>0){
            return value.map(item =>{return item.value;}).join('%;')+'%';
          }
          else{
            return '';
          }
        break;
      }
      return value.map(item =>{return item.value;}).join(';');
    }
    function removePhoneChars(value){
      return value.replace(/[- () +]+/g, '');
    }
    function removeExtraPoints(value){

      let result = value.split('.');
      if(result.length===1 || (result.length===2 && result[1]==='')){
        value = value.replace('.', '');
      }
      return value;
    }
    function removeExtraChars(field, value){
      if(['PERCENT','NUMBER','CURRENCY'].indexOf(field.type) > -1) {
        value = removeExtraPoints(value);
      }
      else if(field.type === 'PHONE'){
        value = removePhoneChars(value);
      }
      else if(['STRING','EMAIL','URL'].indexOf(field.type) > -1){
        value = value.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
      }
      return value;
    }
    function formatField(field, value){
    if(value){
      if(field.type ==='MULTISET'){
        return getFormatMultiset(field, value);
      }
      let type=field.type;
      if(type ==='SET'){
        type = field.realType;
        value = value.value;
      }
      value = removeExtraChars(field, value);
      switch(type){
        case 'CURRENCY':
          return field.currencyType+value;
        case 'PERCENT':
          return value+'%';
        case 'DATE':
          return $filter('date')(value, field.dateFormat);
        case 'DATE_TIME':
         return $filter('date')(value.date, field.dateFormat)+' '+value.time;
      }
    }
    return value;
    }
    return {
      formatField: formatField,
      removeExtraChars: removeExtraChars
    };
  });

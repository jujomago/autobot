'use strict';

angular.module('fakiyaMainApp')
  .factory('FieldFormatter', function ($filter) {
    function getFormatMultiset(field, value){
      switch(field.realType){
        case 'CURRENCY':
          if(value.length>0){
            return field.currencyType+value.map(function(item){return item.value;}).join(';'+field.currencyType)
          }
          else{
            return '';
          }
        break;
        case 'PERCENT':
          if(value.length>0){
            return value.map(function(item){return item.value;}).join('%;')+'%';
          }
          else{
            return '';
          }
        break;
      }
      return value.map(function(item){return item.value;}).join(';');
    }
    function removeExtraPoints(value){

      let result = value.split('.');
      if(result.length===1 || (result.length===2 && result[1]==='')){
        value = value.replace('.', '');
      }
      return value;
    }
    function formatField(field, value){
    if(value){
      if(field.type ==='MULTISET'){
        return getFormatMultiset(field, value) 
      }
      let type=field.type;
      if(type ==='SET'){
        type = field.realType;
        value = value.value;
      }
      if(field.type === 'NUMBER' || field.type === 'PERCENT' || field.type === 'CURRENCY'){
        value = removeExtraPoints(value);
      }
      switch(type){
        case 'CURRENCY':
          return field.currencyType+value;
        case 'PERCENT':
          return value+'%';
        case 'DATE':
          return $filter('date')(value, field.dateFormat)+' PDT';
        case 'DATE_TIME':
         return $filter('date')(value.date, field.dateFormat)+' '+value.time+' PDT';
      }
    }
    return value;
    }
    return {
      formatField: formatField
    };
  });

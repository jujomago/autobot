'use strict';

angular.module('fakiyaMainApp')
  .factory('FieldFormatter', function () {
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
      switch(type){
        case 'CURRENCY':
          return field.currencyType+value;
        case 'PERCENT':
          return value+'%';
        case 'DATE':
          return _$filter('date')(value, field.dateFormat)+' PST';
      }
    }
    return value;
    }
    return {
      formatField: formatField
    };
  });

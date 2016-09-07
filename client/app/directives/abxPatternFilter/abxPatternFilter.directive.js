'use strict';
/**for any Regular Expressions
 * add parameter in the tag of input abx-pattern-filter and asign the RegExp
 * Example: [a-zA-Z0-9\s] whitout modifiers 'gmi'
 * alphanumerics with whitespace: [a-zA-Z0-9á-ú\s]
 * numbers: [0-9]
 * email: ^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$
 * telephone:
 * before verify the regex in: https://regex101.com/r/zC1lU6/1 
 * *************************************************************
 * regular-expression parameter value of RegExp for match
 * */
angular.module('fakiyaMainApp')
  .directive('abxPatternFilter', function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
      	ngModel: '=',
        filter:'@abxPatternFilter'
      },
      link: function (scope) {
        console.log('RegExpresion: '+scope.filter);
        var filter;
        try{
          filter = new RegExp(scope.filter,'gmi');
        }catch(e){
          filter = new RegExp('[a-zA-Z0-9á-ú\s]','gmi');
          console.log(e);
        }

        scope.$watch('ngModel', function(newValue,oldValue) {
          var resultArray;
          let stringMatched='';
          if(newValue!==null){
            try{
              while ((resultArray = filter.exec(newValue)) !== null) {          
                stringMatched+=resultArray[0]+'';
              }
              scope.ngModel = stringMatched;
            }catch(e){
              console.log(e+oldValue);
            }
          }
        });
      }
    };
  });

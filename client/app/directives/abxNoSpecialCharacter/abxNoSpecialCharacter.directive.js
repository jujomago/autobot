'use strict';

angular.module('fakiyaMainApp')
  .directive('abxNoSpecialCharacter', function () {
    return {
      restrict: 'A',
      scope: {
      	filter:'@abxNoSpecialCharacter',
        ngModel:'='
      },      
      link: function(scope, element) {
        let filter = new RegExp(scope.filter.substr(1, scope.filter.length -2),'gi');
        element.bind('keypress', function(event) {
            let key = event.which || event.keyCode; 
            let keyCodeChar = String.fromCharCode(key);
            if (!keyCodeChar.match(filter)) {
              /** KeyCode 8 is a BackSpace Key and 46 is a Delete Key */
              if(key!==8&&key!==46){
                if (event.preventDefault) {event.preventDefault(); }
              }
            }
        });
        element.bind('paste drop', function(event) {
            if (event.preventDefault) {event.preventDefault();  }
        });
      }
    };
  });
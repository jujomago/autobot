'use strict';

angular.module('fakiyaMainApp')
  .directive('abxReadFile', function (ReadFile) {
    return {
      scope: {
      	abxReadFile: '='
      },
      restrict: 'A',
      link: function (scope, element) {
        element.bind('change', function (changeEvent) {
            var file;
            file=changeEvent.target.files[0];
            if(file){
              ReadFile.readAsText(file, scope)
              .then(function(result) {
                scope.abxReadFile = {data: result, size: file.size, type: file.type, name: file.name};
              });
            }
            else{
              scope.$apply(function () {
                scope.abxReadFile = null;
              });

            }
        });
      }
    };
  });

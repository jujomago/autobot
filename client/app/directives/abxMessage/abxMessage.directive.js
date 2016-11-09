'use strict';

angular.module('fakiyaMainApp')
  .directive('abxMessage', function ($timeout) {
    return {
      templateUrl: 'app/directives/abxMessage/abxMessage.html',
      restrict: 'E',
      scope: {
        msgInfo: '=msg',
        expires: '='
      },
      link: function (scope, element, attrs) {

        scope.$watch(function () {
          return scope.msgInfo.show;
        },
          function (newValue) { //it is possible to use oldValue too like a parameter for this function
            var val = newValue || null;
            if (val === true) {
              let timeoutTime = scope.msgInfo.expires ? scope.msgInfo.expires : attrs.expires;
              if (timeoutTime) {
                var timer = $timeout(function () {
                  scope.msgInfo.show = false;
                }, scope.msgInfo.expires);

                scope.$on('$destroy',
                  function () {
                    $timeout.cancel(timer);
                  }
                );
              }
            }
          }.bind(this));

        /*if (attrs.expires) {
          var timer = $timeout(function () {
            scope.msgInfo.show = false;
          }, attrs.expires);

          scope.$on('$destroy',
            function () {
              $timeout.cancel(timer);
            }
          );
        }*/
      },
/*      controller: function ($scope) {
      }*/
    };
  });

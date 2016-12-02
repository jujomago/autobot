'use strict';

function TooltipDirective() {
    return {
        restrict: 'E',
        scope: {
            model: '='
        },
        templateUrl:'app/directives/abxTooltip/abxTooltip.html',

        link: function () {
        }
    };
}

TooltipDirective.$inject = [];

angular
  .module('fakiyaMainApp')
  .directive('abxTooltip', TooltipDirective);

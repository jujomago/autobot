'use strict';

angular.module('fakiyaMainApp')
  .directive('abxNumberUpdown', function () {
    return {
      templateUrl: 'app/directives/abxNumberUpdown/abxNumberUpdown.html',
      restrict: 'EA',
      scope: {
      	ngModel: '=?',
        disabled:'=?ngDisabled',
        minValue: '=?',
        maxValue: '=?'
      },
      controller: function($scope){
        $scope.incrementValue=function(){
          if(!$scope.disabled){
        	 $scope.ngModel=(1*($scope.ngModel)+1);
          }
        };
        $scope.decrementValue=function(){
          if(!$scope.disabled){
          	let numToReduce=1*($scope.ngModel);
          	$scope.ngModel=(numToReduce-1);
          }
        };
      },
      link: function (scope) {
      	var numbers = new RegExp(/^[0-9]+$/);
      	
        scope.minValue=scope.minValue?scope.minValue:0;
        scope.maxValue=scope.maxValue?scope.maxValue:-1;
        scope.ngModel=scope.minValue;
        scope.ngModel=scope.ngModel?scope.ngModel*1:scope.minValue;
      	scope.$watch('ngModel', function(newValue,oldValue) {
            if(!(numbers.test(newValue) && (scope.maxValue===-1 || (newValue*1)<=scope.maxValue) && ((newValue*1)>=scope.minValue))) {
              scope.ngModel = oldValue;
            }
        });
        scope.$watch('maxValue', function(newValue) {
            if(newValue!==-1 && (newValue)<=scope.ngModel) {
              scope.ngModel = newValue;
            }
        }); 
      }
    };
  });

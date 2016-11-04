'use strict';

angular.module('fakiyaMainApp')
  .directive('abxMultiSelectInput', function () {
    return {
        restrict: 'E',
        scope: {
            ngModel: '=',
            options: '=',
            id: '@',
            value: '@'

        },
        templateUrl: 'app/directives/abxMultiSelectInput/abxMultiSelectInput.html',

        controller: function ($scope) {
        	if(!$scope.ngModel){
        		$scope.ngModel = [];
        	}
            $scope.openDropdown = function () {

                $scope.open = !$scope.open;

            };
            $scope.getItems = function(){
                return $scope.ngModel.map(function(item){return item.value;}).join(';');
            };
            $scope.selectAll = function () {

                $scope.ngModel = [];

                angular.forEach($scope.options, function (item) {

                    $scope.ngModel.push(item);

                });

            };

            $scope.deselectAll = function () {

                $scope.ngModel = [];

            };
            $scope.toggleSelectItem = function (option) {

                var intIndex = -1;
                angular.forEach($scope.ngModel, function (item, index) {

                    if (item[$scope.id] === option[$scope.id]) {

                        intIndex = index;

                    }

                });
                if (intIndex >= 0) {

                    $scope.ngModel.splice(intIndex, 1);

                } else {
                    
                    $scope.ngModel.push(option);
                    
                }

            };

            $scope.getClassName = function (option) {

                var varClassName = 'glyphicon glyphicon-remove-circle';

                angular.forEach($scope.ngModel, function (item) {

                    if (item[$scope.id] === option[$scope.id]) {

                        varClassName = 'glyphicon glyphicon-ok-circle';

                    }

                });

                return (varClassName);

            };

        }
    };
  });

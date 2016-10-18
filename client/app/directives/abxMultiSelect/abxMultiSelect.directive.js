'use strict';

angular.module('fakiyaMainApp')
  .directive('abxMultiSelect', function () {
    return {
        restrict: 'E',
        scope: {
            model: '=',
            options: '=',
            id: '@',
            value: '@'

        },
        templateUrl: 'app/directives/abxMultiSelect/abxMultiSelect.html',

        controller: function ($scope) {
        	if(!$scope.model){
        		$scope.model = [];
        	}
            $scope.openDropdown = function () {

                $scope.open = !$scope.open;

            };

            $scope.selectAll = function () {

                $scope.model = [];

                angular.forEach($scope.options, function (item, index) {

                    $scope.model.push(item);

                });

            };

            $scope.deselectAll = function () {

                $scope.model = [];

            };

            $scope.toggleSelectItem = function (option) {

                var intIndex = -1;

                angular.forEach($scope.model, function (item, index) {

                    if (item[$scope.id] == option[$scope.id]) {

                        intIndex = index;

                    }

                });

                if (intIndex >= 0) {

                    $scope.model.splice(intIndex, 1);

                } else {

                    $scope.model.push(option);

                }

            };

            $scope.getClassName = function (option) {

                var varClassName = 'glyphicon glyphicon-remove-circle';

                angular.forEach($scope.model, function (item, index) {

                    if (item[$scope.id] == option[$scope.id]) {

                        varClassName = 'glyphicon glyphicon-ok-circle';

                    }

                });

                return (varClassName);

            };

        }
    };
  });

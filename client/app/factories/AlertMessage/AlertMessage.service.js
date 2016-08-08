'use strict';

angular.module('fakiyaMainApp')
  .factory('AlertMessage', function ($uibModal) {
    function openAlert(content){
      $uibModal.open({
        animation: false,
        templateUrl: 'app/factories/AlertMessage/AlertMessage.html',
        size: 'hs',
        controller: function ($scope, $uibModalInstance, content) {
          $scope.content = content;
          $scope.close = function(){
            $uibModalInstance.dismiss('cancel');
          };
        },
        resolve: {
          content: function () {
            return content;
          }
        },
        windowTopClass: 'modal-summary'
      });
  }
  return openAlert;
  });

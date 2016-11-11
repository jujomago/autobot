'use strict';

angular.module('fakiyaMainApp')
  .factory('ConfirmMessage', function (ModalManager) {
   function getOptions(content){
      return {
        animation: false,
        templateUrl: 'app/factories/ConfirmMessage/ConfirmMessage.html',
        size: 'hs',
        controller: ['$scope', '$uibModalInstance', 'content', function ($scope, $uibModalInstance, content) {
          $scope.content = content;
          $scope.close = function(){
            $uibModalInstance.close(true);   
          };
          $scope.dismiss = function(){
            $uibModalInstance.dismiss('cancel');  
          };
        }],
        resolve: {
          content: function () {
            return content;
          }
        },
        windowTopClass: 'modal-summary'
      };
    }
    function openConfirm(content){
      let container = document.querySelector('#alert-container');
      let options = getOptions(content);
      if(container){
        options.appendTo = angular.element(container);
      }
      return ModalManager.open(options).result;
    }
   return {open: openConfirm};
  });

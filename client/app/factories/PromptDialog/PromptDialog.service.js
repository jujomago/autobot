'use strict';

angular.module('fakiyaMainApp')
  .factory('PromptDialog', function (ModalManager) {
   function getOptions(content, config = {}){
      return {
        animation: false,
        templateUrl: 'app/factories/PromptDialog/PromptDialog.html',
        size: 'hs',
        controller: ['$scope', '$uibModalInstance', 'content', 'config', function ($scope, $uibModalInstance, content, config) {
          $scope.content = content;
          $scope.config = config;
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
          },
          config: function () {
            return config;
          }
        },
        windowTopClass: 'modal-summary'
      };
    }
    function openConfirm(content, config){
      let container = document.querySelector('#alert-container');
      let options = getOptions(content, config);
      if(container){
        options.appendTo = angular.element(container);
      }
      return ModalManager.open(options).result;
    }
   return {open: openConfirm};
  });

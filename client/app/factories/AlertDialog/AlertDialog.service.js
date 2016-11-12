'use strict';

angular.module('fakiyaMainApp')
  .factory('AlertDialog', function (ModalManager) {
    function getOptions(content, config = {}){
      return {
        animation: false,
        templateUrl: 'app/factories/AlertDialog/AlertDialog.html',
        size: 'abx-sm',
        controller: ['$scope', '$uibModalInstance', 'content', 'config', function ($scope, $uibModalInstance, content, config) {
          $scope.content = content;
          $scope.config = config;

          $scope.close = function(){
           if(content.customFunction)
            {               
              $uibModalInstance.dismiss('cancel');
              content.customFunction();
            }  
            else
            {$uibModalInstance.dismiss('cancel');}       
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
    function openAlert(content,config){
      let container = document.querySelector('#alert-container');
      let options = getOptions(content, config);
      if(container){
        options.appendTo = angular.element(container);
      }
      ModalManager.open(options, false);
    }
   return openAlert;
  });

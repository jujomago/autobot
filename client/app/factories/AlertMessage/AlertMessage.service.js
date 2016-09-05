'use strict';

angular.module('fakiyaMainApp')
  .factory('AlertMessage', function (ModalManager) {   
    function getOptions(content){
      return {        
        path:'fd',
        animation: false,
        templateUrl: 'app/factories/AlertMessage/AlertMessage.html',
        size: 'hs',
        controller: ['$scope', '$uibModalInstance', 'content', function ($scope, $uibModalInstance, content) {
          $scope.content = content;
          $scope.close = function()
          {     
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
          }
        },
        windowTopClass: 'modal-summary'
      };
    }
    function openAlert(content){
      let container = document.querySelector('#alert-container');
      let options = getOptions(content);
      if(container){
        options.appendTo = angular.element(container);
      }
      ModalManager.open(options, false);
    }
   return openAlert;
  });

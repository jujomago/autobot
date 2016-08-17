'use strict';

angular.module('fakiyaMainApp')
  .factory('ModalManager', function ($uibModal,$uibModalStack) {

    function openModal(options, closeAll = true){
      if(closeAll){
        $uibModalStack.dismissAll();
      }
      return $uibModal.open(options);
    }
    return {
      open: openModal
    };
  });

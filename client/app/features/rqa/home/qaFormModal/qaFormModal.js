'use strict';

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('qaFormModal', {
        url: '/qaFormModal',
        template: '<qa-form-modal></qa-form-modal>'
      });
  });

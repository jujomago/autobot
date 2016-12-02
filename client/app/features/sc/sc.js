(function () {
  'use strict';

  function State($stateProvider) {
    $stateProvider
      .state('ap.sc', {
        url: '/sc',
        template: '<supervisor.console.lists></supervisor.console.lists>'
      });
  }
  State.$inject = ['$stateProvider'];
  angular
    .module('fakiyaMainApp')
    .config(State);


})();

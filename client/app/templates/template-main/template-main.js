'use strict';
(function () {
  let _$location; 
  class MainPageController {
  
    constructor($location) {
      _$location = $location;
    }
    checkUrl(){
      return (_$location.path().indexOf('/rqa') > -1);
    }
  }
  MainPageController.$inject=['$location'];

angular.module('fakiyaMainApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ap', {
         url:'/ap',
         templateUrl: 'app/templates/template-main/template-main.html',
         controller: MainPageController,
         controllerAs: 'main'
      });
  });
})();

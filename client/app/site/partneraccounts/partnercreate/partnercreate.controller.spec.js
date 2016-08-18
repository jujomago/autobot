'use strict';

describe('Controller: PartnercreateCtrl', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var PartnercreateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PartnercreateCtrl = $controller('PartnercreateCtrl', {
      $scope: scope
    });
  }));
});

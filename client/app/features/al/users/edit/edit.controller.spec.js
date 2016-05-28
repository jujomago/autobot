'use strict';

describe('Component: al.users.edit', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var EditComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    EditComponent = $componentController('al.users.edit', {
      $scope: scope
    });
  }));
});

'use strict';

describe('Component: AuthComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var AuthComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    AuthComponent = $componentController('ap.al.auth', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});

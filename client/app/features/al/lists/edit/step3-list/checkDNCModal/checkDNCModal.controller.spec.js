'use strict';

describe('Component: CheckDNCModalComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var CheckDNCModalComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    CheckDNCModalComponent = $componentController('checkDncModal', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});

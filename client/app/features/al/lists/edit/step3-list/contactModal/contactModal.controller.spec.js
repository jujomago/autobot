'use strict';

describe('Controller: ContactModalCtrl', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var ContactModalCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ContactModalCtrl = $controller('ContactModalCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});

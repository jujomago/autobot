'use strict';

describe('Component: QaFormModalComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var QaFormModalComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    QaFormModalComponent = $componentController('QaFormModalComponent', {
      $scope: scope
    });
  }));
});

'use strict';

describe('Component: PartnerAcoountsListComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var LoginComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    LoginComponent = $componentController('accounts.partneraccounts', {
      $scope: scope
    });

  }));
});

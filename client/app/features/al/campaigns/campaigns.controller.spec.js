'use strict';

describe('Component: CampaignsComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var CampaignsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    CampaignsComponent = $componentController('al.campaigns', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});

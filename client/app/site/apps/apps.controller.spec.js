'use strict';

describe('Component: AppsComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var AppsComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    AppsComponent = $componentController('AppsComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});

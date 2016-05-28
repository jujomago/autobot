'use strict';

describe('Controller: al.skills.create', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('stateMock'));

  var CreateController, scope, state;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope, $state) {
    scope = $rootScope.$new();
    state = $state;
    CreateController = $componentController('al.skills.create', {
      $scope: scope,
      $state: state,
      SkillsService:null
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});

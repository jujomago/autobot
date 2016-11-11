'use strict';

describe('Component: ContactusComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var ContactusComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    ContactusComponent = $componentController('contactus', {});
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});

'use strict';

describe('Service: EmailStrategy', function () {

  // load the service's module
  beforeEach(module('fakiyaMAinApp'));

  // instantiate service
  var EmailStrategy;
  beforeEach(inject(function (_EmailStrategy_) {
    EmailStrategy = _EmailStrategy_;
  }));

  it('should do something', function () {
    expect(!!EmailStrategy).to.be.true;
  });

});

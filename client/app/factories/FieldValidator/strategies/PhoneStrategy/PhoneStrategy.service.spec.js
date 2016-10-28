'use strict';

describe('Service: PhoneStrategy', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var PhoneStrategy;
  beforeEach(inject(function (_PhoneStrategy_) {
    PhoneStrategy = _PhoneStrategy_;
  }));

  it('should do something', function () {
    expect(!!PhoneStrategy).to.be.true;
  });

});

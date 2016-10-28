'use strict';

describe('Service: DefaultValidator', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var DefaultValidator;
  beforeEach(inject(function (_DefaultValidator_) {
    DefaultValidator = _DefaultValidator_;
  }));

  it('should do something', function () {
    expect(!!DefaultValidator).to.be.true;
  });

});

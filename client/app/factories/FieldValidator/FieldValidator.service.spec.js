'use strict';

describe('Service: FieldValidator', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var FieldValidator;
  beforeEach(inject(function (_FieldValidator_) {
    FieldValidator = _FieldValidator_;
  }));

  it('should do something', function () {
    expect(!!FieldValidator).to.be.true;
  });

});

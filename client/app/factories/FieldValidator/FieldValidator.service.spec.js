'use strict';

describe('Service:FieldValidator', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var FieldValidator;
  beforeEach(inject(function (_FieldValidator_) {
    FieldValidator = _FieldValidator_;
  }));

  it('should have methods', function () {
    FieldValidator.setStrategy('String')
    expect(FieldValidator.getMethods()).to.be.an('Object');
  });
  it('should unexisting startegy dont have any methods', function () {
    expect(FieldValidator.getMethods()).to.be.equal(null);
  });

});

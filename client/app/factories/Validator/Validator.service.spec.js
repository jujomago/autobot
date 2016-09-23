'use strict';

describe('Service: Validator', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var Validator;
  beforeEach(inject(function (_ValidatorService_) {
    Validator = _ValidatorService_;
  }));

  it('should validate phones of contact fields', function () { 
    expect(Validator.phone('4556256545')).to.equal(true);
    expect(Validator.phone('265456548')).to.equal(false);
    expect(Validator.phone('1565456545')).to.equal(false);
    expect(Validator.phone('0116')).to.equal(false);
    expect(Validator.phone('01156')).to.equal(true);
    expect(Validator.phone('115644234548')).to.equal(false);
    expect(Validator.phone('22222222')).to.equal(false);
    expect(Validator.phone('ze23sadf')).to.equal(false);
    expect(Validator.phone('')).to.equal(true);
  });
  it('should validate emails', function () { 
    expect(Validator.email('some@body.com')).to.equal(true);
    expect(Validator.email('ad.com')).to.equal(false);
    expect(Validator.email('gsfdgsd')).to.equal(false);
    expect(Validator.email('asdfa@gggg.com')).to.equal(true);     
  });
  it('should validate balance quantities', function () { 
    expect(Validator.balance('44')).to.equal(true);
    expect(Validator.balance('556256545')).to.equal(false);
    expect(Validator.balance('565')).to.equal(true);
    expect(Validator.balance('566.65')).to.equal(true);
    expect(Validator.balance('8899.35')).to.equal(false);
    expect(Validator.balance('15.59')).to.equal(true);
    expect(Validator.balance('38.668')).to.equal(false);
    expect(Validator.balance('.668')).to.equal(false);   
    expect(Validator.balance('.1')).to.equal(true);
    expect(Validator.balance('32.1555')).to.equal(false);
  });
});

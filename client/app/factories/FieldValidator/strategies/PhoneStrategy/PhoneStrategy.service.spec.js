'use strict';

describe('Service:PhoneStrategy', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var PhoneStrategy;
  beforeEach(inject(function (_PhoneStrategy_) {
    PhoneStrategy = _PhoneStrategy_.getMethods();
  }));

  describe('#validateType', function () {
    it('should return false with a wrong phone', function () {
      expect(PhoneStrategy.validateType('987-6-543(2111)')).to.be.equal(false);
    });
    it('should return true with valid phone', function () {
      expect(PhoneStrategy.validateType('987-6-543-(211)')).to.be.equal(true);
    });
  });

});

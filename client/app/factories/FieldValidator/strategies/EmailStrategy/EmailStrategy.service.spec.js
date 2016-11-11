'use strict';

describe('Service:EmailStrategy', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var EmailStrategy;
  beforeEach(inject(function (_EmailStrategy_) {
    EmailStrategy = _EmailStrategy_.getMethods();
  }));

  describe('#validateType', function () {
    it('should return false with wrong url', function () {
      expect(EmailStrategy.validateType('admin@autobox@corp.com')).to.be.equal(false);
    });
    it('should return true with valid url', function () {
      expect(EmailStrategy.validateType('admin@autoboxcorp.com')).to.be.equal(true);
    });
  });

  describe('#validateMinValue', function () {
    it('should return true if string length is greather than min', function () {
      expect(EmailStrategy.MinValue(5,'abcdef')).to.be.equal(true);
    });
    it('should return false if string length is less than min', function () {
      expect(EmailStrategy.MinValue(5,'abcd')).to.be.equal(false);
    });
  });

  describe('#validateMaxValue', function () {
    it('should return false if string length is greather than min', function () {
      expect(EmailStrategy.MaxValue(5,'abcdef')).to.be.equal(false);
    });
    it('should return true if string length is less than min', function () {
      expect(EmailStrategy.MaxValue(5,'abcd')).to.be.equal(true);
    });
  });

});

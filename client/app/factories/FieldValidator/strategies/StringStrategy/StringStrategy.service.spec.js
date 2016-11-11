'use strict';

describe('Service:StringStrategy', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var StringStrategy;
  beforeEach(inject(function (_StringStrategy_) {
    StringStrategy = _StringStrategy_.getMethods();
  }));

  describe('#validateType', function () {
    it('should return false with a number', function () {
      expect(StringStrategy.validateType(26)).to.be.equal(false);
    });
    it('should return true with valid string', function () {
      expect(StringStrategy.validateType('valid string')).to.be.equal(true);
    });
  });

  describe('#validateMinValue', function () {
    it('should return true if string length is greather than min', function () {
      expect(StringStrategy.MinValue(5,'abcdef')).to.be.equal(true);
    });
    it('should return false if string length is less than min', function () {
      expect(StringStrategy.MinValue(5,'abcd')).to.be.equal(false);
    });
  });

  describe('#validateMaxValue', function () {
    it('should return false if string length is greather than min', function () {
      expect(StringStrategy.MaxValue(5,'abcdef')).to.be.equal(false);
    });
    it('should return true if string length is less than min', function () {
      expect(StringStrategy.MaxValue(5,'abcd')).to.be.equal(true);
    });
  });
});

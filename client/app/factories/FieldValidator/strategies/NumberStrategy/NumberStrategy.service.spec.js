'use strict';

describe('Service:NumberStrategy', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var NumberStrategy;
  beforeEach(inject(function (_NumberStrategy_) {
    NumberStrategy = _NumberStrategy_.getMethods();
  }));

  describe('#validateType', function () {
    it('should return true with decimals', function () {
      expect(NumberStrategy.validateType('2.5')).to.be.equal(true);
    });
    it('should return true with single point', function () {
      expect(NumberStrategy.validateType('2.')).to.be.equal(true);
    });
    it('should return true without decimals', function () {
      expect(NumberStrategy.validateType('2')).to.be.equal(true);
    });
    it('should return true with non numbers', function () {
      expect(NumberStrategy.validateType('string')).to.be.equal(false);
    });
  });
  describe('#validateMinValue', function () {
    it('should return true if value is greather than min', function () {
      expect(NumberStrategy.MinValue(5,6)).to.be.equal(true);
    });
    it('should return false if value is less than min', function () {
      expect(NumberStrategy.MinValue(5,4)).to.be.equal(false);
    });
  });
  describe('#validateMaxValue', function () {
    it('should return false if value is greather than min', function () {
      expect(NumberStrategy.MaxValue(5,6)).to.be.equal(false);
    });
    it('should return true if value is less than min', function () {
      expect(NumberStrategy.MaxValue(5,4)).to.be.equal(true);
    });
  });

});

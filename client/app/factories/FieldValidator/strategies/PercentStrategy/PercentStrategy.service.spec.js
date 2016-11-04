'use strict';

describe('Service:PercentStrategy', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var PercentStrategy;
  beforeEach(inject(function (_PercentStrategy_) {
    PercentStrategy = _PercentStrategy_.getMethods();
  }));

  describe('#validateType', function () {
    it('should return true with decimals', function () {
      expect(PercentStrategy.validateType('2.5')).to.be.equal(true);
    });
    it('should return true with single point', function () {
      expect(PercentStrategy.validateType('2.')).to.be.equal(true);
    });
    it('should return true without decimals', function () {
      expect(PercentStrategy.validateType('2')).to.be.equal(true);
    });
    it('should return false with non numbers', function () {
      expect(PercentStrategy.validateType('string')).to.be.equal(false);
    });
  });
  describe('#validateMinValue', function () {
    it('should return true if value is greather than min', function () {
      expect(PercentStrategy.MinValue(5,6)).to.be.equal(true);
    });
    it('should return false if value is less than min', function () {
      expect(PercentStrategy.MinValue(5,4)).to.be.equal(false);
    });
  });
  describe('#validateMaxValue', function () {
    it('should return false if value is greather than min', function () {
      expect(PercentStrategy.MaxValue(5,6)).to.be.equal(false);
    });
    it('should return true if value is less than min', function () {
      expect(PercentStrategy.MaxValue(5,4)).to.be.equal(true);
    });
  });

});

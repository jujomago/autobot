'use strict';

describe('Service:CurrencyStrategy', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var CurrencyStrategy;
  beforeEach(inject(function (_CurrencyStrategy_) {
    CurrencyStrategy = _CurrencyStrategy_.getMethods();
  }));

  describe('#validateType', function () {
    it('should return true with decimals', function () {
      expect(CurrencyStrategy.validateType('2.5')).to.be.equal(true);
    });
    it('should return true with single point', function () {
      expect(CurrencyStrategy.validateType('2.')).to.be.equal(true);
    });
    it('should return true without decimals', function () {
      expect(CurrencyStrategy.validateType('2')).to.be.equal(true);
    });
    it('should return true with non numbers', function () {
      expect(CurrencyStrategy.validateType('string')).to.be.equal(false);
    });
  });
  describe('#validateMinValue', function () {
    it('should return true if value is greather than min', function () {
      expect(CurrencyStrategy.MinValue(5,6)).to.be.equal(true);
    });
    it('should return false if value is less than min', function () {
      expect(CurrencyStrategy.MinValue(5,4)).to.be.equal(false);
    });
  });
  describe('#validateMaxValue', function () {
    it('should return false if value is greather than min', function () {
      expect(CurrencyStrategy.MaxValue(5,6)).to.be.equal(false);
    });
    it('should return true if value is less than min', function () {
      expect(CurrencyStrategy.MaxValue(5,4)).to.be.equal(true);
    });
  });

});

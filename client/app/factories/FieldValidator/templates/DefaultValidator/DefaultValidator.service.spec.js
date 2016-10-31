'use strict';

describe('Service:DefaultValidator', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var DefaultValidator;
  beforeEach(inject(function (_DefaultValidator_) {
    DefaultValidator = new _DefaultValidator_();
  }));
  describe('#validateType', function () {
    it('should return false in validate by default', function () {
      expect(DefaultValidator.validateType()).to.be.equal(false);
    });
  });
  describe('#validateMinValue', function () {
    it('should return true if value is greather than min', function () {
      expect(DefaultValidator.MinValue(5,6)).to.be.equal(true);
    });
    it('should return false if value is less than min', function () {
      expect(DefaultValidator.MinValue(5,4)).to.be.equal(false);
    });
  });
  describe('#validateMaxValue', function () {
    it('should return false if value is greather than min', function () {
      expect(DefaultValidator.MaxValue(5,6)).to.be.equal(false);
    });
    it('should return true if value is less than min', function () {
      expect(DefaultValidator.MaxValue(5,4)).to.be.equal(true);
    });
  });
  describe('#validateRegexp', function () {
    it('should return true with a valid word', function () {
      expect(DefaultValidator.Regexp('a*b','aaaab')).to.be.equal(true);
    });
    it('should return false with a invalid word', function () {
      expect(DefaultValidator.Regexp('a*b','aaaaba')).to.be.equal(false);
    });
  });
  describe('#validateRequired', function () {
    it('should return true if value exists', function () {
      expect(DefaultValidator.Required(true,{someValue: 'abc'})).to.be.equal(true);
    });
    it('should return false if value not exists', function () {
      expect(DefaultValidator.Required(true,'')).to.be.equal(false);
    });
  });
  describe('#validateScale', function () {
    it('should return true if value scale is less than min scale', function () {
      expect(DefaultValidator.Scale(4,'2.567')).to.be.equal(true);
    });
    it('hould return false if value scale is greather than min scale', function () {
      expect(DefaultValidator.Scale(4,'2.56789')).to.be.equal(false);
    });
  });
  describe('#validatePrecision', function () {
    it('should return true if value precision is less than min precision', function () {
      expect(DefaultValidator.Precision(4,'256')).to.be.equal(true);
    });
    it('hould return false if value precision is greather than min precision', function () {
      expect(DefaultValidator.Precision(4,'25678')).to.be.equal(false);
    });
  });

});

'use strict';

describe('Service:UrlStrategy', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var UrlStrategy;
  beforeEach(inject(function (_UrlStrategy_) {
    UrlStrategy = _UrlStrategy_.getMethods();
  }));

  describe('#validateType', function () {
    it('should return false with wrong url', function () {
      expect(UrlStrategy.validateType('ftp: #')).to.be.equal(false);
    });
    it('should return true with valid url', function () {
      expect(UrlStrategy.validateType('http://www.autoboxcorp.com')).to.be.equal(true);
    });
  });

  describe('#validateMinValue', function () {
    it('should return true if string length is greather than min', function () {
      expect(UrlStrategy.MinValue(5,'abcdef')).to.be.equal(true);
    });
    it('should return false if string length is less than min', function () {
      expect(UrlStrategy.MinValue(5,'abcd')).to.be.equal(false);
    });
  });

  describe('#validateMaxValue', function () {
    it('should return false if string length is greather than min', function () {
      expect(UrlStrategy.MaxValue(5,'abcdef')).to.be.equal(false);
    });
    it('should return true if string length is less than min', function () {
      expect(UrlStrategy.MaxValue(5,'abcd')).to.be.equal(true);
    });
  });

});

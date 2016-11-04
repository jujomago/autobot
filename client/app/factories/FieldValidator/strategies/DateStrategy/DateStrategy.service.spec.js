'use strict';

describe('Service:DateStrategy', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var DateStrategy;
  beforeEach(inject(function (_DateStrategy_) {
    DateStrategy = _DateStrategy_.getMethods();
  }));

  describe('#validateType', function () {
    it('should return true always', function () {
      expect(DateStrategy.validateType()).to.be.equal(true);
    });
  });

  describe('#validateMinValue', function () {
    it('should return true if string length is greather than min', function () {
      expect(DateStrategy.MinValue('October 30, 2016 11:20:00',new Date('October 31, 2016 11:20:00'))).to.be.equal(true);
    });
    it('should return false if string length is less than min', function () {
      expect(DateStrategy.MinValue('October 30, 2016 11:20:00',new Date('October 29, 2016 11:20:00'))).to.be.equal(false);
    });
  });

  describe('#validateMaxValue', function () {
    it('should return false if string length is greather than min', function () {
      expect(DateStrategy.MaxValue('October 30, 2016 11:20:00',new Date('October 31, 2016 11:20:00'))).to.be.equal(false);
    });
    it('should return true if string length is less than min', function () {
      expect(DateStrategy.MaxValue('October 30, 2016 11:20:00',new Date('October 29, 2016 11:20:00'))).to.be.equal(true);
    });
  });

});

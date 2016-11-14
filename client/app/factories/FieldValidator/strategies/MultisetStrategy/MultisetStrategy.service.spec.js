'use strict';

describe('Service:MultisetStrategy', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var MultisetStrategy;
  beforeEach(inject(function (_MultisetStrategy_) {
    MultisetStrategy = _MultisetStrategy_.getMethods();
  }));

  describe('#validateType', function () {
    it('should return true always', function () {
      expect(MultisetStrategy.validateType()).to.be.equal(true);
    });
  });

  describe('#validateRequired', function () {
    it('should return true if array have at least one item', function () {
      expect(MultisetStrategy.Required(true,[{id: 1, value: 'some value'}])).to.be.equal(true);
    });
    it('should return false with empty array', function () {
      expect(MultisetStrategy.Required(true,[])).to.be.equal(false);
    });
  });

});

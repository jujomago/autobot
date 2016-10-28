'use strict';

describe('Service: MultisetStrategy', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var MultisetStrategy;
  beforeEach(inject(function (_MultisetStrategy_) {
    MultisetStrategy = _MultisetStrategy_;
  }));

  it('should do something', function () {
    expect(!!MultisetStrategy).to.be.true;
  });

});

'use strict';

describe('Service: NumberStrategy', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var NumberStrategy;
  beforeEach(inject(function (_NumberStrategy_) {
    NumberStrategy = _NumberStrategy_;
  }));

  it('should do something', function () {
    expect(!!NumberStrategy).to.be.true;
  });

});

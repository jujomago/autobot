'use strict';

describe('Service: PercentStrategy', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var PercentStrategy;
  beforeEach(inject(function (_PercentStrategy_) {
    PercentStrategy = _PercentStrategy_;
  }));

  it('should do something', function () {
    expect(!!PercentStrategy).to.be.true;
  });

});

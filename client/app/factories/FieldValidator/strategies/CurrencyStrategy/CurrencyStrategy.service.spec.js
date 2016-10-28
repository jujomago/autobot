'use strict';

describe('Service: CurrencyStrategy', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var CurrencyStrategy;
  beforeEach(inject(function (_CurrencyStrategy_) {
    CurrencyStrategy = _CurrencyStrategy_;
  }));

  it('should do something', function () {
    expect(!!CurrencyStrategy).to.be.true;
  });

});

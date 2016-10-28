'use strict';

describe('Service: DateStrategy', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var DateStrategy;
  beforeEach(inject(function (_DateStrategy_) {
    DateStrategy = _DateStrategy_;
  }));

  it('should do something', function () {
    expect(!!DateStrategy).to.be.true;
  });

});

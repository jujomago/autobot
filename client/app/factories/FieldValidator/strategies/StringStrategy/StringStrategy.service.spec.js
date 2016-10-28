'use strict';

describe('Service: StringStrategy', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var StringStrategy;
  beforeEach(inject(function (_StringStrategy_) {
    StringStrategy = _StringStrategy_;
  }));

  it('should do something', function () {
    expect(!!StringStrategy).to.be.true;
  });

});

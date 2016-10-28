'use strict';

describe('Service: TimeStrategy', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var TimeStrategy;
  beforeEach(inject(function (_TimeStrategy_) {
    TimeStrategy = _TimeStrategy_;
  }));

  it('should do something', function () {
    expect(!!TimeStrategy).to.be.true;
  });

});

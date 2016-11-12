'use strict';

describe('Service: DncService', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var DncService;
  beforeEach(inject(function (_DncService_) {
    DncService = _DncService_;
  }));

  it('should return phones with status', function () {
    expect(!!DncService).to.be.equal(true);
  });

});

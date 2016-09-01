'use strict';

describe('Service: PartnersService', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var PartnersService;
  beforeEach(inject(function (_PartnersService_) {
    PartnersService = _PartnersService_;
  }));

  it('should do something', function () {
    expect(!!PartnersService).to.be.true;
  });

});

'use strict';

describe('Service: ReportsService', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var ReportsService;
  beforeEach(inject(function (_ReportsService_) {
    ReportsService = _ReportsService_;
  }));

  it('should do something', function () {
    expect(!!ReportsService).to.be.true;
  });

});

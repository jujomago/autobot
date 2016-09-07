'use strict';

describe('Service: GetHomePage', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var GetHomePage;
  beforeEach(inject(function (_GetHomePage_) {
    GetHomePage = _GetHomePage_;
  }));

  it('should do something', function () {
    expect(!!GetHomePage).to.be.true;
  });

});

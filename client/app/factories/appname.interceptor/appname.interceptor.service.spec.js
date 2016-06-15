'use strict';

describe('Service: appname.interceptor', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var appname.interceptor;
  beforeEach(inject(function (_appname.interceptor_) {
    appname.interceptor = _appname.interceptor_;
  }));

  it('should do something', function () {
    expect(!!appname.interceptor).to.be.true;
  });

});

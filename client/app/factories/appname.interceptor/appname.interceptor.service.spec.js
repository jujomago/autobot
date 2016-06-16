'use strict';

describe('Service: appname.interceptor', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var appnameInterceptor;
  beforeEach
  (inject(function (_appnameInterceptor_) {
    appnameInterceptor = _appnameInterceptor_;
  }));

  it('should do something', function () {
    expect(!!appnameInterceptor).to.be.equal(true);
  });

});

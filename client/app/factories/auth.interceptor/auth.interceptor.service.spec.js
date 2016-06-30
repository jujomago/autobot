'use strict';

describe('Service: authInterceptor', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var authinterceptor;

  beforeEach
  (inject(function (_authInterceptor_) {
    authinterceptor = _authInterceptor_;
  }));

  it('should do something', function () {
  //  expect(!!authinterceptor).to.equal(true);
  });

});

'use strict';

describe('Service: RefreshToken', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var RefreshToken;
  beforeEach(inject(function (_RefreshToken_) {
    RefreshToken = _RefreshToken_;
  }));

  it('should do something', function () {
    expect(!!RefreshToken).to.be.true;
  });

});

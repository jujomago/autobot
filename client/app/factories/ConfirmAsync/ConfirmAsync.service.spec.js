'use strict';

describe('Service: ComfirmAsync', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var ConfirmAsync;
  beforeEach(inject(function (_ConfirmAsync_) {
    ConfirmAsync = _ConfirmAsync_;
  }));

  it('should do something', function () {
    expect(!!ConfirmAsync).to.equal(true);
  });

});

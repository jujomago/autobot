'use strict';

describe('Service: ConfirmMessage', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var ConfirmMessage;
  beforeEach(inject(function (_ConfirmMessage_) {
    ConfirmMessage = _ConfirmMessage_;
  }));

  it('should do something', function () {
    expect(!!ConfirmMessage).to.be.true;
  });

});

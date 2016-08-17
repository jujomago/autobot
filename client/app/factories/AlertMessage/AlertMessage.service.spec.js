'use strict';

describe('Service: AlertMessage', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var AlertMessage;
  beforeEach(inject(function (_AlertMessage_) {
    AlertMessage = _AlertMessage_;
  }));

  it('should display Alert Message', function () {
    expect(!!AlertMessage).to.be.equal(true);

  });

});

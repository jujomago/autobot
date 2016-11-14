'use strict';

describe('Service: AlertDialog', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var AlertDialog;
  beforeEach(inject(function (_AlertDialog_) {
    AlertDialog = _AlertDialog_;
  }));

  it('should display Alert Message', function () {
    expect(!!AlertDialog).to.be.equal(true);

  });

});

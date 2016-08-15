'use strict';

describe('Service: ModalManager', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var ModalManager;
  beforeEach(inject(function (_ModalManager_) {
    ModalManager = _ModalManager_;
  }));

  it('should display modal manager', function () {
    expect(!!ModalManager).to.be.equal(true);
  });

});

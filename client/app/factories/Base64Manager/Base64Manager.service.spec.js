'use strict';

describe('Service:Base64Manager', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var Base64Manager;
  beforeEach(inject(function (_Base64Manager_) {
    Base64Manager = _Base64Manager_;
  }));

  it('should encode a simple string', function () {
    expect(Base64Manager.encode('/ap/al/lists')).to.be.equal('L2FwL2FsL2xpc3Rz');
  });

  it('should decode a simple string', function () {
    expect(Base64Manager.decode('L2FwL2FsL2xpc3Rz')).to.be.equal('/ap/al/lists');
  });

});

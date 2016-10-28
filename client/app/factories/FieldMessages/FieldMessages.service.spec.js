'use strict';

describe('Service: FieldMessages', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var FieldMessages;
  beforeEach(inject(function (_FieldMessages_) {
    FieldMessages = _FieldMessages_;
  }));

  it('should do something', function () {
    expect(!!FieldMessages).to.be.true;
  });

});

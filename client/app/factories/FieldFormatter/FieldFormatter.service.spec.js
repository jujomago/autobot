'use strict';

describe('Service: FieldFormatter', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var FieldFormatter;
  beforeEach(inject(function (_FieldFormatter_) {
    FieldFormatter = _FieldFormatter_;
  }));

  it('should do something', function () {
    expect(!!FieldFormatter).to.be.true;
  });

});

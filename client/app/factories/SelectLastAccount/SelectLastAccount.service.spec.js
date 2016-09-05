'use strict';

describe('Service: SelectLastAccount', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var SelectLastAccount;
  beforeEach(inject(function (_SelectLastAccount_) {
    SelectLastAccount = _SelectLastAccount_;
  }));

  it('should do something', function () {
    expect(!!SelectLastAccount).to.be.true;
  });

});

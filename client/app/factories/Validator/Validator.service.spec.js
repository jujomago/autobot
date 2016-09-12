'use strict';

describe('Service: Validator', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var Validator;
  beforeEach(inject(function (_ValidatorService_) {
    Validator = _ValidatorService_;
  }));

  it('should do something', function () {
   // expect(!!Validator).to.be.true;
  });

});

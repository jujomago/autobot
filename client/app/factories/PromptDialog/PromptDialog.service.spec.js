'use strict';

describe('Service: PromptDialog', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var PromptDialog;
  beforeEach(inject(function (_PromptDialog_) {
    PromptDialog = _PromptDialog_;
  }));

  it('should do something', function () {
    expect(!!PromptDialog).to.be.equal(true);
  });

});

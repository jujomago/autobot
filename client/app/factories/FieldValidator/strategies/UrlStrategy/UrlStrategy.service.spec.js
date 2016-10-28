'use strict';

describe('Service: UrlStrategy', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var UrlStrategy;
  beforeEach(inject(function (_UrlStrategy_) {
    UrlStrategy = _UrlStrategy_;
  }));

  it('should do something', function () {
    expect(!!UrlStrategy).to.be.true;
  });

});

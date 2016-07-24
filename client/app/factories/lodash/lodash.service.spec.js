'use strict';

describe('Service: lodash', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var lodash;
  var _window;
  beforeEach(inject(function (_lodash_, $window) {
    lodash = _lodash_;
    _window = $window
  }));

  it('should do undefined lodash at window level', function () {
    expect(!!lodash).to.be.true;
    expect(_window._).to.be.equal (undefined);
  });

});

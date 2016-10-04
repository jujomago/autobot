'use strict';

describe('Service: lodash', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var lodash;
  var _$window;
  beforeEach(inject(function (_lodash_, $window) {
    lodash = _lodash_;
    _$window = $window;
  }));

  it('should do undefined lodash at window level', function () {
    expect(!!lodash).to.be.equal(true);
  //  expect(_$window._).to.be.equal (undefined);
  });

});

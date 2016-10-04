'use strict';

describe('Service:GetHomePage', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var GetHomePage;
  beforeEach(inject(function (_GetHomePage_) {
    GetHomePage = _GetHomePage_;
  }));

  it('should return ap.al.skills', function () {
    expect(GetHomePage.of('al')).to.equal('ap.al.skills');
  });

  it('should return underconstruction', function () {
    expect(GetHomePage.of('qsc')).to.equal('ap.underconstruction');
  });

});

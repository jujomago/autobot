'use strict';

describe('Service: Global', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var Global;
  beforeEach(inject(function (_Global_) {
    Global = _Global_;
    Global.testArray = [1,2,3];
    Global.testObject = {test: 'test'};
    Global.testString = 'test';
  }));

  it('should save arrays', function () {
    expect(Global.testArray).to.be.an('array');
    expect(Global.testArray[0]).to.equal(1);
    expect(Global.testArray[1]).to.equal(2);
    expect(Global.testArray[2]).to.equal(3);
  });
  it('should save objects', function () {
    expect(Global.testObject).to.be.an('object');
    expect(Global.testObject.test).to.equal('test');
  });
  it('should save strings', function () {
    expect(Global.testString).to.be.an('string');
    expect(Global.testString).to.equal('test');
  });

});

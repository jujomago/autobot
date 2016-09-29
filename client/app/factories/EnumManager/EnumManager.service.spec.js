'use strict';

describe('Service:EnumManager', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var EnumManager;
  beforeEach(inject(function (_EnumManager_) {
    EnumManager = _EnumManager_;
  }));

  it('should return value of 3 in COMING_SOON', function () {
    expect(EnumManager.getEnums().COMING_SOON).to.be.equal(3);
  });

  it('should value of COMING_SOON must be immutable', function () {
    let constants = EnumManager.getEnums();
    let message;
    try{
      constants.COMING_SOON = 0;
    }
    catch(error){
      message = error.message;
    }
    expect(constants.COMING_SOON).to.be.equal(3);
    expect(message).to.be.equal('Attempted to assign to readonly property.');
  });

});

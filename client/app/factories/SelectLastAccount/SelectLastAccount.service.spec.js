'use strict';

describe('Service:SelectLastAccount', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var _SelectLastAccount, _endPointUrl;
  var _$httpBackend;
  beforeEach(inject(function (_SelectLastAccount_, $httpBackend, appConfig) {
    _SelectLastAccount = _SelectLastAccount_;
    _$httpBackend = $httpBackend;
    if(appConfig.apiUri){
        _endPointUrl=appConfig.apiUri+'/admin/users';
    }
  }));

  it('should do something', function () {
    _$httpBackend.whenPOST(_endPointUrl+'/partner/f9/lastusedaccount').respond(200, {username: 'five9_1@five.com'});
    _SelectLastAccount('f9d', 's')
    .then(response => {
      expect(response.data.username).to.equal('five9_1@fisdve.coms');  
    });
  });

});

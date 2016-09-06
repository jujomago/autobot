'use strict';

describe('Service:SelectLastAccount', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var _SelectLastAccount, _endPointUrl;
  var _$httpBackend;
  var mockState;
  beforeEach(function (){
      mockState = {
        go: function(state, params){
          this.state = state;
          this.params = params;
        }
      };
      module(function ($provide){
          $provide.value('$state', mockState);
      });
  });
  beforeEach(inject(function (_SelectLastAccount_, $httpBackend, appConfig) {
    _SelectLastAccount = _SelectLastAccount_;
    _$httpBackend = $httpBackend;
    if(appConfig.apiUri){
        _endPointUrl=appConfig.apiUri+'/admin/users';
    }
    _$httpBackend.whenGET(url=>(url.indexOf('.html') !== -1)).respond(200);
  }));
  afterEach(function () {
    _$httpBackend.verifyNoOutstandingRequest();
  });
  it('should redirect to login page with partner, app and username', function () {
    _$httpBackend.whenGET(_endPointUrl+'/partner/f9/lastusedaccount').respond(200, {username: 'five9_1@five.com'});
    _SelectLastAccount('f9', 'al')
    .then(() => {
      expect(mockState.state).to.equal('ap.login');  
      expect(mockState.params.partnerId).to.equal('f9');
      expect(mockState.params.appName).to.equal('al');
      expect(mockState.params.username).to.equal('five9_1@five.com');
    });
    _$httpBackend.flush();
  });

  it('should redirect to all accounts page', function () {
    _$httpBackend.whenGET(_endPointUrl+'/partner/sf/lastusedaccount').respond(200, {username: ''});
    _SelectLastAccount('sf', 'app1')
    .then(() => {
      expect(mockState.state).to.equal('partneraccounts');  
      expect(mockState.params.partnerId).to.equal('sf');
    });
    _$httpBackend.flush();
  });

  it('should redirect to all accounts page', function () {
    _$httpBackend.whenGET(_endPointUrl+'/partner/f9/lastusedaccount').respond(500, {error: 'Internal Server Error'});
    _SelectLastAccount('f9', 'al')
    .then(() => {
      expect(mockState.state).to.equal('partneraccounts');  
      expect(mockState.params.partnerId).to.equal('f9');
    });
    _$httpBackend.flush();
  });

});

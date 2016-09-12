'use strict';

describe('Component:PartnerCreateComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  let _PartnerSubscribeComponent, _endPointUrl, _mockState;
  let _$httpBackend;
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $httpBackend, appConfig) {
    _$httpBackend = $httpBackend;
    if (appConfig.apiUri) {
      _endPointUrl = appConfig.apiUri +'/admin/users';
    }
    _mockState = {
      path: '',
      go: function(path, params){
        this.path = path;
        this.params =params;
      }
    };
    _PartnerSubscribeComponent = $componentController('accounts.partnersubscribe', {
      $state: _mockState
    });
    _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
  }));
  describe('#subscribe', () => {

      it('should create account, login and be redirected to skills', () =>{
        _$httpBackend.whenPOST(_endPointUrl+'/partner/app').respond(200, 'Success');
        _$httpBackend.whenPOST(_endPointUrl+'/auth').respond(200, 'Success');
        _PartnerSubscribeComponent.credentials.appName = 'al';
        _PartnerSubscribeComponent.subscribe()
        .then(() => {
          expect(_mockState.path).to.equal('ap.al.skills');
        });
        _$httpBackend.flush();
      });

      it('should create account, login and be redirected to underconstruction', () =>{
        _$httpBackend.whenPOST(_endPointUrl+'/partner/app').respond(200, 'Success');
        _$httpBackend.whenPOST(_endPointUrl+'/auth').respond(200, 'Success');
        _PartnerSubscribeComponent.credentials.appName = 'cj';
        _PartnerSubscribeComponent.subscribe()
        .then(() => {
          expect(_mockState.path).to.equal('underconstruction');
        });
        _$httpBackend.flush();
      });
      it('should create account return error', () => {
      _$httpBackend.whenPOST(_endPointUrl+'/partner/app').respond(500,{error: 'Incorrect Password'});
      let promise = _PartnerSubscribeComponent.subscribe();
      expect(_PartnerSubscribeComponent.sendingInfo).to.equal(true);
      promise
        .then(() => {
          expect(_PartnerSubscribeComponent.sendingInfo).to.equal(false);
          expect(_PartnerSubscribeComponent.message.type).to.equal('danger');
          expect(_PartnerSubscribeComponent.message.text).to.equal('Incorrect Password');
        });
      _$httpBackend.flush();
    });
      it('should create account but login return error', () => {
      _$httpBackend.whenPOST(_endPointUrl+'/partner/app').respond(200, 'Success');
      _$httpBackend.whenPOST(_endPointUrl + '/auth').respond(500,{error: 'Incorrect Password'});
      _PartnerSubscribeComponent.subscribe()
        .then(() => {
          expect(_mockState.path).to.equal('ap.login');
        });
      _$httpBackend.flush();
    });


    
  });
});

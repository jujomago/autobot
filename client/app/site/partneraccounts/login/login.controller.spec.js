'use strict';

describe('Component: LoginComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  let _LoginComponent, _endPointUrl, _mockState, _mockStateParams;
  let _$httpBackend;
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $httpBackend, appConfig) {
    _$httpBackend = $httpBackend;
    if (appConfig.apiUri) {
      _endPointUrl = appConfig.apiUri +'/admin/users';
    }
    _mockState = {
      path: '',
      go: function(path){
        this.path = path;
      }
    };
    _mockStateParams = {};
    _LoginComponent = $componentController('partners.accounts.login', {
      $state: _mockState,
      $stateParams: _mockStateParams
    });
    _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
  }));
  afterEach(function () {
    _$httpBackend.verifyNoOutstandingRequest();
  });
  describe('#setMessage', () => {
      it('should display a param message', () =>{
        _mockStateParams.message = {show: true, text: 'some message', type: 'danger'};
        _LoginComponent.setMessage();
        expect(_LoginComponent.message.show).to.equal(true);
        expect(_LoginComponent.message.text).to.equal('some message');
        expect(_LoginComponent.message.type).to.equal('danger');
      });

      it('should hide the message', () =>{
        _mockStateParams.message = null;
        _LoginComponent.setMessage();
        expect(_LoginComponent.message.show).to.equal(false);
      }); 
  });
  describe('#login', () => {

      it('should login and be redirected to skills', () =>{
        _$httpBackend.whenPOST(_endPointUrl+'/auth').respond(200, 'Success');
        _LoginComponent.credentials.appName = 'al';
        _LoginComponent.login()
        .then(() => {
          expect(_mockState.path).to.equal('ap.al.skills');
        });
        _$httpBackend.flush();
      });

      it('should login and be redirected to underconstruction', () =>{
        _$httpBackend.whenPOST(_endPointUrl+'/auth').respond(200, 'Success');
        _LoginComponent.credentials.appName = 'cj';
        _LoginComponent.login()
        .then(() => {
          expect(_mockState.path).to.equal('underconstruction');
        });
        _$httpBackend.flush();
      });

      it('login should return error if password not match', () => {
      _$httpBackend.whenPOST(_endPointUrl + '/auth').respond(500,{error: 'Incorrect Password'});


      _LoginComponent.login()
        .then(() => {
          expect(_LoginComponent.message.show).to.equal(true);
          expect(_LoginComponent.message.type).to.equal('danger');
          expect(_LoginComponent.message.text).to.equal('Incorrect Password');
        });
      _$httpBackend.flush();
    });
    
  });
});
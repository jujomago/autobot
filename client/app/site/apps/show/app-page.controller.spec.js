'use strict';

describe('Component:AppComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  let AppComponent, _$httpBackend, _endPointUrl;
  beforeEach(inject(function ($componentController, $rootScope, $httpBackend, appConfig) {
    _$httpBackend = $httpBackend;
    _endPointUrl = '/admin/apps';
    if (appConfig.apiUri) {
        _endPointUrl = appConfig.apiUri + _endPointUrl;
    }
    AppComponent = $componentController('apppage');
    _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
  }));
  describe('#getApp', () => {
    it('should get app', () => {
     _$httpBackend.whenGET(_endPointUrl+'/test').respond(200, {app: {appName: 'ta', appFullName: 'testApp'}, partner: {partnerName: 'tp', partnerFullName: 'testPartner'}, installed: true});
     AppComponent.appName = 'test';
     AppComponent.getApp()
     .then(() =>{
        expect(AppComponent.partner.partnerName).to.equal('tp');
        expect(AppComponent.partner.partnerFullName).to.equal('testPartner');
        expect(AppComponent.application.appName).to.equal('ta');
        expect(AppComponent.application.isInstalled).to.equal(true);
        expect(AppComponent.application.appFullName).to.equal('testApp');
     });
     _$httpBackend.flush();
    });
    it('should return Status 500', () => {
      _$httpBackend.whenGET(_endPointUrl+'/test').respond(500, {error: 'Internal Server Error'});
      AppComponent.appName = 'test';
      AppComponent.getApp()
       .then(() =>{
          expect(AppComponent.message.show).to.equal(true);
          expect(AppComponent.message.type).to.equal('danger');
          expect(AppComponent.message.text).to.equal('Internal Server Error');
       });
       _$httpBackend.flush();
    });
  });
});

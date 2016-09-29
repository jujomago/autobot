'use strict';

describe('Service: AppsService', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var _AppsService, _$httpBackend;
  var _endPointUrl;
  var mockAppsData = [
    {
      'app':{
        'appName': 'AL',
        'appFullName': 'Admin Console',
        'description': 'My app 1 description',
        'appStatus': 1
      },
      'partner':{
        'partnerName': 'f9',
        'partnerFullName': 'Five9'
      }
    },
    {
      'app':{
        'appName': 'myapp2',
        'appFullName': 'My App2',
        'description': 'My app 2 description',
        'appStatus': 1
      },
      'partner':{
        'partnerName': 'sf',
        'partnerFullName': 'SalesForce'
      }
  },
  {
      'app':{
        'appName': 'myapp3',
        'appFullName': 'My App3',
        'description': 'My app 3 description',
        'appStatus': 2
      },
      'partner':{
        'partnerName': 'sf',
        'partnerFullName': 'SalesForce'
      }
  }];
  beforeEach(inject(function (_AppsService_, $httpBackend, appConfig) {
    _AppsService = _AppsService_;
    _$httpBackend = $httpBackend;
    if(appConfig.apiUri){
        _endPointUrl=appConfig.apiUri+'/admin/apps';
    }
  }));
  afterEach(function () {
    _$httpBackend.verifyNoOutstandingRequest();
  });

  describe('#getApps',()=>{
    it('should return apps', function () {
      _$httpBackend.whenGET(_endPointUrl+'/filter?size=100').respond(mockAppsData);
      _AppsService.getApps().then(apps => {
        console.log(apps.data);
          expect(null).to.not.equal(apps);
          expect(undefined).to.not.equal(apps);
          expect(apps.data.length).to.equal(2);
          expect(apps.data[0].apps.length).to.equal(1);
          expect(apps.data[1].apps.length).to.equal(1);
          expect(apps.data[1].partner).to.equal('SalesForce');
          expect(apps.data[0].partner).to.equal('Five9');
      });
      _$httpBackend.flush();
    });
    it('should return error getting apps', function () {
      _$httpBackend.whenGET(_endPointUrl+'/filter?size=100').respond(500, {error: 'Internal Server Error'});
      _AppsService.getApps().catch(error => {
          expect(null).to.not.equal(error);
          expect(undefined).to.not.equal(error);
          expect(error.statusCode).to.equal(500);
          expect(error.errorMessage).to.equal('Internal Server Error');
      });
      _$httpBackend.flush();
    });
  });
  describe('#getFilteredApps',()=>{
    it('should return filtered apps with attributes', function () {
      _$httpBackend.whenGET(_endPointUrl+'/filter?size=2&status=active').respond(200,mockAppsData);
      _AppsService.getFilteredApps({size: 2, status: 'active'})
      .then(apps => {
          expect(null).to.not.equal(apps);
          expect(undefined).to.not.equal(apps);
          expect(apps.data.length).to.equal(2);
          expect(apps.data[0].app.appName).to.equal('AL');
          expect(apps.data[1].app.appName).to.equal('myapp2');
          expect(apps.data[0].partner.partnerFullName).to.equal('Five9');
          expect(apps.data[1].partner.partnerFullName).to.equal('SalesForce');
      });
      _$httpBackend.flush();
    });
    it('should return submenu error', function () {
      _$httpBackend.whenGET(_endPointUrl+'/filter?size=10&status=active&installed=true').respond(500, {error: 'Internal Server Error'});
      _AppsService.getFilteredApps({size: 10, status: 'active', installed: true})
      .catch(error => {
          expect(null).to.not.equal(error);
          expect(undefined).to.not.equal(error);
          expect(error.statusCode).to.equal(500);
          expect(error.errorMessage).to.equal('Internal Server Error');
      });
      _$httpBackend.flush();
    });
  });

});

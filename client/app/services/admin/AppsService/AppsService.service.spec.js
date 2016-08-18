'use strict';

describe('Service: AppsService', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var _AppsService, _$httpBackend;
  var mockAppsData = [
                      {
                        'partnerName': 'Five9',
                        'partnerId': 'f9',
                        'apps': [
                          {
                            'appName': 'al',
                            'appFullName': 'Admin Lite',
                            'description': 'This is the description',
                            'isInstalled': true
                          }
                        ]
                      },
                      {
                        'partnerName': 'SalesForce',
                        'partnerId': 'sf',
                        'apps': [
                          {
                            'appName': 'sf',
                            'appFullName': 'XYZ App',
                            'description': 'This is the description',
                            'isInstalled': false
                          }
                        ]
                      }
                    ];
  beforeEach(inject(function (_AppsService_, $httpBackend) {
    _AppsService = _AppsService_;
    _$httpBackend = $httpBackend;
  }));
  afterEach(function () {
    _$httpBackend.verifyNoOutstandingRequest();
  });


  it('should return apps', function () {
    _$httpBackend.whenGET('/assets/admin/json/apps.json').respond(mockAppsData);
    _AppsService.getApps().then(apps => {
        expect(null).to.not.equal(apps);
        expect(undefined).to.not.equal(apps);
        expect(apps.data.length).to.equal(2);
        expect(apps.data[0].apps.length).to.equal(1);
        expect(apps.data[1].apps.length).to.equal(1);
        expect(apps.data[1].partnerName).to.equal('SalesForce');
        expect(apps.data[0].partnerName).to.equal('Five9');
    });
    _$httpBackend.flush();
  });
  it('should return error getting apps', function () {
    _$httpBackend.whenGET('/assets/admin/json/apps.json').respond(500, 'Internal Server Error');
    _AppsService.getApps().catch(error => {
        expect(null).to.not.equal(error);
        expect(undefined).to.not.equal(error);
        expect(error.statusCode).to.equal(500);
        expect(error.errorMessage).to.equal('Internal Server Error');
    });
    _$httpBackend.flush();
  });

  it('should return submenu installed apps', function () {
    let installedApps = [
    {
      'app':{
        'appName': 'AL', 
        'appFullName': 'Admin Console',
        'description': 'My app 1 description'
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
        'description': 'My app 2 description'
      },
      'partner':{
        'partnerName': 'f9',
        'partnerFullName': 'Five9'
      }
    }];
    _$httpBackend.whenGET('/assets/admin/json/installed.json').respond(installedApps);
    _AppsService.getInstalled().then(apps => {
        expect(null).to.not.equal(apps);
        expect(undefined).to.not.equal(apps);
        expect(apps.data.length).to.equal(2);
        expect(apps.data[0].partner.partnerFullName).to.equal('Five9');
    });
    _$httpBackend.flush();
  });
  it('should return submenu error', function () {
    _$httpBackend.whenGET('/assets/admin/json/installed.json').respond(500, 'Internal Server Error');
    _AppsService.getInstalled().catch(error => {
        expect(null).to.not.equal(error);
        expect(undefined).to.not.equal(error);
        expect(error.statusCode).to.equal(500);
        expect(error.errorMessage).to.equal('Internal Server Error');
    });
    _$httpBackend.flush();
  });

  it('should return submenu new apps', function () {
    let newApps = [
      {
        'app':{
          'appName': 'myapp4', 
          'appFullName': 'My App4',
          'description': 'My app 4 description'
        },
        'partner':{
          'partnerName': 'f9',
          'partnerFullName': 'Five9'
        }
      },
      {
        'app':{
          'appName': 'myapp5', 
          'appFullName': 'My App5',
          'description': 'My app 5 description'
        },
        'partner':{
          'partnerName': 'sf',
          'partnerFullName': 'SalesForce'
        }
      }
    ];
    _$httpBackend.whenGET('/assets/admin/json/newapps.json').respond(newApps);
    _AppsService.getNews().then(apps => {
        expect(null).to.not.equal(apps);
        expect(undefined).to.not.equal(apps);
        expect(apps.data.length).to.equal(2);
        expect(apps.data[1].partner.partnerFullName).to.equal('SalesForce');
    });
    _$httpBackend.flush();
  });

  it('should return submenu new apps error', function () {
    _$httpBackend.whenGET('/assets/admin/json/newapps.json').respond(500, 'Internal Server Error');
    _AppsService.getNews().catch(error => {
        expect(null).to.not.equal(error);
        expect(undefined).to.not.equal(error);
        expect(error.statusCode).to.equal(500);
        expect(error.errorMessage).to.equal('Internal Server Error');
    });
    _$httpBackend.flush();
  });

});

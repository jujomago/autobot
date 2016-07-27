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
        expect(error.error).to.equal('Internal Server Error');
    });
    _$httpBackend.flush();
  });

});

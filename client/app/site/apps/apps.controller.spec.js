'use strict';

describe('Component: AppsComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var AppsComponent, _$scope,_$state, _$httpBackend, _AppsService, endPointUrl;
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

  beforeEach(inject(function ($componentController, $rootScope, $httpBackend, $state, _AppsService_) {
    _$scope = $rootScope.$new();
    _$httpBackend = $httpBackend;
    _AppsService = _AppsService_;
    _$state = $state;
    endPointUrl = '/assets/admin/json/apps.json';

    AppsComponent = $componentController('apps', {
      $scope: _$scope,
      $stateParams: { message: null },
      $state: _$state,
      AppsService: _AppsService
    });

    _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
  }));

  describe('#get', () => {
    it('=> should get lists', () => {
     _$httpBackend.whenGET(endPointUrl).respond(mockAppsData);
     AppsComponent.getApps()
     .then(() =>{
        expect(null).to.not.equal(AppsComponent.partners);
        expect(undefined).to.not.equal(AppsComponent.partners);
        expect(AppsComponent.partners.length).to.equal(2);
        expect(AppsComponent.partners[0].apps.length).to.equal(1);
        expect(AppsComponent.partners[1].apps.length).to.equal(1);
        expect(AppsComponent.partners[1].partnerName).to.equal('SalesForce');
        expect(AppsComponent.partners[0].partnerName).to.equal('Five9');
     });
      _$httpBackend.flush();
    });
    it('=> should return Status 500, error in update', () => {
      _$httpBackend.whenGET(endPointUrl).respond(500, 'Internal Server Error');
      AppsComponent.getApps()
       .then(() =>{
          expect(AppsComponent.partners.length).to.equal(0);
          expect(AppsComponent.message.show).to.equal(true);
          expect(AppsComponent.message.type).to.equal('danger');
          expect(AppsComponent.message.text).to.equal('Internal Server Error');
       });
        _$httpBackend.flush();
    });    
  });

});

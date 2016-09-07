'use strict';

describe('Component: AppsComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var AppsComponent, _$scope,_$state, _$httpBackend, _AppsService, endPointUrl;
  var mockAppsData = [
                      {
                        'partner': 'Five9',
                        'apps': [
                          {
                            'app': [
                              {
                                'appFullName':'Admin Console',
                                'appName':'al',
                                'description': 'This is the description'
                              }
                            ],
                            'installed': true,
                            'partner': {
                              'partnerFullName':'Five9',
                              'partnerName':'Five9'
                            }
                          }
                        ]
                      },
                      {
                        'partner': 'SalesForce',
                        'apps': [
                          {
                            'app': [
                              {
                                'appFullName':'XYZ App',
                                'appName':'XYZApp',
                                'description': 'This is the description'
                              }
                            ],
                            'installed': true,
                            'partner': {
                              'partnerFullName':'Sales Force',
                              'partnerName':'SalesForce'
                            }
                          }
                        ]
                      }
                    ];
  beforeEach(inject(function ($componentController, $rootScope, $httpBackend, $state, _AppsService_) {
    _$scope = $rootScope.$new();
    _$httpBackend = $httpBackend;
    _AppsService = _AppsService_;
    endPointUrl = '/admin/apps';

    AppsComponent = $componentController('apps', {
      $scope: _$scope,
      $stateParams: { message: null },
      $state: _$state,
      AppsService: _AppsService,
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
        expect(AppsComponent.partners[1].partner).to.equal('SalesForce');
        expect(AppsComponent.partners[0].partner).to.equal('Five9');
     });
    //_$httpBackend.flush();
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
      //_$httpBackend.flush();
    });
  });
});

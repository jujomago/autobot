'use strict';

describe('Component: NavbarController', function() {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));
  
  var NavbarController, _$scope,_$state, _$httpBackend, _AppsService, _$cookies, _mockLocation, endPointUrl, _AuthService;

  var mockAppsData = [
                      {
                        'app':{
                          'appName': 'al', 
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
                      }
                    ];

  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $cookies, $state, _AppsService_, _AuthService_,appConfig) {

    _$scope = $rootScope.$new();
    _$httpBackend = $httpBackend;
    _AppsService = _AppsService_;
    _AuthService = _AuthService_;
    _$state = $state;
    _mockLocation = {
      params: {},
      url: function(url){
        if(!url){
          return '/ap/al/lists';
        }
        this.url = url;
        return {
          search: function(params){
            _mockLocation.params = params;
          }
        };
      }
    };
    _$cookies = $cookies;

    NavbarController = $controller('NavbarController', {
      $scope: _$scope,
      $location: _mockLocation,
      $stateParams: { message: null },
      $state: _$state,
      _appsService: _AppsService,
    });
    if(appConfig.apiUri){
          endPointUrl=appConfig.apiUri;
      }
    _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
  }));

  //TODO
  //This test doesn't work because a related method uses lodash
  /*describe('#get Installed', () => {
    it('=> should get installed apps', () => {
      _$httpBackend.whenGET('/assets/admin/json/installed.json').respond(mockAppsData);
       NavbarController.getInstalled()
            .then(response => {
                expect(response).to.not.equal(null);
                expect(null).to.not.equal(NavbarController.myAppsFromService);
                expect(undefined).to.not.equal(NavbarController.myAppsFromService);
                expect(NavbarController.myAppsFromService.length).to.equal(2);
                expect(NavbarController.myAppsFromService[0].app.appFullName).to.equal('Admin Console');
                expect(NavbarController.myAppsFromService[1].partner.partnerFullName).to.equal('Five9');  
             });
      _$httpBackend.flush();
    });
    it('=> should return Status 500, error in update', () => {
      _$httpBackend.whenGET('/assets/admin/json/installed.json').respond(500, 'Internal Server Error');
      NavbarController.getInstalled()
       .then(() =>{
          expect(NavbarController.myAppsFromService.length).to.equal(0);
       });
        _$httpBackend.flush();
    }); 
  });*/

  describe('#get new Apps', () => {
    it('=> should get new apps', () => {
      _$httpBackend.whenGET('/assets/admin/json/newapps.json').respond(mockAppsData);
       NavbarController.getNewest()
            .then(response => {
                expect(response).to.not.equal(null);
                expect(null).to.not.equal(NavbarController.newApps);
                expect(undefined).to.not.equal(NavbarController.newApps);
                expect(NavbarController.newApps.length).to.equal(2);
                expect(NavbarController.newApps[0].app.appFullName).to.equal('Admin Console');
                expect(NavbarController.newApps[1].partner.partnerFullName).to.equal('Five9');  
             });
      _$httpBackend.flush();
    });
    it('=> should return Status 500, error in update', () => {
      _$httpBackend.whenGET('/assets/admin/json/newapps.json').respond(500, 'Internal Server Error');
      NavbarController.getNewest()
       .then(() =>{
          expect(NavbarController.newApps.length).to.equal(0);
       });
        _$httpBackend.flush();
    });  
  });
  //TODO
  //This test doesn't work because a related method uses lodash
  /*describe('#filteringBySearch', () => {

      it('Should return true, when searching something', () => {
        NavbarController.search.app.appFullName = 'some text to search';
        expect(NavbarController.filteringBySearch()).to.equal (true);
      });

      it('Should return false, when input search is empty', () => {
          NavbarController.search.app.appFullName = '';
          expect(NavbarController.filteringBySearch()).to.equal (false);       
      });

  });*/
  afterEach(function () {
     _$httpBackend.verifyNoOutstandingRequest();
  });
  
  describe('#controllerLogout',()=>{
      it('=> User should logout successfully',()=>{
         _$cookies.put('auth_token','a345fc56786b7b4545');
         _$httpBackend.whenGET(endPointUrl+'/auth/logout').respond(200,
           'The user was logged out succesfully'
         );
          NavbarController.logout()
          .then(response=>{
              expect(response.status).to.equal(200);
              expect(response.data).to.equal('The user was logged out succesfully');
              expect(_mockLocation.url).to.equal('/login');
              expect(_mockLocation.params.url).to.equal('L2FwL2FsL2xpc3Rz');
              expect(_$cookies.get('auth_token')).to.equal(undefined);
          });

          _$httpBackend.flush();
      });

      it('=> User should get a logout error',()=>{
         _$cookies.put('auth_token','a345fc56786b7b4545');
         _$httpBackend.whenGET(endPointUrl+'/auth/logout').respond(500,
           {statusText: 'Internal server error'}
         );
          NavbarController.logout()
          .then(response=>{
              expect(response.statusCode).to.equal(500);
              expect(_$cookies.get('auth_token')).to.equal('a345fc56786b7b4545');
              expect(response.errorMessage.statusText).to.equal('Internal server error');
              expect(NavbarController.message.text.errorMessage.statusText).to.equal('Internal server error');
          });

          _$httpBackend.flush();
      });

  });

});

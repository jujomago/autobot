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
      _$httpBackend.whenGET(endPointUrl+'/admin/apps/notinstalled').respond(mockAppsData);
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
      _$httpBackend.whenGET(endPointUrl+'/admin/apps/notinstalled').respond(500, 'Internal Server Error');
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

      it('Should return false, when input search is an ascii', () => {
          NavbarController.search.app.appFullName = '?';
          expect(NavbarController.filteringBySearch()).to.equal (false);       
      });

  });*/
  afterEach(function () {
     _$httpBackend.verifyNoOutstandingRequest();
  });
  
  describe('#controllerLogout',()=> {
      it('=> User should logout successfully',()=>{
         _$cookies.put('auth_token','eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyaWQiOiI1N2VkMTVhZDVhODBlMzAwMTBlMzRmZmQiLCJkb21haW4iOiJhdXRvYm94Y29ycC5jb20iLCJqdGkiOiI4NDVjNTYzMC04NjQ4LTExZTYtOTdlYi00ZDk5ZTgwYTc2MjciLCJzdWIiOiJ1c2VyODQ1YzU2MzAtODY0OC0xMWU2LTk3ZWItNGQ5OWU4MGE3NjI3IiwiaWF0IjoxNDc1MTU1NjY5LCJleHAiOjE0NzUxNTkyNjl9.cdMtf_jLhh32-Ndp7d53fmxpWjq2n1DzG5Ys5-SkKocMlIIO3P-afzrVSCIz2dTe83EeyeCpmc_tDblygn5yCZsy2gRTCq-x7AAIRT8gyA9Cwj-derGwc9ytZ_DassnPrxNSJkHZAjP0xMf8JXFcFMggQslnP_aBByKTthNW92xQDRHfojCSH18IAiHXW0zz8i-RoTf_MgFVh25c1E8WCQxFS-7R0Tl6BTLsG-KKrZJmPhtnVcWnylicR9nedONNjJfe_fG1CA47M4P3Wr2VXLEUi4ypQTGH158c2wbuqjTa8AMa9qWMWioWfBN6xCKAaCkD8rNWTooGpIGMOTs-Sw');
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
         _$cookies.put('auth_token','eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyaWQiOiI1N2VkMTVhZDVhODBlMzAwMTBlMzRmZmQiLCJkb21haW4iOiJhdXRvYm94Y29ycC5jb20iLCJqdGkiOiI4NDVjNTYzMC04NjQ4LTExZTYtOTdlYi00ZDk5ZTgwYTc2MjciLCJzdWIiOiJ1c2VyODQ1YzU2MzAtODY0OC0xMWU2LTk3ZWItNGQ5OWU4MGE3NjI3IiwiaWF0IjoxNDc1MTU1NjY5LCJleHAiOjE0NzUxNTkyNjl9.cdMtf_jLhh32-Ndp7d53fmxpWjq2n1DzG5Ys5-SkKocMlIIO3P-afzrVSCIz2dTe83EeyeCpmc_tDblygn5yCZsy2gRTCq-x7AAIRT8gyA9Cwj-derGwc9ytZ_DassnPrxNSJkHZAjP0xMf8JXFcFMggQslnP_aBByKTthNW92xQDRHfojCSH18IAiHXW0zz8i-RoTf_MgFVh25c1E8WCQxFS-7R0Tl6BTLsG-KKrZJmPhtnVcWnylicR9nedONNjJfe_fG1CA47M4P3Wr2VXLEUi4ypQTGH158c2wbuqjTa8AMa9qWMWioWfBN6xCKAaCkD8rNWTooGpIGMOTs-Sw');
         _$httpBackend.whenGET(endPointUrl+'/auth/logout').respond(500,
           {statusText: 'Internal server error'}
         );
          NavbarController.logout()
          .then(response=>{
              expect(response.statusCode).to.equal(500);
              expect(_$cookies.get('auth_token')).to.equal('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyaWQiOiI1N2VkMTVhZDVhODBlMzAwMTBlMzRmZmQiLCJkb21haW4iOiJhdXRvYm94Y29ycC5jb20iLCJqdGkiOiI4NDVjNTYzMC04NjQ4LTExZTYtOTdlYi00ZDk5ZTgwYTc2MjciLCJzdWIiOiJ1c2VyODQ1YzU2MzAtODY0OC0xMWU2LTk3ZWItNGQ5OWU4MGE3NjI3IiwiaWF0IjoxNDc1MTU1NjY5LCJleHAiOjE0NzUxNTkyNjl9.cdMtf_jLhh32-Ndp7d53fmxpWjq2n1DzG5Ys5-SkKocMlIIO3P-afzrVSCIz2dTe83EeyeCpmc_tDblygn5yCZsy2gRTCq-x7AAIRT8gyA9Cwj-derGwc9ytZ_DassnPrxNSJkHZAjP0xMf8JXFcFMggQslnP_aBByKTthNW92xQDRHfojCSH18IAiHXW0zz8i-RoTf_MgFVh25c1E8WCQxFS-7R0Tl6BTLsG-KKrZJmPhtnVcWnylicR9nedONNjJfe_fG1CA47M4P3Wr2VXLEUi4ypQTGH158c2wbuqjTa8AMa9qWMWioWfBN6xCKAaCkD8rNWTooGpIGMOTs-Sw');
              expect(response.errorMessage.statusText).to.equal('Internal server error');
              expect(NavbarController.message.text.errorMessage.statusText).to.equal('Internal server error');
          });

          _$httpBackend.flush();
      });
  });
  describe('# myAppsCollapsed variable', () => {
      it('the update the myAppsCollapsed true variable',()=>{
          NavbarController.changeFocus(true);
          expect(NavbarController.myAppsCollapsed).to.equal(true);
      });
      it('the update the myAppsCollapsed false variable',()=>{
          NavbarController.changeFocus(false);
          expect(NavbarController.myAppsCollapsed).to.equal(false);
      });
  });

});

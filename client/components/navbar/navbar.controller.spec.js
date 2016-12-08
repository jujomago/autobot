'use strict';

describe('Component:NavbarController', function() {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var NavbarController, _$scope,_$state, _$httpBackend, _AppsService, _$cookies, _mockLocation, endPointUrl, _AuthService, appsInstall;

  var mockAppsData = [
    {
      app:{
        appName: 'sc',
        appFullName: 'Supervisor_Console',
        description: 'My_app_1_description',
        appStatus: 1
      },
      partner:{
        partnerName: 'f9',
        partnerFullName: 'Five9'
      }
    },
    {
      app:{
        appName: 'al',
        appFullName: 'Admin_Console',
        description: 'My_app_2_description',
        appStatus: 1
      },
      partner:{
        partnerName: 'f9',
        partnerFullName: 'Five9'
      }
    },
    {
      app:{
        appName: 'rqa',
        appFullName: 'RQA',
        description: 'My_app_3_description',
        appStatus: 2
      },
      partner:{
        partnerName: 'f9',
        partnerFullName: 'Five9'
      }
    }
  ];
  let mockAlertDialog, mockRefreshToken;
  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $cookies, $state, $q, _AppsService_, _AuthService_,appConfig, _lodash_) {

    _$scope = $rootScope.$new();
    _$httpBackend = $httpBackend;
    _AppsService = _AppsService_;
    _AuthService = _AuthService_;
    _$state = $state;

    appsInstall = $q.defer();
    sinon.stub(_AppsService, 'getFilteredApps').returns(appsInstall.promise);
    sinon.spy($state, 'go');

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
    mockRefreshToken = {
      cancelRefresh: sinon.stub()
    };
    _$cookies = $cookies;
    mockAlertDialog = sinon.stub();
    NavbarController = $controller('NavbarController', {
      $scope: _$scope,
      $location: _mockLocation,
      $stateParams: { message: null },
      $state: _$state,
      lodash: _lodash_,
      _appsService: _AppsService,
      AlertDialog: mockAlertDialog,
      RefreshToken: mockRefreshToken
    });
    if(appConfig.apiUri){
      endPointUrl=appConfig.apiUri;
    }
    _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
  }));

  //TODO
  //This test doesn't work because a related method uses lodash
  describe('#getInstalledApps', () => {

    it('=> should get installed apps', () => {
      mockAppsData[2].app.appStatus = 1;
      appsInstall.resolve({data: mockAppsData});
      NavbarController.getInstalled();
      _$scope.$apply();

      expect(null).to.not.equal(NavbarController.myAppsFromService);
      expect(undefined).to.not.equal(NavbarController.myAppsFromService);
      expect(NavbarController.myAppsFromService.length).to.equal(3);
      expect(NavbarController.myAppsFromService[0].app.appFullName).to.equal('Admin_Console');
      expect(NavbarController.myAppsFromService[1].partner.partnerFullName).to.equal('Five9');
    });


     it('=> should return Status 500, error in update', () => {
       appsInstall.reject({errorMessage: 'Internal Server Error'});
       NavbarController.getInstalled();
       _$scope.$apply();

       expect(NavbarController.myAppsFromService.length).to.equal(0);
       expect(NavbarController.message).to.deep.equal({show: true, type: 'danger', text: 'Internal Server Error'});
    });

    it('=> should sort apps', () => {
      let EXPECTED = [
        {
          app:{
            appName: 'al',
            appFullName: 'Admin_Console',
            description: 'My_app_2_description',
            appStatus: 1
          },
          partner:{
            partnerName: 'f9',
            partnerFullName: 'Five9'
          }
        },
        {
          app:{
            appName: 'rqa',
            appFullName: 'RQA',
            description: 'My_app_3_description',
            appStatus: 1
          },
          partner:{
            partnerName: 'f9',
            partnerFullName: 'Five9'
          }
        },
        {
          app:{
            appName: 'sc',
            appFullName: 'Supervisor_Console',
            description: 'My_app_1_description',
            appStatus: 1
          },
          partner:{
            partnerName: 'f9',
            partnerFullName: 'Five9'
          }
        }
      ];
      mockAppsData[0].app.appStatus = 1;
      mockAppsData[2].app.appStatus = 1;

      appsInstall.resolve({data: mockAppsData});

      NavbarController.getInstalled();
      _$scope.$apply();

      expect(NavbarController.myAppsFromService).to.deep.equal(EXPECTED);
    });
  });

  describe('#getNewest', () => {
    it('should get new apps', () => {
      _$httpBackend.whenGET(endPointUrl+'/admin/apps/filter?installed=false').respond(mockAppsData);
      NavbarController.getNewest()
        .then(response => {
          expect(response).to.not.equal(null);
          expect(null).to.not.equal(NavbarController.newApps);
          expect(undefined).to.not.equal(NavbarController.newApps);
          expect(NavbarController.newApps.length).to.equal(2);
          expect(NavbarController.newApps[0].app.appFullName).to.equal('Admin_Console');
          expect(NavbarController.newApps[1].partner.partnerFullName).to.equal('Five9');
        });
    });
    it('=> should return Status 500, error in update', () => {
      _$httpBackend.whenGET(endPointUrl+'/admin/apps/filter?installed=false').respond(500, 'Internal Server Error');
      NavbarController.getNewest()
        .then(() =>{
          expect(NavbarController.newApps.length).to.equal(0);
        });
    });
  });

  describe('#getProfile', () => {
    it('should get the user profile', () => {
      _$httpBackend.whenGET(endPointUrl+ '/admin/users/profile').respond(200,
        {
          email: 'user@test.com',
          firstname: 'user',
          avatar: null,
          role: 'admin'
        }
      );
      NavbarController.getProfile()
        .then(() => {
          expect(NavbarController.firstName).to.equal('user');
          expect(NavbarController.avatar).to.equal(null);
        });
      _$httpBackend.flush();
    });
    it('should display alert on status 500', () => {
      _$httpBackend.whenGET(endPointUrl+ '/admin/users/profile').respond(500, {error: 'Internal Server Error'});
      NavbarController.getProfile()
        .then(() =>{
          expect(mockAlertDialog.calledOnce).to.equal(true);
        });
      _$httpBackend.flush();
    });
    it('should not display alert on status 401', () => {
      _$httpBackend.whenGET(endPointUrl+ '/admin/users/profile').respond(401, {error: 'Unauthorized'});
      NavbarController.getProfile()
        .then(() =>{
          expect(mockAlertDialog.called).to.equal(false);
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
    _$cookies.remove('auth_token');
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
          expect(mockRefreshToken.cancelRefresh.calledOnce).to.equal(true);
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

  describe('#hideSubMenuOnClick', () => {
    it('click submenu myapps should hide the submenu, except for click the searchbox',()=>{
      let submenu='myapps';
      let obj={target:{id:'someid'}};
      NavbarController.hideSubMenuOnClick(obj,submenu);
      expect(NavbarController.myAppsCollapsed).to.equal(true);

      obj.target.id='submenu-search';
      NavbarController.hideSubMenuOnClick(obj,submenu);
      expect(NavbarController.myAppsCollapsed).to.equal(false);

    });
    it('click submenu reports should hide the submenu',()=>{
      let submenu='reports';
      NavbarController.hideSubMenuOnClick({},submenu);
      expect(NavbarController.reportsCollapsed).to.equal(true);
    });
  });



});

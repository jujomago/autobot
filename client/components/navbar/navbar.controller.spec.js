'use strict';

describe('Controller: NavbarController', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var NavbarController, _$scope,_$state, _$httpBackend, _AppsService;
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

  beforeEach(inject(function ($controller, $rootScope, $httpBackend, $state, _AppsService_) {
    _$scope = $rootScope.$new();
    _$httpBackend = $httpBackend;
    _AppsService = _AppsService_;
    _$state = $state;

    NavbarController = $controller('NavbarController', {
      $scope: _$scope,
      $stateParams: { message: null },
      $state: _$state,
      _appsService: _AppsService
    });

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

      it('Should return false, when input search is an ascii', () => {
          NavbarController.search.app.appFullName = '?';
          expect(NavbarController.filteringBySearch()).to.equal (false);       
      });

  });*/
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

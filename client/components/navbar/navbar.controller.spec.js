'use strict';

describe('Component: NavbarController', function() {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var navbarComponent;
  var _mockLocation;
  var _$cookies;
  var _$httpBackend;
  var endPointUrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(
    _$httpBackend_,
    $componentController,
    $cookies,
    appConfig,
    $rootScope,
    AuthService) {
      _$httpBackend = _$httpBackend_;
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
      navbarComponent = $componentController('navbar', {
        $location: _mockLocation,
        $scope: $rootScope.$new(),
        AuthService: AuthService
      });

      if(appConfig.apiUri){
          endPointUrl=appConfig.apiUri;
      }
         

      _$httpBackend.whenGET(url=>(url.indexOf('.html') !== -1)).respond(200);
      
  }));


  afterEach(function () {
     _$httpBackend.verifyNoOutstandingRequest();
  });
  
  describe('#controllerLogout',()=>{
      it('=> User should logout successfully',()=>{
         _$cookies.put('auth_token','a345fc56786b7b4545');
         _$httpBackend.whenGET(endPointUrl+'/auth/logout').respond(200,
           'The user was logged out succesfully'
         );
          navbarComponent.logout()
          .then(response=>{
              expect(response.status).to.equal(200);
              expect(response.data).to.equal('The user was logged out succesfully');
              expect(_mockLocation.url).to.equal('/login');
              expect(_mockLocation.params.url).to.equal('L2FwL2FsL2xpc3Rz');
              expect(_$cookies.get('auth_token')).to.equal(undefined);
          });

          _$httpBackend.flush();
      });

  });
});


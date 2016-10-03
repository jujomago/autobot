'use strict';

describe('Component: RegisterController', function() {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('stateMock'));

  var scope;
  var registerComponent;
  var state;
  var _mockStateParams, _mockLocation;
  var _$cookies;
  var httpBackend;
  var endPointUrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(
    _$httpBackend_,
    $http,
    $componentController,
    $rootScope,
    $state,
    $cookies,
    appConfig) {
      httpBackend = _$httpBackend_;
      _mockStateParams = {url: 'L2FwL2FsL2xpc3Rz'};
      _mockLocation = {
        url: function(url){
          if(!url){
            return this.url;
          }
          else{
            this.url = url;
            return {search: function(){}};
          }
        }
      };
      _$cookies = $cookies;
      scope = $rootScope.$new();
      state = $state;
      registerComponent = $componentController('register', {
        $http: $http,
        $scope: scope,
        $stateParams: _mockStateParams,
        $location: _mockLocation
      });

      if(appConfig.apiUri){
          endPointUrl=appConfig.apiUri;
      }


      httpBackend.whenGET(url=>(url.indexOf('.html') !== -1)).respond(200);

  }));


  afterEach(function () {
     httpBackend.verifyNoOutstandingRequest();
  });


  describe('register autobox user',()=>{
      it('Use API to create a new Autobox user',()=>{
          registerComponent.company='Autobox';
          registerComponent.email='admin2@autoboxcorp.com';
          registerComponent.firstName='Name User';
          registerComponent.lastName='LastName User';

          registerComponent.register()
          .then(response=>{
              expect(response.status).to.equal(200);
              expect(_$cookies.get('auth_token')).to.equal('2032820asdfka0s0293ma002');
              expect(_mockLocation.url).to.equal('/ap/al/lists');
          });

          httpBackend.flush();
      });

  });

});

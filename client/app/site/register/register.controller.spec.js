'use strict';

describe('Component: RegisterController', function() {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('stateMock'));

  var registerInfo;
  var registerComponent;
  var scope;
  var state;
  var _mockStateParams;
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
      _$cookies = $cookies;
      scope = $rootScope.$new();
      registerComponent = $componentController('register', {
        $http: $http,
        $scope: scope,
        $stateParams: _mockStateParams
      })
      registerInfo = {
        email:'admin2@autoboxcorp.com',
        company: 'Autobox',
        firstname: 'User Name',
        lastname:'LastName'
      };

      if(appConfig.apiUri){
          endPointUrl=appConfig.apiUri;
      }
      httpBackend.whenGET(url=>(url.indexOf('.html') !== -1)).respond(201);
  }));

  describe('getCompanies',()=>{
      it('get companies for dropdown', ()=>{
        registerComponent.getCompanies()
        .then(response=>{
            expect(response.status).to.equal(200);
            expect(response.data).to.equal(array);
        });
        httpBackend.flush();
      });
  });
  describe('register autobox user',()=>{
      it('Register new Autobox user',()=>{
          registerComponent.register()
          .then(response=>{
              expect(response.status).to.equal(201);
          });
          httpBackend.flush();
      });
  });
});

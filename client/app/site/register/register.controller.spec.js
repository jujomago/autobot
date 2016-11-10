'use strict';

describe('Component: RegisterController', function() {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('stateMock'));

  var registerComponent;
  var scope;
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
      });
      if(appConfig.apiUri){
          endPointUrl=appConfig.apiUri;

      }
      httpBackend.whenGET(url=>(url.indexOf('.html') !== -1)).respond(201);
  }));
  afterEach(function () {
     httpBackend.verifyNoOutstandingRequest();
  });

  describe('getCompanies',()=>{
      it('get companies for dropdown', ()=>{
          httpBackend.whenGET(endPointUrl+'/admin/companies').respond(
              { data: { _id:'57f66733237e6e1100228806', companyName:'autoboxcorp-compay'},status:200}
          );
        registerComponent.getCompanies()
        .then(response=>{
            expect(response.status).to.equal(200);
            expect(response.data.companyName).to.equal('autoboxcorp-compay');
        });
        httpBackend.flush();
      });
  });
  describe('register autobox user',()=>{
      it('Register new Autobox user',()=>{
          let reg = {
             'email': 'email@domain.com',
             'company': 'autobox',
             'firstname': 'nameuser',
             'lastname': 'lastnameuser'
          };
          registerComponent.email='email@domain.com';
          registerComponent.company='autobox';
          registerComponent.firstname='nameuser';
          registerComponent.lastname='lastnameuser';
          httpBackend.whenPOST(endPointUrl+'/admin/temporaryusers',reg).respond(201, { }
          );
          registerComponent.register()
          .then(response=>{
              expect(response.status).to.equal(201);              
              expect(registerComponent.message).to.eql({show: true, type:'success',text:'SUCCESS', expires:4000 });
              expect(registerComponent.executeSave).to.equal(false);
              registerComponent.clearInput();
              expect(registerComponent.email).to.equal('');
              expect(registerComponent.firstname).to.equal('');
              expect(registerComponent.lastname).to.equal('');
              expect(registerComponent.company).to.equal('');
          });
          httpBackend.flush();
      });
  });
});

'use strict';

describe('Component: LoginController', function() {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('stateMock'));

  var scope;
  var loginComponent;
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
        url: '',
        path: function(url){
          this.url = url;
        }
      };
      _$cookies = $cookies;
      scope = $rootScope.$new();
      state = $state;
      loginComponent = $componentController('login', {
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
  

  describe('#controllerlogin',()=>{   
      it('=> User logged in Successfully with credentials and redirected to /ap/al/lists',()=>{       

  
          loginComponent.username='admin@autoboxcorp.com';
          loginComponent.password='Password1';  

          httpBackend.whenPOST(endPointUrl+'/auth/login',{
            'username': loginComponent.username,
            'password': loginComponent.password
          }).respond('2032820asdfka0s0293ma002');

          httpBackend.expectPOST(endPointUrl+'/admin/users/auth',{
              'partnerId': 'f9',
              'appName': 'al',
              'username': 'rolandorojas@five.com',
              'password': '123456'
          }).respond(200);
          

          loginComponent.login()
          .then(response=>{
              expect(response.status).to.equal(200);
              expect(_$cookies.get('auth_token')).to.equal('2032820asdfka0s0293ma002');
              expect(_mockLocation.url).to.equal('/ap/al/lists');
          });

          httpBackend.flush();
      });  

      it('=> User logged in Successfully with credentials and redirected to default page (/ap/al/skills) empty url param',()=>{       

          _mockStateParams.url = null;
          loginComponent.username='admin@autoboxcorp.com';
          loginComponent.password='Password1';  

          httpBackend.whenPOST(endPointUrl+'/auth/login',{
            'username': loginComponent.username,
            'password': loginComponent.password
          }).respond('2032820asdfka0s0293ma002');

          httpBackend.expectPOST(endPointUrl+'/admin/users/auth',{
              'partnerId': 'f9',
              'appName': 'al',
              'username': 'rolandorojas@five.com',
              'password': '123456'
          }).respond(200);
          

          loginComponent.login()
          .then(response=>{
              expect(response.status).to.equal(200);
              expect(_$cookies.get('auth_token')).to.equal('2032820asdfka0s0293ma002');
              expect(_mockLocation.url).to.equal('/ap/al/skills');
          });

          httpBackend.flush();
      });
      it('=> User logged in Successfully with credentials and redirected to default page (/ap/al/skills) corrupted URL',()=>{       

          _mockStateParams.url = 'CORRUPTED_URL';
          loginComponent.username='admin@autoboxcorp.com';
          loginComponent.password='Password1';  

          httpBackend.whenPOST(endPointUrl+'/auth/login',{
            'username': loginComponent.username,
            'password': loginComponent.password
          }).respond('2032820asdfka0s0293ma002');

          httpBackend.expectPOST(endPointUrl+'/admin/users/auth',{
              'partnerId': 'f9',
              'appName': 'al',
              'username': 'rolandorojas@five.com',
              'password': '123456'
          }).respond(200);
          

          loginComponent.login()
          .then(response=>{
              expect(response.status).to.equal(200);
              expect(_$cookies.get('auth_token')).to.equal('2032820asdfka0s0293ma002');
              expect(_mockLocation.url).to.equal('/ap/al/skills');
          });

          httpBackend.flush();
      });
 
  });

});


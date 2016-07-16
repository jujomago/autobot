'use strict';

describe('Component: LoginController', function() {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('stateMock'));

  var scope;
  var loginComponent;
  var state;
  var httpBackend;
  var endPointUrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function(
    _$httpBackend_,
    $http,
    $componentController,
    $rootScope,
    $state,
    appConfig) {
      httpBackend = _$httpBackend_;
    
      scope = $rootScope.$new();
      state = $state;
      loginComponent = $componentController('login', {
        $http: $http,
        $scope: scope
      });

      if(appConfig.apiUri){
          endPointUrl=appConfig.apiUri;
      }
         

      httpBackend.whenGET(url=>(url.indexOf('.html') !== -1)).respond(200);
      
  }));


  afterEach(function () {
     httpBackend.verifyNoOutstandingRequest();
  });
  

  describe('#controller login ',()=>{   
      it('=> User logged in Successfully with credentials',()=>{       

  
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
              expect(response.data).to.equal('2032820asdfka0s0293ma002');
          });

          httpBackend.flush();
      });    
 
  });
  describe('#controller logout',()=>{
      it('=> User should logout successfully',()=>{
         
         httpBackend.whenGET(endPointUrl+'/auth/logout').respond(200,
           'The user was logged out succesfully'
         );

          loginComponent.logout()
          .then(response=>{
              expect(response.status).to.equal(200);
              expect(response.data).to.equal('The user was logged out succesfully');
          });

          httpBackend.flush();
      });

  });
});


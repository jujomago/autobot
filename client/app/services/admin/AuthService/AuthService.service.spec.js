'use strict';

describe('Service: AuthService', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var AuthService, httpBackend,endPointUrl;

  beforeEach(inject(function (_AuthService_,$httpBackend,appConfig) {
    AuthService = _AuthService_;
    httpBackend=$httpBackend;

    if(appConfig.apiUri){
        endPointUrl=appConfig.apiUri;
    }



  }));
  
  afterEach(function () {
    httpBackend.verifyNoOutstandingRequest();
  });

  it('should do something', function () {
    expect(!!AuthService).to.equal(true);
  });

  describe('#login',()=>{
      it('=> User logged in Successfully with credentials',()=>{
           let credentials={
              'username': 'admin@autoboxcorp.com',
              'password': 'Password1'
          };

         httpBackend.whenPOST(endPointUrl+'/auth/login',credentials).respond(200,
           '2032820asdfka0s0293ma002'
         );

          AuthService.login(credentials)
          .then(response=>{
              expect(response.status).to.equal(200);
              expect(response.data).to.equal('2032820asdfka0s0293ma002');
          });

          httpBackend.flush();
      });

      it('=> User cant login with error credentials',()=>{
           let credentials={
              'username': 'other@autoboxcorp.com',
              'password': 'antoherpass'
          };

         httpBackend.whenPOST(endPointUrl+'/auth/login',credentials).respond(400,
           'Login or password is incorrect or user is not active'
         );

          AuthService.login(credentials)
          .then(response=>{            
              expect(response.status).to.equal(400);
              expect(response.data).to.equal('Login or password is incorrect or user is not active');
          });

          httpBackend.flush();
      });

  });

  describe('#loginApplication',()=>{
      it('=> User logged in Successfully with credentials F9',()=>{
          let credentials = {
            'partnerId': 'f9',
            'appName': 'al',
            'username': 'rolandorojas@five.com',
            'password': '123456'
          };

         httpBackend.whenPOST(endPointUrl+'/admin/users/auth',credentials).respond(200,
           null
         );

          AuthService.loginApplication(credentials)
          .then(response=>{
              expect(response.status).to.equal(200);
              expect(response.data).to.equal(null);
          });

          httpBackend.flush();
      });

      it('=> User cant login with error credentials F9',()=>{
          let credentials = {
            'partnerId': 'f9',
            'appName': 'al',
            'username': 'rolandorojas@five.com',
            'password': '123456'
          };

         httpBackend.whenPOST(endPointUrl+'/admin/users/auth',credentials).respond(500,
           {statusText: 'Internal server error'}
         );

        AuthService.loginApplication(credentials)
          .then(response => {
            expect(response.data.statusText).to.equal('Internal server error');
            expect(response.status).to.equal(500);
          });
         

          httpBackend.flush();
      });

  });
  describe('#logout',()=>{
      it('=> User should logout successfully',()=>{
         
         httpBackend.whenGET(endPointUrl+'/auth/logout').respond(200,
           'The user was logged out succesfully'
         );

          AuthService.logout()
          .then(response=>{
              expect(response.status).to.equal(200);
              expect(response.data).to.equal('The user was logged out succesfully');
          });

          httpBackend.flush();
      });

  });



});

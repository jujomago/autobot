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

  describe('#register',()=>{
      it('Register new Autobox user',()=>{
           let registerInfo = {
             'email':'admin2@autoboxcorp.com',
             'company': 'Autobox',
             'firstname': 'User Name',
             'lastname':'LastName'
           };

         httpBackend.whenPOST(endPointUrl+'/admin/temporaryusers',registerInfo).respond(201,
           '2032820asdfka0s0293ma002'
         );
          AuthService.register(registerInfo)
          .then(response=>{
              expect(response.status).to.equal(201);
          });
          httpBackend.flush();
      });

      it('user already created',()=>{
         let registerInfo = {
            'email':'admin2@autoboxcorp.com',
            'company': 'Autobox',
            'firstname': 'User Name',
            'lastname':'LastName'
         };
         httpBackend.whenPOST(endPointUrl+'/admin/temporaryusers',registerInfo).respond(400,
           'The email is already in use in an existent account.'
         );
          AuthService.register(registerInfo)
          .then(response=>{
              expect(response.status).to.equal(400);
              expect(response.data).to.equal('The email is already in use in an existent account.');
          });
          httpBackend.flush();
      });
  });

  describe('#getCompanies',()=>{
      it('Get companies list to be showed into the dropdown',()=>{
         httpBackend.whenPOST(endPointUrl+'/admin/companies').respond(200,
           '2032820asdfka0s0293ma002'
         );
          AuthService.getCompanies()
          .then(response=>{
              expect(response.status).to.equal(200);
          });
          httpBackend.flush();
      });
  });

describe('#renewToken',()=>{
      it('=>Token is renewed succesfully, status 200',()=>{

         let oldToken='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyaWQiOiI1N2MyMjRmN2FlZjdiYzEwMDBjM2U3MmEiLCJkb21haW4iOiJhdXRvYm94Y29ycC5jb20iLC';
         let newToken='j2NIl4nXwxItHYCQ6QYCHneTa5Hb8gSXhvXrsXrVxYLIqtu820gIUqEMYjKb09TmbQfegi3cJN8stfrqyDYWmHvFQC99kd08vS3gvjxA6IC6_aLPGYkiCQ86cRYO_Ahb2QBNCFHA_f_DPJb0O';
         httpBackend.whenPUT(endPointUrl+'/auth/refresh-token',{token:oldToken}).respond(200,newToken);

          AuthService.renewToken(oldToken)
          .then(response=>{
              expect(response.status).to.equal(200);
              expect(response.data).to.equal(newToken);
          });

          httpBackend.flush();
      });

      it('=> Invaid token for renew, status 401',()=>{

         let oldToken='eyJ0eXAiOiJKV1QiLCJhbGcsiOiJSUzI1NiJ9.eyJ1c2VyaWQiOiI1N2MyMjRmN2FlZjdiYzEwMDBjM2U3MmEiLCJkb21haW4iOiJhdXRvYm94Y29ycC5jb20iLC';

         httpBackend.whenPUT(endPointUrl+'/auth/refresh-token',{token:oldToken}).respond(401,{
            'error': 'invalid token'
         });

          AuthService.renewToken(oldToken)
          .then(response=>{
              expect(response.status).to.equal(401);
              expect(response.data.error).to.equal('invalid token');
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

      it('=> User should get a logout error',()=>{

         httpBackend.whenGET(endPointUrl+'/auth/logout').respond(500,
           {statusText: 'Internal server error'}
         );

          AuthService.logout()
          .then(response=>{
              expect(response.status).to.equal(500);
              expect(response.data.statusText).to.equal('Internal server error');
          });

          httpBackend.flush();
      });

  });



});

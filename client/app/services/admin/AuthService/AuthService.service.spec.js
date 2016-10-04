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


  describe('#login',()=>{
      it('=> User logged in Successfully with credentials',()=>{
           let credentials={
              'username': 'admin@autoboxcorp.com',
              'password': 'Password1'
          };

         httpBackend.whenPOST(endPointUrl+'/auth/login',credentials).respond(200,
           'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyaWQiOiI1N2VkMTVhZDVhODBlMzAwMTBlMzRmZmQiLCJkb21haW4iOiJhdXRvYm94Y29ycC5jb20iLCJqdGkiOiJkYWFiMmNiMC04NjQ3LTExZTYtOTdlYi00ZDk5ZTgwYTc2MjciLCJzdWIiOiJ1c2VyZGFhYjJjYjAtODY0Ny0xMWU2LTk3ZWItNGQ5OWU4MGE3NjI3IiwiaWF0IjoxNDc1MTU1Mzg1LCJleHAiOjE0NzUxNTg5ODV9.ngdyU9uPVvrtlpzWnE8hQnC7hYf2HNzC3F5811g4T4jzrWN_WOHnHnR6zPJiFDo054jbGjSj0kzS0cuyLRCOp422O9LxP2r0LbapTEaGjwKZb-kr_KgwJyMsIMe4Rq9OhepQMpCV1Jr9jlmPm0lVhTNeKmQDWdOaY1IRinaKy-AsMgcP8mHVn8b7XPT7GUrwYYdKJrLmqzGMSoEzyDEIk-bUSFgcLiQ4axcdR5T_W_r7LaEIURFGdWPJgyoPqxJkNdKOwK9aawMOlQfeGASg14nMkDTfdyZMmuNhlhnnjhT1V_0yhHRXIavevn5HeR3259S7eZfwgkbvIzAhbVSX7A'
         );

          AuthService.login(credentials)
          .then(response=>{
              expect(response.status).to.equal(200);
              expect(response.data).to.equal('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyaWQiOiI1N2VkMTVhZDVhODBlMzAwMTBlMzRmZmQiLCJkb21haW4iOiJhdXRvYm94Y29ycC5jb20iLCJqdGkiOiJkYWFiMmNiMC04NjQ3LTExZTYtOTdlYi00ZDk5ZTgwYTc2MjciLCJzdWIiOiJ1c2VyZGFhYjJjYjAtODY0Ny0xMWU2LTk3ZWItNGQ5OWU4MGE3NjI3IiwiaWF0IjoxNDc1MTU1Mzg1LCJleHAiOjE0NzUxNTg5ODV9.ngdyU9uPVvrtlpzWnE8hQnC7hYf2HNzC3F5811g4T4jzrWN_WOHnHnR6zPJiFDo054jbGjSj0kzS0cuyLRCOp422O9LxP2r0LbapTEaGjwKZb-kr_KgwJyMsIMe4Rq9OhepQMpCV1Jr9jlmPm0lVhTNeKmQDWdOaY1IRinaKy-AsMgcP8mHVn8b7XPT7GUrwYYdKJrLmqzGMSoEzyDEIk-bUSFgcLiQ4axcdR5T_W_r7LaEIURFGdWPJgyoPqxJkNdKOwK9aawMOlQfeGASg14nMkDTfdyZMmuNhlhnnjhT1V_0yhHRXIavevn5HeR3259S7eZfwgkbvIzAhbVSX7A');
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

         let oldToken='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyaWQiOiI1N2VkMTVhZDVhODBlMzAwMTBlMzRmZmQiLCJkb21haW4iOiJhdXRvYm94Y29ycC5jb20iLCJqdGkiOiJkYWFiMmNiMC04NjQ3LTExZTYtOTdlYi00ZDk5ZTgwYTc2MjciLCJzdWIiOiJ1c2VyZGFhYjJjYjAtODY0Ny0xMWU2LTk3ZWItNGQ5OWU4MGE3NjI3IiwiaWF0IjoxNDc1MTU1Mzg1LCJleHAiOjE0NzUxNTg5ODV9.ngdyU9uPVvrtlpzWnE8hQnC7hYf2HNzC3F5811g4T4jzrWN_WOHnHnR6zPJiFDo054jbGjSj0kzS0cuyLRCOp422O9LxP2r0LbapTEaGjwKZb-kr_KgwJyMsIMe4Rq9OhepQMpCV1Jr9jlmPm0lVhTNeKmQDWdOaY1IRinaKy-AsMgcP8mHVn8b7XPT7GUrwYYdKJrLmqzGMSoEzyDEIk-bUSFgcLiQ4axcdR5T_W_r7LaEIURFGdWPJgyoPqxJkNdKOwK9aawMOlQfeGASg14nMkDTfdyZMmuNhlhnnjhT1V_0yhHRXIavevn5HeR3259S7eZfwgkbvIzAhbVSX7A';
         let newToken='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyaWQiOiI1N2VkMTVhZDVhODBlMzAwMTBlMzRmZmQiLCJkb21haW4iOiJhdXRvYm94Y29ycC5jb20iLCJqdGkiOiI4NDVjNTYzMC04NjQ4LTExZTYtOTdlYi00ZDk5ZTgwYTc2MjciLCJzdWIiOiJ1c2VyODQ1YzU2MzAtODY0OC0xMWU2LTk3ZWItNGQ5OWU4MGE3NjI3IiwiaWF0IjoxNDc1MTU1NjY5LCJleHAiOjE0NzUxNTkyNjl9.cdMtf_jLhh32-Ndp7d53fmxpWjq2n1DzG5Ys5-SkKocMlIIO3P-afzrVSCIz2dTe83EeyeCpmc_tDblygn5yCZsy2gRTCq-x7AAIRT8gyA9Cwj-derGwc9ytZ_DassnPrxNSJkHZAjP0xMf8JXFcFMggQslnP_aBByKTthNW92xQDRHfojCSH18IAiHXW0zz8i-RoTf_MgFVh25c1E8WCQxFS-7R0Tl6BTLsG-KKrZJmPhtnVcWnylicR9nedONNjJfe_fG1CA47M4P3Wr2VXLEUi4ypQTGH158c2wbuqjTa8AMa9qWMWioWfBN6xCKAaCkD8rNWTooGpIGMOTs-Sw';
         httpBackend.whenPUT(endPointUrl+'/auth/refresh-token',{token:oldToken}).respond(200,newToken);

          AuthService.renewToken(oldToken)
          .then(response=>{
              expect(response.status).to.equal(200);
              expect(response.data).to.equal(newToken);
          });

          httpBackend.flush();
      });

      it('=> Invaid token for renew, status 401',()=>{
         let oldToken='eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyaWQiOiI1N2VkMTVhZDVhODBlMzAwMTBlMzRmZmQiLCJkb21haW4iOiJhdXRvYm94Y29ycC5jb20iLCJqdGkiOiJkYWFiMmNiMC04NjQ3LTExZTYtOTdlYi00ZDk5ZTgwYTc2MjciLCJzdWIiOiJ1c2VyZGFhYjJjYjAtODY0Ny0xMWU2LTk3ZWItNGQ5OWU4MGE3NjI3IiwiaWF0IjoxNDc1MTU1Mzg1LCJleHAiOjE0NzUxNTg5ODV9.ngdyU9uPVvrtlpzWnE8hQnC7hYf2HNzC3F5811g4T4jzrWN_WOHnHnR6zPJiFDo054jbGjSj0kzS0cuyLRCOp422O9LxP2r0LbapTEaGjwKZb-kr_KgwJyMsIMe4Rq9OhepQMpCV1Jr9jlmPm0lVhTNeKmQDWdOaY1IRinaKy-AsMgcP8mHVn8b7XPT7GUrwYYdKJrLmqzGMSoEzyDEIk-bUSFgcLiQ4axcdR5T_W_r7LaEIURFGdWPJgyoPqxJkNdKOwK9aawMOlQfeGASg14nMkDTfdyZMmuNhlhnnjhT1V_0yhHRXIavevn5HeR3259S7eZfwgkbvIzAhbVSX7A';

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

  describe('#getProfile',()=>{
      it('should get the current user profile',()=>{

         httpBackend.whenGET(endPointUrl+ '/admin/users/profile').respond(200,
           {
            email: 'user@test.com',
            firstname: 'user',
            avatar: null,
            role: 'admin'
           }
         );
          AuthService.getProfile()
          .then(response=>{
              expect(response.statusCode).to.equal(200);
              expect(response.data.email).to.equal('user@test.com');
              expect(response.data.firstname).to.equal('user');
              expect(response.data.avatar).to.equal(null);
              expect(response.data.role).to.equal('admin');
              expect(response.errorMessage).to.equal(null);
          });

          httpBackend.flush();
      });

      it('should get a internal server error',()=>{

         httpBackend.whenGET(endPointUrl+ '/admin/users/profile').respond(500,
           {error: 'Internal server error'}
         );

          AuthService.getProfile()
          .then(response=>{
              expect(response.data).to.equal(null);
              expect(response.statusCode).to.equal(500);
              expect(response.errorMessage).to.equal('Internal server error');
          });

          httpBackend.flush();
      });

  });



});

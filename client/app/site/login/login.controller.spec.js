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
     _$cookies.remove('auth_token');
     httpBackend.verifyNoOutstandingRequest();
  });
  

  describe('#controllerlogin',()=>{   
      it('=> User logged in Successfully with credentials and redirected to /ap/al/lists',()=>{       

  
          loginComponent.username='admin@autoboxcorp.com';
          loginComponent.password='Password1';  

          httpBackend.whenPOST(endPointUrl+'/auth/login',{
            'username': loginComponent.username,
            'password': loginComponent.password
          }).respond('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyaWQiOiI1N2VkMTVhZDVhODBlMzAwMTBlMzRmZmQiLCJkb21haW4iOiJhdXRvYm94Y29ycC5jb20iLCJqdGkiOiI4NDVjNTYzMC04NjQ4LTExZTYtOTdlYi00ZDk5ZTgwYTc2MjciLCJzdWIiOiJ1c2VyODQ1YzU2MzAtODY0OC0xMWU2LTk3ZWItNGQ5OWU4MGE3NjI3IiwiaWF0IjoxNDc1MTU1NjY5LCJleHAiOjE0NzUxNTkyNjl9.cdMtf_jLhh32-Ndp7d53fmxpWjq2n1DzG5Ys5-SkKocMlIIO3P-afzrVSCIz2dTe83EeyeCpmc_tDblygn5yCZsy2gRTCq-x7AAIRT8gyA9Cwj-derGwc9ytZ_DassnPrxNSJkHZAjP0xMf8JXFcFMggQslnP_aBByKTthNW92xQDRHfojCSH18IAiHXW0zz8i-RoTf_MgFVh25c1E8WCQxFS-7R0Tl6BTLsG-KKrZJmPhtnVcWnylicR9nedONNjJfe_fG1CA47M4P3Wr2VXLEUi4ypQTGH158c2wbuqjTa8AMa9qWMWioWfBN6xCKAaCkD8rNWTooGpIGMOTs-Sw');

          loginComponent.login()
          .then(response=>{
              expect(response.status).to.equal(200);
              expect(_$cookies.get('auth_token')).to.equal('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyaWQiOiI1N2VkMTVhZDVhODBlMzAwMTBlMzRmZmQiLCJkb21haW4iOiJhdXRvYm94Y29ycC5jb20iLCJqdGkiOiI4NDVjNTYzMC04NjQ4LTExZTYtOTdlYi00ZDk5ZTgwYTc2MjciLCJzdWIiOiJ1c2VyODQ1YzU2MzAtODY0OC0xMWU2LTk3ZWItNGQ5OWU4MGE3NjI3IiwiaWF0IjoxNDc1MTU1NjY5LCJleHAiOjE0NzUxNTkyNjl9.cdMtf_jLhh32-Ndp7d53fmxpWjq2n1DzG5Ys5-SkKocMlIIO3P-afzrVSCIz2dTe83EeyeCpmc_tDblygn5yCZsy2gRTCq-x7AAIRT8gyA9Cwj-derGwc9ytZ_DassnPrxNSJkHZAjP0xMf8JXFcFMggQslnP_aBByKTthNW92xQDRHfojCSH18IAiHXW0zz8i-RoTf_MgFVh25c1E8WCQxFS-7R0Tl6BTLsG-KKrZJmPhtnVcWnylicR9nedONNjJfe_fG1CA47M4P3Wr2VXLEUi4ypQTGH158c2wbuqjTa8AMa9qWMWioWfBN6xCKAaCkD8rNWTooGpIGMOTs-Sw');
              expect(_mockLocation.url).to.equal('/ap/al/lists');
          });

          httpBackend.flush();
      });  

      it('=> User logged in Successfully with credentials and redirected to default page (underconstruction) empty url param',()=>{       

          _mockStateParams.url = null;
          loginComponent.username='admin@autoboxcorp.com';
          loginComponent.password='Password1';  

          httpBackend.whenPOST(endPointUrl+'/auth/login',{
            'username': loginComponent.username,
            'password': loginComponent.password
          }).respond('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyaWQiOiI1N2VkMTVhZDVhODBlMzAwMTBlMzRmZmQiLCJkb21haW4iOiJhdXRvYm94Y29ycC5jb20iLCJqdGkiOiI4NDVjNTYzMC04NjQ4LTExZTYtOTdlYi00ZDk5ZTgwYTc2MjciLCJzdWIiOiJ1c2VyODQ1YzU2MzAtODY0OC0xMWU2LTk3ZWItNGQ5OWU4MGE3NjI3IiwiaWF0IjoxNDc1MTU1NjY5LCJleHAiOjE0NzUxNTkyNjl9.cdMtf_jLhh32-Ndp7d53fmxpWjq2n1DzG5Ys5-SkKocMlIIO3P-afzrVSCIz2dTe83EeyeCpmc_tDblygn5yCZsy2gRTCq-x7AAIRT8gyA9Cwj-derGwc9ytZ_DassnPrxNSJkHZAjP0xMf8JXFcFMggQslnP_aBByKTthNW92xQDRHfojCSH18IAiHXW0zz8i-RoTf_MgFVh25c1E8WCQxFS-7R0Tl6BTLsG-KKrZJmPhtnVcWnylicR9nedONNjJfe_fG1CA47M4P3Wr2VXLEUi4ypQTGH158c2wbuqjTa8AMa9qWMWioWfBN6xCKAaCkD8rNWTooGpIGMOTs-Sw');

          

          loginComponent.login()
          .then(response=>{
              expect(response.status).to.equal(200);
              expect(_$cookies.get('auth_token')).to.equal('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyaWQiOiI1N2VkMTVhZDVhODBlMzAwMTBlMzRmZmQiLCJkb21haW4iOiJhdXRvYm94Y29ycC5jb20iLCJqdGkiOiI4NDVjNTYzMC04NjQ4LTExZTYtOTdlYi00ZDk5ZTgwYTc2MjciLCJzdWIiOiJ1c2VyODQ1YzU2MzAtODY0OC0xMWU2LTk3ZWItNGQ5OWU4MGE3NjI3IiwiaWF0IjoxNDc1MTU1NjY5LCJleHAiOjE0NzUxNTkyNjl9.cdMtf_jLhh32-Ndp7d53fmxpWjq2n1DzG5Ys5-SkKocMlIIO3P-afzrVSCIz2dTe83EeyeCpmc_tDblygn5yCZsy2gRTCq-x7AAIRT8gyA9Cwj-derGwc9ytZ_DassnPrxNSJkHZAjP0xMf8JXFcFMggQslnP_aBByKTthNW92xQDRHfojCSH18IAiHXW0zz8i-RoTf_MgFVh25c1E8WCQxFS-7R0Tl6BTLsG-KKrZJmPhtnVcWnylicR9nedONNjJfe_fG1CA47M4P3Wr2VXLEUi4ypQTGH158c2wbuqjTa8AMa9qWMWioWfBN6xCKAaCkD8rNWTooGpIGMOTs-Sw');
              expect(_mockLocation.url).to.equal('/ap/dashboard');
          });

          httpBackend.flush();
      });
      it('=> User logged in Successfully with credentials and redirected to default page (underconstruction) corrupted URL',()=>{       

          _mockStateParams.url = 'CORRUPTED_URL';
          loginComponent.username='admin@autoboxcorp.com';
          loginComponent.password='Password1';  

          httpBackend.whenPOST(endPointUrl+'/auth/login',{
            'username': loginComponent.username,
            'password': loginComponent.password
          }).respond('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyaWQiOiI1N2VkMTVhZDVhODBlMzAwMTBlMzRmZmQiLCJkb21haW4iOiJhdXRvYm94Y29ycC5jb20iLCJqdGkiOiI4NDVjNTYzMC04NjQ4LTExZTYtOTdlYi00ZDk5ZTgwYTc2MjciLCJzdWIiOiJ1c2VyODQ1YzU2MzAtODY0OC0xMWU2LTk3ZWItNGQ5OWU4MGE3NjI3IiwiaWF0IjoxNDc1MTU1NjY5LCJleHAiOjE0NzUxNTkyNjl9.cdMtf_jLhh32-Ndp7d53fmxpWjq2n1DzG5Ys5-SkKocMlIIO3P-afzrVSCIz2dTe83EeyeCpmc_tDblygn5yCZsy2gRTCq-x7AAIRT8gyA9Cwj-derGwc9ytZ_DassnPrxNSJkHZAjP0xMf8JXFcFMggQslnP_aBByKTthNW92xQDRHfojCSH18IAiHXW0zz8i-RoTf_MgFVh25c1E8WCQxFS-7R0Tl6BTLsG-KKrZJmPhtnVcWnylicR9nedONNjJfe_fG1CA47M4P3Wr2VXLEUi4ypQTGH158c2wbuqjTa8AMa9qWMWioWfBN6xCKAaCkD8rNWTooGpIGMOTs-Sw');
          

          loginComponent.login()
          .then(response=>{
              expect(response.status).to.equal(200);
              expect(_$cookies.get('auth_token')).to.equal('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1c2VyaWQiOiI1N2VkMTVhZDVhODBlMzAwMTBlMzRmZmQiLCJkb21haW4iOiJhdXRvYm94Y29ycC5jb20iLCJqdGkiOiI4NDVjNTYzMC04NjQ4LTExZTYtOTdlYi00ZDk5ZTgwYTc2MjciLCJzdWIiOiJ1c2VyODQ1YzU2MzAtODY0OC0xMWU2LTk3ZWItNGQ5OWU4MGE3NjI3IiwiaWF0IjoxNDc1MTU1NjY5LCJleHAiOjE0NzUxNTkyNjl9.cdMtf_jLhh32-Ndp7d53fmxpWjq2n1DzG5Ys5-SkKocMlIIO3P-afzrVSCIz2dTe83EeyeCpmc_tDblygn5yCZsy2gRTCq-x7AAIRT8gyA9Cwj-derGwc9ytZ_DassnPrxNSJkHZAjP0xMf8JXFcFMggQslnP_aBByKTthNW92xQDRHfojCSH18IAiHXW0zz8i-RoTf_MgFVh25c1E8WCQxFS-7R0Tl6BTLsG-KKrZJmPhtnVcWnylicR9nedONNjJfe_fG1CA47M4P3Wr2VXLEUi4ypQTGH158c2wbuqjTa8AMa9qWMWioWfBN6xCKAaCkD8rNWTooGpIGMOTs-Sw');
              expect(_mockLocation.url).to.equal('/ap/dashboard');
          });

          httpBackend.flush();
      });
      it('should respond error message when there is an error server', function () {
        loginComponent.username='admin@autoboxcorp.com';
          loginComponent.password='Password1';  

          httpBackend.whenPOST(endPointUrl+'/auth/login',{
            'username': loginComponent.username,
            'password': loginComponent.password
          }).respond({error: {errorMessage:'Unable to connect to the server. Please try again', status:-1}});
        
        loginComponent.login()
        .then(data =>{               
          expect(data.data.error.errorMessage).to.equal('Unable to connect to the server. Please try again');
          expect(data.data.error.status).to.equal(-1);
        });
         httpBackend.flush();
  });
 
  });

});


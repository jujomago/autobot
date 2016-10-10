'use strict';

describe('Component: ActivationController', function() {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('stateMock'));

  var scope;
  var activactionComponent;
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
      _$cookies = $cookies;
      scope = $rootScope.$new();
      activactionComponent = $componentController('activation', {
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
     _$cookies.remove('auth_token');
     httpBackend.verifyNoOutstandingRequest();
  });


  describe('activation an user',()=>{
      it('activation an account',()=>{         
          activactionComponent.activationCode='abcd1234567';                   
          httpBackend.whenGET(endPointUrl+'/admin/temporaryusers/'+activactionComponent.activationCode).respond({data: 
            {firstname:'peter',
             lastname:'smith',
             company:{},
             email:'peter@autoboxcorp.com',
             activactionCode:'abcd1234567'
          },status:200});           
          activactionComponent.activation()
          .then(response=>{   
              expect(response.status).to.equal(200);   
              expect(response.data.firstname).to.equal('peter'); 
              expect(response.data.lastname).to.equal('smith');
              expect(response.data.email).to.equal('peter@autoboxcorp.com');
              expect(response.data.activactionCode).to.equal('abcd1234567');            
          });
          httpBackend.flush();
      });
  });

});



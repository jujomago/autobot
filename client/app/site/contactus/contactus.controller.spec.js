'use strict';

describe('Component: ContactusComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var ContactusComponent;
  var scope;
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
      scope = $rootScope.$new();
      ContactusComponent = $componentController('contactus', {
        $http: $http,
        $scope: scope      
      });
      if(appConfig.apiUri){
          endPointUrl=appConfig.apiUri;

      }
      httpBackend.whenGET(url=>(url.indexOf('.html') !== -1)).respond(201);
  }));
  afterEach(function () {
     httpBackend.verifyNoOutstandingRequest();
  });
  it('should ...', function () {
    expect(1).to.equal(1);
  });
});

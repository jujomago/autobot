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
         endPointUrl=appConfig.apiUri+'/admin/services/contact';

      }
      httpBackend.whenGET(url=>(url.indexOf('.html') !== -1)).respond(201);
  }));
  afterEach(function () {
     httpBackend.verifyNoOutstandingRequest();
  });
  describe('#sendmail',()=>{
    it('should send mail successfully, status 200', function () {   

      let MockMailData={
          firstName:'testName',
          lastName:'testLastName',
          businessEmail:'testmail@gmail.com',
          phone:'+1 445-555-5556',
          company:'somecompany',
          message:'some message'
      };

      ContactusComponent.cform=MockMailData;
      httpBackend.whenPOST(endPointUrl,MockMailData).respond(200);

      expect(ContactusComponent.submitText).to.equal('Submit');


      ContactusComponent.sendmail()
      .then(response => {
          expect(ContactusComponent.message).to.eql({ show: true, type:'success',text:'Email Sent Successfully', expires:4000 });
          expect(response.data).to.equal(null);
          expect(response.errorMessage).to.equal(null);
          expect(response.statusCode).to.equal(200);
      });
       httpBackend.flush();
    });
    it('should return error sending a email, error 500', function () {
        let MockMailData={
          firstName:'testName',
          lastName:'testLastName',
          businessEmail:'testmail@gmail.com',
          phone:'+1 445-555-5556',
          company:'somecompany',
          message:'some message'
      };

       ContactusComponent.cform=MockMailData;
       httpBackend.whenPOST(endPointUrl,MockMailData).respond(500, {error: 'Some error from Server'});
       ContactusComponent.sendmail()
       .then(error => {
          expect(ContactusComponent.message).to.eql({ show: true, type:'danger', text: error.errorMessage , expires:4000 });
          expect(error.data).to.equal(null);
          expect(error.errorMessage).to.equal('Some error from Server');
          expect(error.statusCode).to.equal(500);
      });
      httpBackend.flush();
    });
  });
});

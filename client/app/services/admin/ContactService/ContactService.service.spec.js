'use strict';

describe('Service: ContactService', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var ContactService,_endPointUrl,_$httpBackend,MockMailData;
  beforeEach(inject(function (_ContactService_, $httpBackend, appConfig) { 
    ContactService = _ContactService_;
    _$httpBackend = $httpBackend;
    if(appConfig.apiUri){
        _endPointUrl=appConfig.apiUri+'/admin/services/contact';
    }
    MockMailData={
        firstName:'testName',
        lastName:'testLastName',
        businessEmail:'testmail@gmail.com',
        phone:'+1 445-555-5556',
        company:'somecompany',
        message:'some message'
    };
  }));
  afterEach(function () {
    _$httpBackend.verifyNoOutstandingRequest();
  });
  describe('#sendmail',()=>{
    it('should send mail successfully, status 200', function () {    
      _$httpBackend.whenPOST(_endPointUrl,MockMailData).respond(200);
      ContactService.sendmail(MockMailData)
      .then(response => {
          expect(response.data).to.equal(null);
          expect(response.errorMessage).to.equal(null);
          expect(response.statusCode).to.equal(200);
      });
      _$httpBackend.flush();
    });
    it('should return error sending a email, error 500', function () {
       _$httpBackend.whenPOST(_endPointUrl,MockMailData).respond(500, {error: 'Some error from Server'});
       ContactService.sendmail(MockMailData)
       .catch(error => {
          expect(error.data).to.equal(null);
          expect(error.errorMessage).to.equal('Some error from Server');
          expect(error.statusCode).to.equal(500);
      });
      _$httpBackend.flush();
    });
  });

});

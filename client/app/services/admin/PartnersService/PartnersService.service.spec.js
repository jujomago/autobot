'use strict';

describe('Service:PartnersService', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  var _PartnersService, _endPointUrl, _$httpBackend;
  beforeEach(inject(function (_PartnersService_,  $httpBackend, appConfig) {
    _PartnersService = _PartnersService_;
    _$httpBackend = $httpBackend;
    if(appConfig.apiUri){
        _endPointUrl=appConfig.apiUri+'/admin/users';
    }   
  }));

  afterEach(function () {
      _$httpBackend.verifyNoOutstandingRequest();
  });
  describe('#partnerLogin', () => {
    it('should return 200 if login', function () {
        _$httpBackend.whenPOST(_endPointUrl+'/auth').respond(200, 'Success');
        _PartnersService.partnerLogin()
        .then(result => {
            expect(result.data).to.equal('Success');
            expect(result.statusCode).to.equal(200);
            expect(result.errorMessage.length).to.equal(0);
        });
        _$httpBackend.flush();
    });
    it('should return unexpected server error', function () {
        _$httpBackend.whenPOST(_endPointUrl+'/auth').respond(500, {error: 'Internal Server Error'});
        _PartnersService.partnerLogin()
        .catch(error => {
            expect(error.errorMessage).to.equal('Internal Server Error');
            expect(error.statusCode).to.equal(500);
            expect(error.data).to.equal(null);
        });
        _$httpBackend.flush();
    });

  });

  describe('#getLastUsedPartnerAccount', () => {
    it('should return 200 if login', function () {
        let partnerName = 'f9';
        _$httpBackend.whenPOST(_endPointUrl+'/auth').respond(200, 'Success');
        _PartnersService.getLastUsedPartnerAccount()
        .then(result => {
            expect(result.data).to.equal('Success');
            expect(result.statusCode).to.equal(200);
            expect(result.errorMessage.length).to.equal(0);
        });
        _$httpBackend.flush();
    });
    it('should return unexpected server error', function () {
        _$httpBackend.whenPOST(_endPointUrl+'/auth').respond(500, {error: 'Internal Server Error'});
        _PartnersService.getLastUsedPartnerAccount()
        .catch(error => {
            expect(error.errorMessage).to.equal('Internal Server Error');
            expect(error.statusCode).to.equal(500);
            expect(error.data).to.equal(null);
        });
        _$httpBackend.flush();
    });

  });

});

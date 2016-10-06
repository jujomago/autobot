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
  describe('#get Account for a partner', () => {
    it('should return at least one account', function () {
        _$httpBackend.whenGET(_endPointUrl+'/partners/f9/accounts').respond({username:'XYZ', avatar:null});
        _PartnersService.getPartnerAccounts('f9')
        .then(result => {
            expect(result.data.length).to.not.equal(0);
        });
        _$httpBackend.flush();
    });
    it('should return unexpected server error', function () {
        _$httpBackend.whenGET(_endPointUrl+'/partners/f9/accounts').respond(500, {error: 'Internal Server Error'});
        _PartnersService.getPartnerAccounts('f9')
        .catch(error => {
            expect(error.errorMessage).to.equal('Internal Server Error');
            expect(error.statusCode).to.equal(500);
            expect(error.data).to.equal(null);
        });
        _$httpBackend.flush();
    });

  });

  describe('#partnerAccountSubscription', () => {
    it('should return 200 if account registered successfully', function () {
        _$httpBackend.whenPOST(_endPointUrl+'/partner/app').respond(200, 'Success');
        let mockInfo = {
          partnerId: 'f9',
          appName: 'al',
          credentials: {
            username: 'test@test.com'
          }
        };
        _PartnersService.partnerAccountSubscription(mockInfo)
        .then(result => {
            expect(result.data).to.equal('Success');
            expect(result.statusCode).to.equal(200);
            expect(result.errorMessage.length).to.equal(0);
        });
        _$httpBackend.flush();
    });
    it('should return unexpected server error', function () {
        _$httpBackend.whenPOST(_endPointUrl+'/partner/app').respond(500, {error: 'Internal Server Error'});
        let mockInfo = {
          partnerId: 'f9',
          appName: 'al',
          credentials: {
            username: 'test@test.com'
          }
        };
        _PartnersService.partnerAccountSubscription(mockInfo)
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
        _$httpBackend.whenGET(_endPointUrl+'/partner/f9/lastusedaccount').respond(200, {username: 'five9_1@five.com'});
        _PartnersService.getLastUsedPartnerAccount(partnerName)
        .then(result => {
            expect(result.data.username).to.equal('five9_1@five.com');
            expect(result.statusCode).to.equal(200);
            expect(result.errorMessage.length).to.equal(0);
        });
        _$httpBackend.flush();
    });
    it('should return unexpected server error', function () {
        let partnerName = 'f9';
        _$httpBackend.whenGET(_endPointUrl+'/partner/f9/lastusedaccount').respond(500, {error: 'Internal Server Error'});
        _PartnersService.getLastUsedPartnerAccount(partnerName)
        .catch(error => {
            expect(error.errorMessage).to.equal('Internal Server Error');
            expect(error.statusCode).to.equal(500);
            expect(error.data).to.equal(null);
        });
        _$httpBackend.flush();
    });

  });

});

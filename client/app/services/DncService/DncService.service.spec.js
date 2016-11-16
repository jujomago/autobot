'use strict';

describe('Service: DncService', function () {
  let _$httpBackend;
  let _endPointUrl;
  let DncService;
  // load the service's module
  beforeEach(module('fakiyaMainApp'));
  beforeEach(inject(function (_DncService_, $httpBackend, appConfig) {
    DncService = _DncService_;
    _$httpBackend = $httpBackend;
    if(appConfig.apiUri){
        _endPointUrl=appConfig.apiUri+'/dnc/scrubs';
    }
  }));

  describe('#getDNC',()=>{
    it('should return filtered phones', function () {
      _$httpBackend.whenGET(_endPointUrl+'/ABC123?phonelist=9876543210,9876543211').respond(200,[{phone: '9876543210', status: 'P'}, {phone: '9876543211', status: 'C'}]);
      DncService.getDNC('ABC123', '9876543210,9876543211')
      .then(response => {
          expect(null).to.not.equal(response);
          expect(response.data.length).to.equal(2);
          expect(response.statusCode).to.equal(200);
          expect(response.data).to.deep.equal([{phone: '9876543210', status: 'P'}, {phone: '9876543211', status: 'C'}]);
      _$httpBackend.flush();
      });
    });
    it('should return submenu error', function () {
      _$httpBackend.whenGET(_endPointUrl+'/ABC123?phonelist=9876543210,9876543211').respond(500, {error: 'Internal Server Error'});
      DncService.getDNC('ABC123', '9876543210,9876543211')
      .catch(error => {
          expect(null).to.not.equal(error);
          expect(undefined).to.not.equal(error);
          expect(error.statusCode).to.equal(500);
          expect(error.errorMessage).to.equal('Internal Server Error');
      });
      _$httpBackend.flush();
    });
  });

});

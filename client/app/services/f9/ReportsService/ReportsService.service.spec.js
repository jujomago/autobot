'use strict';

describe('Service: ReportsService', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));
  let _endPointUrl, _$httpBackend;
  // instantiate service
  var ReportsService;
  beforeEach(inject(function (_ReportsService_, $httpBackend ,appConfig) {
    ReportsService = _ReportsService_;
    _$httpBackend = $httpBackend;
    if(appConfig.apiUri){
        _endPointUrl=appConfig.apiUri+'/f9/reports';
    }
  }));

  describe('#sendCallLogRequest', function () {
    it('should return identifier', function () {
      _$httpBackend.whenGET(_endPointUrl+'/calllogs?startDate=2016-04-23T21:00:00.000-07:00&endDate=2016-04-25T21:00:00.000-07:00').respond(200,{identifier: 'ABC-123-DEF-456'});
      ReportsService.sendCallLogRequest('2016-04-23T21:00:00.000-07:00', '2016-04-25T21:00:00.000-07:00')
      .then(response => {
          expect(null).to.not.equal(response);
          expect(response.data.identifier).to.equal('ABC-123-DEF-456');
          expect(response.statusCode).to.equal(200);
      });
      _$httpBackend.flush();  
    });
    it('should return server error', function () {
        _$httpBackend.whenGET(_endPointUrl+'/calllogs?startDate=2016-04-23T21:00:00.000-07:00&endDate=2016-04-25T21:00:00.000-07:00').respond(500, {error: 'Internal Server Error'});
      ReportsService.sendCallLogRequest('2016-04-23T21:00:00.000-07:00', '2016-04-25T21:00:00.000-07:00')
      .catch(error => {
          expect(null).to.not.equal(error);
          expect(undefined).to.not.equal(error);
          expect(error.statusCode).to.equal(500);
          expect(error.errorMessage).to.equal('Internal Server Error');
      });
      _$httpBackend.flush();
    });
  });

  describe('#isRunning', function () {
    it('should return false', function () {
      _$httpBackend.whenGET(_endPointUrl+'/ABC-123-DEF-456?timeout=500').respond(200,false);
      ReportsService.isRunning('ABC-123-DEF-456')
      .then(response => {
          expect(null).to.not.equal(response);
          expect(response.data).to.equal(false);
          expect(response.statusCode).to.equal(200);
      });
      _$httpBackend.flush();  
    });
    it('should return server error', function () {
        _$httpBackend.whenGET(_endPointUrl+'/ABC-123-DEF-456?timeout=500').respond(500, {error: 'Internal Server Error'});
      ReportsService.isRunning('ABC-123-DEF-456')
      .catch(error => {
          expect(null).to.not.equal(error);
          expect(undefined).to.not.equal(error);
          expect(error.statusCode).to.equal(500);
          expect(error.errorMessage).to.equal('Internal Server Error');
      });
      _$httpBackend.flush();
    });
  });

    describe('#getCallLogResult', function () {
    it('should return false', function () {
      _$httpBackend.whenGET(_endPointUrl+'/calllogs/ABC-123-DEF-456').respond(200,{return: [{'CALL ID': '123456','AGENT': 'Juan Perez','DISPOSITION': 'NONE'}, {'CALL ID': '123789','AGENT': 'Pedro Garcia','DISPOSITION': 'HOLD'}]});
      ReportsService.getCallLogResult('ABC-123-DEF-456')
      .then(response => {
          expect(null).to.not.equal(response);
          expect(response.data.return).to.deep.equal([{'CALL ID': '123456','AGENT': 'Juan Perez','DISPOSITION': 'NONE'}, {'CALL ID': '123789','AGENT': 'Pedro Garcia','DISPOSITION': 'HOLD'}]);
          expect(response.statusCode).to.equal(200);
      });
      _$httpBackend.flush();  
    });
    it('should return server error', function () {
        _$httpBackend.whenGET(_endPointUrl+'/calllogs/ABC-123-DEF-456').respond(500, {error: 'Internal Server Error'});
      ReportsService.getCallLogResult('ABC-123-DEF-456')
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

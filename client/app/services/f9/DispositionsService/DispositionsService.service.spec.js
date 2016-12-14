'use strict';

describe('Service:DispositionsService', function () {

    // load the service's module
    beforeEach(module('fakiyaMainApp'));

    // instantiate service
    var DispositionsService, httpBackend;
    var endPointUrl;
    var mockDispositionData = {
      'return': [
        { 'name': 'Disposition1', 'description': '' },
        { 'name': 'Disposition2', 'description': 'some description' },
        { 'name': 'Disposition3', 'description': 'another description' },
        { 'name': 'Disposition4', 'description': 'description' },
        { 'name': 'Disposition5', 'description': '' }]
    };
    beforeEach(inject(function (_DispositionsService_, $httpBackend, appConfig) {
        DispositionsService = _DispositionsService_;
        httpBackend = $httpBackend;
        if(appConfig.apiUri){
            endPointUrl=appConfig.apiUri+'/f9/admin/dispositions';
        }        
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingRequest();
    });
    describe('#getDispositions', () => {
      it('should return dispositions', function () {
          httpBackend.whenGET(endPointUrl).respond(mockDispositionData);
          DispositionsService.getDispositions().then(dispositions => {
              expect(null).to.not.equal(dispositions);
              expect(undefined).to.not.equal(dispositions);
              expect(undefined).to.not.equal(dispositions.data);
              expect(dispositions.data.length).to.equal(5);
              expect(dispositions.statusCode).to.equal(200);
              expect(dispositions.errorMessage.length).to.equal(0);
          });
          httpBackend.flush();
      });

      it('should return empty disposition array', function () {
          httpBackend.whenGET(endPointUrl).respond({
              return: []
          });
          DispositionsService.getDispositions().then(dispositions => {
              expect(null).to.not.equal(dispositions);
              expect(undefined).to.not.equal(dispositions);
              expect(undefined).to.not.equal(dispositions.data);
              expect(dispositions.data.length).to.equal(0);
              expect(dispositions.statusCode).to.equal(200);
              expect(dispositions.errorMessage.length).to.equal(0);
          });
          httpBackend.flush();
      });
      it('should return error in get dispositions', function () {
          httpBackend.whenGET(endPointUrl).respond(500, {error: 'Internal Server Error'});
          DispositionsService.getDispositions()
          .catch(response => {
              expect(response.statusCode).to.equal(500);
              expect(response.errorMessage).to.equal('Internal Server Error');
          });
          httpBackend.flush();
      });
    });
    describe('#deleteDisposition', () => {
      it('should remove a disposition', function () {
          httpBackend.whenDELETE(endPointUrl+'/Disposition1').respond(204,null);
          let disposition = {name: 'Disposition1'};
          DispositionsService.deleteDisposition(disposition)
          .then(result => {
              expect(null).to.not.equal(result);
              expect(undefined).to.not.equal(result);
              expect(null).to.equal(result.data);
              expect(result.statusCode).to.equal(204);
              expect(result.errorMessage.length).to.equal(0);
          });
          httpBackend.flush();
      });
      it('should not remove a disposition asociated with campaigns or system disposition', function () {
          httpBackend.whenDELETE(endPointUrl+'/Disposition1').respond(403,{
            error: 'the explicit error'
          });
          let disposition = {name: 'Disposition1'};
          DispositionsService.deleteDisposition(disposition)
          .catch(result => {
              expect(result.statusCode).to.equal(403);
              expect(result.errorMessage).to.equal('the explicit error');
          });
          httpBackend.flush();
      });
    });
    describe('#createDisposition', () => {

        it('=> should return statusCode 201, Created Ok', () => {
          
            let newDisposition = {
                    agentMustCompleteWorksheet: false,
                    agentMustConfirm: false,
                    description: 'Agent session',
                    name: 'Test insert a new disposition',
                    resetAttemptsCounter: false,
                    sendEmailNotification: false,
                    sendIMNotification: false,
                    trackAsFirstCallResolution: false,
                    type: 'RedialNumber',
                    typeParameters: {
                    allowChangeTimer: false,
                    attempts: '1',
                    timer: {
                      days: 0,
                      hours: 0,
                      minutes: 0,
                      seconds: 0
                    },
                    useTimer: false
                    }
                };

          httpBackend.whenPOST(endPointUrl).respond(201, null);

          DispositionsService.createDisposition(newDisposition)
            .then(response => {  
              expect(response).to.be.property('statusCode');
              expect(response.statusCode).to.equal(201);
              expect(response.data).to.equal(null);
              expect(response.errorMessage).to.equal(null);
            });

          httpBackend.flush();
        });
        it('=> should return error statusCode 500', () => {
          
            let newDisposition = {
                    agentMustCompleteWorksheet: false,
                    agentMustConfirm: false,
                    description: 'Agent session',
                    name: 'Test insert a new disposition',
                    resetAttemptsCounter: false,
                    sendEmailNotification: false,
                    sendIMNotification: false,
                    trackAsFirstCallResolution: false,
                    type: 'RedialNumber',
                    typeParameters: {
                    allowChangeTimer: false,
                    attempts: '1',
                    timer: {
                      days: 0,
                      hours: 0,
                      minutes: 0,
                      seconds: 0
                    },
                    useTimer: false
                    }
                };

          httpBackend.whenPOST(endPointUrl).respond(500, {data: 'Internal Server Error',status: 500});

          DispositionsService.createDisposition(newDisposition)
            .then(response => {  
              expect(response.statusCode).to.equal(500);
              expect(response.errorMessage).to.equal('Internal Server Error');
            });

          httpBackend.flush();
        });

    });
    describe('#updateDisposition', () => {

        it('=> should return statusCode 200, Updated Ok', () => {
          
            let disposition = {
                    agentMustCompleteWorksheet: false,
                    agentMustConfirm: false,
                    description: 'Agent session',
                    name: 'Test insert a new disposition',
                    oldName: 'OldName',
                    resetAttemptsCounter: false,
                    sendEmailNotification: false,
                    sendIMNotification: false,
                    trackAsFirstCallResolution: false,
                    type: 'RedialNumber',
                    typeParameters: {
                    allowChangeTimer: false,
                    attempts: '1',
                    timer: {
                      days: 0,
                      hours: 0,
                      minutes: 0,
                      seconds: 0
                    },
                    useTimer: false
                    }
                };

          httpBackend.whenPUT(endPointUrl+'/OldName').respond(200, null);

          DispositionsService.updateDisposition(disposition)
            .then(response => {  
              expect(response).to.be.property('statusCode');
              expect(response.statusCode).to.equal(200);
              expect(response.data).to.equal(null);
              expect(response.errorMessage).to.equal(null);
            });

          httpBackend.flush();
        });
        it('=> should return error statusCode 500', () => {
          
            let newDisposition = {
                    agentMustCompleteWorksheet: false,
                    agentMustConfirm: false,
                    description: 'Agent session',
                    name: 'Test insert a new disposition',
                    oldName: 'OldName',
                    resetAttemptsCounter: false,
                    sendEmailNotification: false,
                    sendIMNotification: false,
                    trackAsFirstCallResolution: false,
                    type: 'RedialNumber',
                    typeParameters: {
                    allowChangeTimer: false,
                    attempts: '1',
                    timer: {
                      days: 0,
                      hours: 0,
                      minutes: 0,
                      seconds: 0
                    },
                    useTimer: false
                    }
                };

          httpBackend.whenPUT(endPointUrl+'/OldName')
          .respond(500, {error: 'Internal Server Error',status: 500});

          DispositionsService.updateDisposition(newDisposition)
            .then(response => {  
              expect(response.statusCode).to.equal(500);
              expect(response.errorMessage).to.equal('Internal Server Error');
            });

          httpBackend.flush();
        });

    });
    describe('#getDisposition', () => {
        it('=> should return statusCode 200, get disposition', () => {
          
            let disposition = {
                    agentMustCompleteWorksheet: false,
                    agentMustConfirm: false,
                    description: 'Agent session',
                    name: 'dispositionName',
                    resetAttemptsCounter: false,
                    sendEmailNotification: false,
                    sendIMNotification: false,
                    trackAsFirstCallResolution: false,
                    type: 'RedialNumber',
                    typeParameters: {
                    allowChangeTimer: false,
                    attempts: '1',
                    timer: {
                      days: 0,
                      hours: 0,
                      minutes: 0,
                      seconds: 0
                    },
                    useTimer: false
                    }
                };

          httpBackend.whenGET(endPointUrl+'/'+disposition.name).respond(200,{return: disposition});

          DispositionsService.getDisposition(disposition.name)
            .then(response => {  
              expect(response).to.be.property('statusCode');
              expect(response.statusCode).to.equal(200);
              expect(response.data).to.not.equal(null);
              expect(response.data.name).to.equal('dispositionName');
              expect(response.data.description).to.equal('Agent session');
              expect(response.data.typeParameters.timer).to.be.instanceOf(Object);
            });

          httpBackend.flush();
        });
        it('=> should return error statusCode 500', () => {
          

          httpBackend.whenGET(endPointUrl+'/undefinedDisposition').respond(500, {data: 'Internal Server Error',status: 500});

          DispositionsService.getDisposition('undefinedDisposition')
            .then(response => {  
              expect(response.statusCode).to.equal(500);
              expect(response.error).to.equal('Internal Server Error');
            });

          httpBackend.flush();
        });
    });
});

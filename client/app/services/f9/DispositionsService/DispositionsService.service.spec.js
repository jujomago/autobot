'use strict';

describe('Service: DispositionsService', function () {

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
            endPointUrl=appConfig.apiUri+'/f9/dispositions';
        }        
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingRequest();
    });

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
    it('should remove a disposition', function () {
        httpBackend.whenDELETE(endPointUrl+'/Disposition1').respond(204,null);
        let disposition = {name: 'Disposition1'};
        DispositionsService.deleteDisposition(disposition).then(result => {
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
          statusCode: 403,
          from: 'error from controller endpoint',
          body: 'the explicit error'
        });
        let disposition = {name: 'Disposition1'};
        DispositionsService.deleteDisposition(disposition).then(result => {
            expect(null).to.not.equal(result);
            expect(undefined).to.not.equal(result);
            expect(result.statusCode).to.equal(403);
            expect(result.errorMessage.length).to.not.equal(0);
            expect(result.errorMessage).to.equal('the explicit error');
        });
        httpBackend.flush();
    });

});
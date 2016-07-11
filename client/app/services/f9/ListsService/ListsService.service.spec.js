'use strict';

describe('Service: ListsService', function () {

    // load the service's module
    beforeEach(module('fakiyaMainApp'));

    // instantiate service
    var ListsService, httpBackend;
    var endPointUrl;

    beforeEach(inject(function (_ListsService_, $httpBackend, appConfig) {
        ListsService = _ListsService_;
        httpBackend = $httpBackend;
        if(appConfig.apiUri){
            endPointUrl=appConfig.apiUri+'/f9/lists';
        }        
    }));

    afterEach(function () {
        //httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should return lists', function () {
        httpBackend.whenGET(endPointUrl).respond({
            return: [{ 'name': 'List1', 'size': 10},
                { 'name': 'List2', 'size': 20 },
                { 'name': 'List3', 'size': 30}]
        });

        ListsService.getLists().then(lists => {
            expect(null).to.not.equal(lists);
            expect(undefined).to.not.equal(lists);
            expect(undefined).to.not.equal(lists.data);
            expect(lists.data.length).to.equal(3);
            expect(lists.statusCode).to.equal(200);
            expect(lists.errorMessage.length).to.equal(0);
        });
        httpBackend.flush();
    });

    it('should return empty list', function () {
        httpBackend.whenGET(endPointUrl).respond({
            return: []
        });
        ListsService.getLists().then(lists => {
            expect(null).to.not.equal(lists);
            expect(undefined).to.not.equal(lists);
            expect(undefined).to.not.equal(lists.data);
            expect(lists.data.length).to.equal(0);
            expect(lists.statusCode).to.equal(200);
            expect(lists.errorMessage.length).to.equal(0);
        });
        httpBackend.flush();
    });
    it('should remove a list', function () {
        httpBackend.whenDELETE(endPointUrl+'/List1').respond(204,null);
        let list = {name: 'List1'};
        ListsService.deleteList(list).then(result => {
            expect(null).to.not.equal(result);
            expect(undefined).to.not.equal(result);
            expect(null).to.equal(result.data);
            expect(result.statusCode).to.equal(204);
            expect(result.errorMessage.length).to.equal(0);
        });
        httpBackend.flush();
    });
    it('should not remove a list asociated with campaigns', function () {
        httpBackend.whenDELETE(endPointUrl+'/ListWithCampaigns').respond(403,{
          statusCode: 403,
          from: 'error from controller endpoint',
          body: 'the explicit error'
        });
        let list = {name: 'ListWithCampaigns'};
        ListsService.deleteList(list).then(result => {
            expect(null).to.not.equal(result);
            expect(undefined).to.not.equal(result);
            expect(result.statusCode).to.equal(403);
            expect(result.errorMessage.length).to.not.equal(0);
        });
        httpBackend.flush();
    });

});
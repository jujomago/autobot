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
    it('should create a new list', function () {
        httpBackend.whenPOST(endPointUrl).respond(201, null);
        let list = {listName: 'test'};
        ListsService.createList(list)
        .then(result => {
            expect(result.data).to.equal(null);
            expect(result.statusCode).to.equal(201);
            expect(result.errorMessage.length).to.equal(0);
        });
        httpBackend.flush();
    });
    it('should obtain error in create a new list', function () {
        httpBackend.whenPOST(endPointUrl).respond(500, {body: 'Error in create list'});
        let list = {listName: 'test'};
        ListsService.createList(list).then(result => {
            expect(result).to.not.equal(null);
            expect(result.statusCode).to.equal(500);
            expect(result.errorMessage).to.equal('Error in create list');
        });
        httpBackend.flush();
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


    it('should return one list', function () {
        httpBackend.whenGET(endPointUrl+ '/AgentList').respond({
            return: { 'name': 'AgentList', 'size': 6}
        });

        ListsService.getList('AgentList').then(list => {
            expect(null).to.not.equal(list);
            expect(undefined).to.not.equal(list);
            expect(undefined).to.not.equal(list.data);
            expect(list.statusCode).to.equal(200);
            expect(list.data.name).to.equal('AgentList');
            expect(list.data.size).to.equal(6);
            expect(list.errorMessage.length).to.equal(0);
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

    it('should add a list of contacts to testAutobox list', function () {
        let contact = {listName: 'testAutobox', importData: {values: [{item: ['202-555-0195']}]} };
        let listUpdateSettings = {fieldsMapping: [{columnNumber: 1, fieldName: 'number1', key: true}],cleanListBeforeUpdate: false, crmAddMode: 'ADD_NEW', crmUpdateMode: 'DONT_UPDATE', listAddMode: 'ADD_FIRST'};
        contact.listUpdateSettings = listUpdateSettings;
        httpBackend.whenPOST(endPointUrl+'/'+contact.listName+'/records').respond(201, {return: {identifier: 'ad-fg-js'}});
        ListsService.addContacts(contact)
        .then(result => {
            expect(result.statusCode).to.equal(201);
            expect(result.errorMessage.length).to.equal(0);
            expect(result.data.return.identifier).should.not.equal(null);
        });
        httpBackend.flush();
    });

    it('should delete a list of contacts from testAutobox list', function () {
        let contact = {listName: 'testAutobox', importData: {values: [{item: ['202-555-0195']}]}};
        let listDeleteSettings = {fieldsMapping: [{columnNumber: 1, fieldName: 'number1', key: true}], listDeleteMode: 'DELETE_ALL'};
        contact.listDeleteSettings = listDeleteSettings;
        httpBackend.whenDELETE(endPointUrl+'/'+contact.listName+'/records').respond(200, {return: {identifier: 'ad-fg-js'}});
        ListsService.deleteContacts(contact)
        .then(result => {
            expect(result.statusCode).to.equal(200);
            expect(result.errorMessage.length).to.equal(0);
            expect(result.data.return.identifier).should.not.equal(null);
        });
        httpBackend.flush();
    });
    it('should return running status', function () {
        httpBackend.whenGET(endPointUrl+'/importrunning/123-abc-456').respond(200, {
            return: false
        });
        ListsService.isImportRunning('123-abc-456').then(result => {
            expect(null).to.not.equal(result);
            expect(undefined).to.not.equal(result);
            expect(undefined).to.not.equal(result.data);
            expect(result.data).to.equal(false);
            expect(result.statusCode).to.equal(200);
            expect(result.errorMessage.length).to.equal(0);
        });
        httpBackend.flush();
    });
    it('should return running status after waitTime', function () {
        httpBackend.whenGET(endPointUrl+'/importrunning/123-abc-456?waitTime=5').respond(200, {
            return: false
        });
        ListsService.isImportRunning('123-abc-456', 5).then(result => {
            expect(null).to.not.equal(result);
            expect(undefined).to.not.equal(result);
            expect(undefined).to.not.equal(result.data);
            expect(result.data).to.equal(false);
            expect(result.statusCode).to.equal(200);
            expect(result.errorMessage.length).to.equal(0);
        });
        httpBackend.flush();
    });

    it('should return result', function () {
        httpBackend.whenGET(endPointUrl+'/importresults/123-abc-456').respond(200, {
            return: {
                        uploadDuplicatesCount: '0',
                        uploadErrorsCount: '2',
                        listRecordsDeleted: '5',
                        listRecordsInserted: '0'
                    }
        });
        ListsService.getResult('123-abc-456').then(result => {
            expect(null).to.not.equal(result);
            expect(undefined).to.not.equal(result);
            expect(undefined).to.not.equal(result.data);
            expect(result.data.uploadDuplicatesCount).to.equal('0');
            expect(result.data.uploadErrorsCount).to.equal('2');
            expect(result.data.listRecordsDeleted).to.equal('5');
            expect(result.data.listRecordsInserted).to.equal('0');
            expect(result.statusCode).to.equal(200);
            expect(result.errorMessage.length).to.equal(0);
        });
        httpBackend.flush();
    });
});
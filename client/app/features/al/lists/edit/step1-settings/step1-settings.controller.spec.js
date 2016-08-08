'use strict';

describe('Controller: SettingsComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var SettingsComponent, listService,endPointUrl,_$httpBackend,_$scope, _$state;
  var mockModal;
  beforeEach(inject(function ($componentController, $rootScope, $state, $httpBackend, $stateParams, _ListsService_, appConfig) {
    _$scope = $rootScope.$new();
    _$httpBackend = $httpBackend;
    listService = _ListsService_;
    if (appConfig.apiUri) {
      endPointUrl = appConfig.apiUri + '/f9/lists';
    }
    _$state = $state;
    mockModal= {open: sinon.stub()};
    var _AlertMessage = function(){
      mockModal.open();
    };
    SettingsComponent = $componentController('al.lists.settings', {
      $scope: _$scope,
      $stateParams: { message: null },
      $state: _$state,
      ListsService: listService,
      AlertMessage: _AlertMessage
    });
    _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
  }));

  describe('#getList', () => {
    it('get single list', () => {
      _$httpBackend.whenGET(endPointUrl + '/List1').respond(200, {
            return: { 'name': 'List1', 'size': 7}
        });
      let item = 'List1';
      expect(SettingsComponent.found).to.equal(false);
      SettingsComponent.getList(item)
        .then(response => {
          expect(SettingsComponent.found).to.equal(true);
          expect(SettingsComponent.list.name).to.equal('List1');
          expect(SettingsComponent.list.size).to.equal(7);
          expect(response.statusCode).to.equal(200);

        });
      _$httpBackend.flush();
    });
    it('could not find a single list', () => {
      _$httpBackend.whenGET(endPointUrl + '/List1').respond(404, {
            body: 'List not found'
        });
      let item = 'List1';
      expect(SettingsComponent.found).to.equal(false);
      SettingsComponent.getList(item)
        .then(response => {
          expect(SettingsComponent.found).to.equal(false);
          expect(response.statusCode).to.equal(404);
        });
      _$httpBackend.flush();
    });
  });


  describe('#getResult', () => {
    beforeEach(function () {
      _$httpBackend.whenGET(endPointUrl+'/contacts/result/running/123-abc-456?waitTime=300').respond(200, {
            return:  false
      }); 
      _$httpBackend.whenGET(endPointUrl + '/testList').respond(200, {
            return: { 'name': 'testList', 'size': 7}
        });
    });
    it('get result nothing changed update', () => {
      _$httpBackend.whenGET(endPointUrl+'/contacts/result/123-abc-456').respond(200, {
            return: {
                        uploadDuplicatesCount: '5',
                        uploadErrorsCount: '0',
                        listRecordsDeleted: '0',
                        crmRecordsInserted: '0',
                        crmRecordsUpdated: '0',
                        listRecordsInserted: '0',
                        warningsCount: null
                    }
      });
      SettingsComponent.getResult('123-abc-456','testList', true)
        .then(response => {
          expect(response.summaryMessage.title).to.equal('Summary');
          expect(response.summaryMessage.body).to.equal('Update for list "testList" has been succesfully completed.');
          expect(response.summaryMessage.list[0]).to.equal('Nothing was changed during the update.');
          expect(response.summaryMessage.list[1]).to.equal('5 lines with duplicate keys found');
          expect(response.summaryMessage.list[2]).to.equal('5 ERRORS FOUND');
          expect(response.summaryMessage.list[3]).to.equal('No warnings found');
          expect(response.statusCode).to.equal(200);
          expect(mockModal.open.calledOnce).to.equal(true);
        });

      _$httpBackend.flush();
    });
    it('get delete result with warnings', () => {
      _$httpBackend.whenGET(endPointUrl+'/contacts/result/123-abc-456').respond(200, {
            return: {
                        uploadDuplicatesCount: '7',
                        uploadErrorsCount: '0',
                        listRecordsDeleted: '7',
                        crmRecordsInserted: '0',
                        crmRecordsUpdated: '0',
                        listRecordsInserted: '0',
                        warningsCount: {entry: [{value: 'warning 1'},{value: 'warning 2'}]}
                    }
      });
      SettingsComponent.getResult('123-abc-456','testList', false)
        .then(response => {
          expect(response.summaryMessage.title).to.equal('Summary');
          expect(response.summaryMessage.body).to.equal('Delete for list "testList" has been succesfully completed.');
          expect(response.summaryMessage.list[0]).to.equal('Call List records deleted: 7');
          expect(response.summaryMessage.list[1]).to.equal('7 lines with duplicate keys found');
          expect(response.summaryMessage.list[2]).to.equal('7 ERRORS FOUND');
          expect(response.summaryMessage.list[3]).to.equal('2 WARNINGS FOUND');
          expect(response.statusCode).to.equal(200);
          expect(mockModal.open.calledOnce).to.equal(true);
        });

      _$httpBackend.flush();
    });
    it('get update and delete result without warnings and errors', () => {
      _$httpBackend.whenGET(endPointUrl+'/contacts/result/123-abc-456').respond(200, {
            return: {
                        uploadDuplicatesCount: '0',
                        uploadErrorsCount: '0',
                        listRecordsDeleted: '7',
                        crmRecordsInserted: '0',
                        crmRecordsUpdated: '5',
                        listRecordsInserted: '3',
                        warningsCount: null
                    }
      });
      SettingsComponent.getResult('123-abc-456','testList', true)
        .then(response => {
          expect(response.summaryMessage.title).to.equal('Summary');
          expect(response.summaryMessage.body).to.equal('Update for list "testList" has been succesfully completed.');
          expect(response.summaryMessage.list[0]).to.equal('Contact Records updated: 5, Call List records deleted: 7, Call List records inserted: 3');
          expect(response.summaryMessage.list[1]).to.equal('No errors found');
          expect(response.summaryMessage.list[2]).to.equal('No warnings found');
         expect(response.statusCode).to.equal(200);
         expect(mockModal.open.calledOnce).to.equal(true);
        });

      _$httpBackend.flush();
    });
  });

  describe('#nextStep', () => {
    it('should set update settings', () => {
      SettingsComponent.selectUpdate();
      SettingsComponent.nextStep();
      let settings=SettingsComponent.settingsParams.listUpdateSettings;
      expect(SettingsComponent.settingsParams.skipPreview).to.equal(false);
      expect(settings.listAddMode).to.equal('ADD_FIRST');
      expect(settings.crmAddMode).to.equal('ADD_NEW');
      expect(settings.crmUpdateMode).to.equal('UPDATE_FIRST');
      expect(settings.cleanListBeforeUpdate).to.equal(false);
    });
    it('should set delete settings', () => {
      SettingsComponent.selectDelete();
      SettingsComponent.nextStep();
      let settings=SettingsComponent.settingsParams.listDeleteSettings;
      expect(settings.listDeleteMode).to.equal('DELETE_ALL');
    });
  });
  describe('#sendFile', () => {
    it('should load a csv file', () => {
      _$httpBackend.whenGET('data:text/csv;base64,77u/Zm9vLGJhcg0KYWFhLGJiYg==').respond(200, 'demo, csv, text');
      SettingsComponent.csvFile = {data: 'data:text/csv;base64,77u/Zm9vLGJhcg0KYWFhLGJiYg=='};
      let promise = SettingsComponent.sendFile();
      expect(SettingsComponent.confirm).to.equal(true);
      promise
      .then(() => {
          expect(SettingsComponent.confirm).to.equal(false);
          expect(SettingsComponent.settingsParams.csvData).to.equal('demo, csv, text');
          
        });
      _$httpBackend.flush();
    });
    it('should receive an error from csv file', () => {
      _$httpBackend.whenGET('data:text/csv;base64,77u/Zm9vLGJhcg0KYWFhLGJiYg==').respond(403, 'Couldn\'t open csv file');
      SettingsComponent.csvFile = {data: 'data:text/csv;base64,77u/Zm9vLGJhcg0KYWFhLGJiYg=='};
      let promise = SettingsComponent.sendFile();
      expect(SettingsComponent.confirm).to.equal(true);
      promise
      .then(() => {
          expect(SettingsComponent.confirm).to.equal(false);
          expect(SettingsComponent.message.show).to.equal(true); 
          expect(SettingsComponent.message.type).to.equal('danger');
          expect(SettingsComponent.message.text).to.equal('Couldn\'t open csv file');         
        });
      _$httpBackend.flush();
    });
  });
});

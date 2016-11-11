'use strict';

describe('Component:al.lists.list', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));
  var mockModal;
  var ListComponent, _Global, _$httpBackend;
  var state, listService, sandbox, window, endPointUrl;

  var mockListData = {
    'return': [
      { 'name': 'List1', 'size': 0 },
      { 'name': 'List2', 'size': 10 },
      { 'name': 'List3', 'size': 0 },
      { 'name': 'List4', 'size': 26 },
      { 'name': 'List5', 'size': 5 },
      { 'name': 'List6', 'size': 20 }]
  };


  // Initialize the controller
  beforeEach(inject(function ($componentController, $httpBackend, $state, $stateParams, $window, _ListsService_, ConfirmAsync, Global, appConfig) {
    _$httpBackend = $httpBackend;
    state = $state;
    _Global = Global;
    listService = _ListsService_;
    window = $window;

    sandbox = sinon.sandbox.create();
    mockModal= {open: sinon.stub()};
    var _AlertMessage = function(){
      mockModal.open();
    };
    if (appConfig.apiUri) {
      endPointUrl = appConfig.apiUri + '/f9/lists';
    }

    ListComponent = $componentController('al.lists.list', {
      Global: _Global,
      $stateParams: { message: null, name: 'List6' },
      $state: state,
      ListsService: listService,
      AlertMessage: _AlertMessage,
      selectedRow: { listName: 'List6' }
    });

    _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
  }));

  afterEach(function () {
    _$httpBackend.verifyNoOutstandingRequest();
    sandbox.restore();
  });



  describe('#deleteList', () => {
    it('list deleted should return 204 statusCode', () => {

      _$httpBackend.whenDELETE(endPointUrl + '/List1').respond(204, null);
      sandbox.stub(window, 'confirm').returns(true);

      let item = { name: 'List1' };

      ListComponent.deleteList(item, 5)
        .then(response => {
          expect(ListComponent.toggleListRow).to.equal(-1);
          expect(response.statusCode).to.equal(204);

        });

      expect(window.confirm.calledOnce).to.equal(true);

      _$httpBackend.flush();
    });

    it('list should not be deleted return 403 statusCode', () => {
      _$httpBackend.whenDELETE(endPointUrl + '/List2').respond(403, {
          error: 'The object cannot be deleted. Please verify it is not being used by any campaign.'
        });

      sandbox.stub(window, 'confirm').returns(true);

      let item = { name: 'List2' };

      ListComponent.deleteList(item, 5)
        .then(response => {
          expect(ListComponent.toggleListRow).to.equal(-1);
          expect(response.statusCode).to.equal(403);
          expect(ListComponent.message.type).to.equal('danger');
          expect(ListComponent.message.text).to.equal('The object cannot be deleted. Please verify it is not being used by any campaign.');
        });

      expect(window.confirm.calledOnce).to.equal(true);
      _$httpBackend.flush();
    });

  });

  describe('#getLists', () => {

    it('List of Lists Returned', () => {
      _$httpBackend.whenGET(endPointUrl).respond(mockListData);
      expect(ListComponent.message.show).to.equal(false);
      expect(ListComponent.lists).to.have.lengthOf(0);
      var getLists = ListComponent.getLists();

      getLists.then(_lists => {
        expect(_lists).to.be.an.instanceOf(Array);
        expect(_lists).to.have.lengthOf(6);
        expect(ListComponent.currentPage).to.equal(1);
        expect(ListComponent.reverse).to.equal(false);
      });

      _$httpBackend.flush();
    });
    it('Lists Returned with new list created and selected', () => {
      _$httpBackend.whenGET(endPointUrl).respond(mockListData);

      expect(ListComponent.message.show).to.equal(false);
      expect(ListComponent.lists).to.have.lengthOf(0);

      var getLists = ListComponent.getLists();

      getLists.then(_lists => {
        ListComponent.selectedRow = {listName:'List6'};
        ListComponent.$stateParams = {message: true, name: 'List6'};
        expect(_lists).to.be.an.instanceOf(Array);
        expect(_lists).to.have.lengthOf(6);
        expect(ListComponent.selectedRow).to.be.an('object');
        ListComponent.goToSelectedRow();
        expect(ListComponent.reverse).to.equal(false);
      });

      _$httpBackend.flush();
    });
  });

  it('List of Lists Returned but empty', () => {
      _$httpBackend.whenGET(endPointUrl).respond({'return':[]});
      expect(ListComponent.message.show).to.equal(false);
      expect(ListComponent.lists).to.have.lengthOf(0);

      var getLists = ListComponent.getLists();


      getLists.then(_lists => {
        expect(_lists).to.be.an.instanceOf(Array);
        expect(_lists).to.have.lengthOf(0);
        expect(ListComponent.lists).to.have.lengthOf(0);
      });

      _$httpBackend.flush();
    });

  describe('#sortColumn', () => {

    it('param columnName not send, should return false', () => {
      expect(false).to.equal(ListComponent.sortColumn(''));
    });

    it('param columnName send, should return true', () => {
      ListComponent.lists = mockListData.return;
      expect(true).to.equal(ListComponent.sortColumn('name'));
      expect(ListComponent.reverse).to.equal(false);
      expect(ListComponent.lists.length).to.equal(6);
      expect(ListComponent.lists[0].name).to.equal('List1');
      ListComponent.sortColumn('name');
      expect(ListComponent.reverse).to.equal(true);
      expect(ListComponent.lists[0].name).to.equal('List6');
    });

  });

  describe('#filteringBySearch', () => {

    it('Should return true, when searching something', () => {
      ListComponent.originalLists = mockListData.return;
      ListComponent.search.name = 'List1';
      expect(ListComponent.filteringBySearch()).to.equal(true);
      expect(ListComponent.lists.length).to.equal(1);
      expect(ListComponent.lists[0].name).to.equal('List1');
      expect(ListComponent.beginNext).to.equal(0);
      expect(ListComponent.currentPage).to.equal(1);
    });

    it('Should return true, when searching something but empty list', () => {
      ListComponent.lists = mockListData.return;
      ListComponent.search.name = 'not exist';
      expect(ListComponent.filteringBySearch()).to.equal(true);
      expect(ListComponent.lists.length).to.equal(0);
      expect(ListComponent.beginNext).to.equal(0);
      expect(ListComponent.currentPage).to.equal(1);
    });

    it('Should return false, when input search is empty', () => {
      ListComponent.search.name = '';
      expect(ListComponent.filteringBySearch()).to.equal(false);
    });

  });


  describe('#getResult', () => {
    beforeEach(function () {
      _$httpBackend.whenGET(endPointUrl+'/importrunning/123-abc-456?waitTime=300').respond(200, {
            return:  false
      });
    });
    it('get result nothing changed update', () => {
      _$httpBackend.whenGET(endPointUrl+'/importresults/123-abc-456').respond(200, {
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
      _$httpBackend.whenGET(endPointUrl+'/List6').respond(200, {return: [{size: 20}]});
      mockListData.return[5].size = 20;
      ListComponent.lists = mockListData.return;
      let promise = ListComponent.getResult('123-abc-456','List6', true);
      expect(_Global.proccessIsRunning).to.equal(true);
      expect(ListComponent.lists[5].size).to.equal(20);
      promise
        .then(response => {
          expect(response.summaryMessage.title).to.equal('Summary');
          expect(response.summaryMessage.body).to.equal('Update for list "List6" has been succesfully completed.');
          expect(response.summaryMessage.list[0]).to.equal('Nothing was changed during the update.');
          expect(response.summaryMessage.list[1]).to.equal('5 ERRORS FOUND');
          expect(response.summaryMessage.list[2]).to.equal('5 lines with duplicate keys found');
          expect(response.summaryMessage.list[3]).to.equal('No warnings found');
          expect(response.statusCode).to.equal(200);
          expect(mockModal.open.calledOnce).to.equal(true);
          expect(_Global.proccessIsRunning).to.equal(false);
          expect(ListComponent.processedRow).to.equal(null);
          expect(ListComponent.processedRow).to.equal(null);
          expect(ListComponent.lists[5].size).to.equal(20);
        });

      _$httpBackend.flush();
    });
    it('get delete result with warnings', () => {
      _$httpBackend.whenGET(endPointUrl+'/importresults/123-abc-456').respond(200, {
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
      _$httpBackend.whenGET(endPointUrl+'/List6').respond(200, {return: [{size: 13}]});
      mockListData.return[5].size = 20;
      ListComponent.lists = mockListData.return;
      let promise = ListComponent.getResult('123-abc-456','List6', false);
      expect(_Global.proccessIsRunning).to.equal(true);
      expect(ListComponent.lists[5].size).to.equal(20);
      promise
        .then(response => {
          expect(response.summaryMessage.title).to.equal('Summary');
          expect(response.summaryMessage.body).to.equal('Delete for list "List6" has been succesfully completed.');
          expect(response.summaryMessage.list[0]).to.equal('7 Call List records deleted');
          expect(response.summaryMessage.list[1]).to.equal('7 ERRORS FOUND');
          expect(response.summaryMessage.list[2]).to.equal('7 lines with duplicate keys found');
          expect(response.summaryMessage.list[3]).to.equal('warning 1 WARNINGS FOUND');
          expect(response.summaryMessage.list[4]).to.equal('warning 1 lines with import warning found');
          expect(response.statusCode).to.equal(200);
          expect(mockModal.open.calledOnce).to.equal(true);
          expect(_Global.proccessIsRunning).to.equal(false);
          expect(ListComponent.processedRow).to.equal(null);
          expect(ListComponent.lists[5].size).to.equal(13);
        });

      _$httpBackend.flush();
    });
    it('get update and delete result without warnings and errors', () => {
      _$httpBackend.whenGET(endPointUrl+'/importresults/123-abc-456').respond(200, {
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
      _$httpBackend.whenGET(endPointUrl+'/List6').respond(200, {return: [{size: 20}]});
      mockListData.return[5].size = 20;
      ListComponent.lists = mockListData.return;
      let promise =ListComponent.getResult('123-abc-456','List6', true);
      expect(_Global.proccessIsRunning).to.equal(true);
      expect(ListComponent.lists[5].size).to.equal(20);
      promise
        .then(response => {
          expect(response.summaryMessage.title).to.equal('Summary');
          expect(response.summaryMessage.body).to.equal('Update for list "List6" has been succesfully completed.');
          expect(response.summaryMessage.list[0]).to.equal('7 Call List records deleted, 3 Call List records inserted, 5 Contact Records updated');
          expect(response.summaryMessage.list[1]).to.equal('No errors found')
          expect(response.summaryMessage.list[2]).to.equal('No warnings found');
         expect(response.statusCode).to.equal(200);
         expect(mockModal.open.calledOnce).to.equal(true);
         expect(_Global.proccessIsRunning).to.equal(false);
         expect(ListComponent.processedRow).to.equal(null);
         //the index will be -1
         expect(ListComponent.lists[5].size).to.equal(20);
         ListComponent.lists[5].name = 'List6';
        });

      _$httpBackend.flush();
    });
  });


  describe('#changePage', () => {
    it('should change to page 2', () => {
      ListComponent.numPerPage = 5;
      ListComponent.lists = mockListData.return;
      ListComponent.goToProcessedRow('List6');
      expect(ListComponent.currentPage).to.equal(2);
      expect(ListComponent.processedRow).to.equal('List6');
    });
    it('should stay in page 1', () => {
      ListComponent.numPerPage = 10;
      ListComponent.lists = mockListData.return;
      ListComponent.goToProcessedRow('List6');
      expect(ListComponent.currentPage).to.equal(1);
      expect(ListComponent.processedRow).to.equal('List6');
    });

  });


});

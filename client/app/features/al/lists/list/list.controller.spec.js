'use strict';

describe('Component: al.lists.list', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var ListComponent, scope, httpBackend;
  var state, timeout, listService, sandbox, window, endPointUrl;

  var mockListData = {
    'return': [
      { 'name': 'List1', 'size': '0' },
      { 'name': 'List2', 'size': '10' },
      { 'name': 'List3', 'size': '0' },
      { 'name': 'List4', 'size': '26' },
      { 'name': 'List5', 'size': '5' }]
  };


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope, $httpBackend, $state, $stateParams, $timeout, $window, _ListsService_, ConfirmAsync, appConfig) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    state = $state;
    timeout = $timeout;
    listService = _ListsService_;
    window = $window;

    sandbox = sinon.sandbox.create();

    if (appConfig.apiUri) {
      endPointUrl = appConfig.apiUri + '/f9/lists';
    }


    ListComponent = $componentController('al.lists.list', {
      $scope: scope,
      $stateParams: { message: null },
      $state: state,
      $timeout: timeout,
      ListsService: listService
    });

    httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);


  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingRequest();
    sandbox.restore();
  });



  describe('#deleteList', () => {
    it('list deleted should return 204 statusCode', () => {

      httpBackend.whenDELETE(endPointUrl + '/List1').respond(204, null);

      sandbox.stub(window, 'confirm').returns(true);

      let item = { name: 'List1' };

      ListComponent.deleteList(item, 5)
        .then(response => {
          expect(ListComponent.toggleListRow).to.equal(-1);
          expect(response.statusCode).to.equal(204);

        });

      expect(window.confirm.calledOnce).to.equal(true);

      httpBackend.flush();
    });

    it('list should not be deleted return 403 statusCode', () => {
      httpBackend.whenDELETE(endPointUrl + '/List2').respond(403, {
          statusCode: 403,
          from: 'error from controller endpoint',
          body: 'the explicit error'
        });

      sandbox.stub(window, 'confirm').returns(true);

      let item = { name: 'List2' };

      ListComponent.deleteList(item, 5)
        .then(response => {
          expect(ListComponent.toggleListRow).to.equal(-1);
          expect(response.data.statusCode).to.equal(403);
          expect(ListComponent.message.type).to.equal('danger');
          expect(ListComponent.message.text).to.equal('The object cannot be deleted. Please verify it is not being used by any campaign.');
        });

      expect(window.confirm.calledOnce).to.equal(true);
      httpBackend.flush();
    });

  });

  describe('#getLists', () => {

    it('List of Lists Returned', () => {
      httpBackend.whenGET(endPointUrl).respond(mockListData);

      expect(ListComponent.message.show).to.equal(false);
      expect(ListComponent.lists).to.have.lengthOf(0);

      var getLists = ListComponent.getLists();


      getLists.then(_lists => {
        expect(_lists).to.be.an.instanceOf(Array);
        expect(_lists).to.have.lengthOf(5);
        expect(ListComponent.totalItems).to.not.equal(0);
        expect(ListComponent.currentPage).to.equal(1);
        expect(ListComponent.reverse).to.equal(true);
      });

      httpBackend.flush();
    });

  });

  it('List of Lists Returned but empty', () => {
      httpBackend.whenGET(endPointUrl).respond({'return':[]});

      expect(ListComponent.message.show).to.equal(false);
      expect(ListComponent.lists).to.have.lengthOf(0);

      var getLists = ListComponent.getLists();


      getLists.then(_lists => {
        expect(_lists).to.be.an.instanceOf(Array);
        expect(_lists).to.have.lengthOf(0);
        expect(ListComponent.totalItems).to.equal(0);
        expect(ListComponent.filteredLists).to.have.lengthOf(0);
      });

      httpBackend.flush();
    });

  describe('#sortColumn', () => {

    it('param columnName not send, should return false', () => {
      expect(false).to.equal(ListComponent.sortColumn(''));
    });

    it('param columnName send, should return true', () => {
      expect(true).to.equal(ListComponent.sortColumn('somevalue'));
    });

  });

  describe('#filteringBySearch', () => {

    it('Should return true, when searching something', () => {
      ListComponent.search.name = 'some text to search';
      expect(ListComponent.filteringBySearch()).to.equal(true);
      expect(ListComponent.beginNext).to.equal(0);
      expect(ListComponent.currentPage).to.equal(1);
    });

    it('Should return false, when input search is empty', () => {
      ListComponent.search.name = '';
      expect(ListComponent.filteringBySearch()).to.equal(false);
    });

  });





});

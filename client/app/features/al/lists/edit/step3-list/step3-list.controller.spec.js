'use strict';

describe('Component: al.lists.edit', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var ListComponent, scope, httpBackend;
  var state, timeout, listService, sandbox, window, endPointUrl;


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope, $httpBackend, $state, $stateParams, $timeout, $window, $filter, ConfirmAsync, appConfig) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    state = $state;
    timeout = $timeout;
    window = $window;

    sandbox = sinon.sandbox.create();

    if (appConfig.apiUri) {
      endPointUrl = appConfig.apiUri + '/f9/lists';
    }


    ListComponent = $componentController('al.lists.edit.list', {
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
      ListComponent.search = 'daniel2';
      expect(ListComponent.filteringBySearch()).to.equal(true);
      expect(ListComponent.beginNext).to.equal(0);
      expect(ListComponent.currentPage).to.equal(1);
    });

    it('Should return false, when input search is empty', () => {
      ListComponent.search = '';
      expect(ListComponent.filteringBySearch()).to.equal(false);
    });

  });
});

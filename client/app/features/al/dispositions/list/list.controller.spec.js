'use strict';

describe('Component:al.dispositions.list', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));
  var ListComponent, scope, httpBackend;
  var state, timeout, dispositionsService, sandbox, window, endPointUrl;

  var mockDispositionData = {
    'return': [
      { 'name': 'Disposition1', 'description': '' },
      { 'name': 'Disposition2', 'description': 'some description' },
      { 'name': 'Disposition3', 'description': 'another description' },
      { 'name': 'Disposition4', 'description': 'description' },
      { 'name': 'Disposition5', 'description': '' }]
  };
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope, $httpBackend, $state, $stateParams, $timeout, $window, _DispositionsService_, ConfirmAsync, appConfig) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    state = $state;
    timeout = $timeout;
    dispositionsService = _DispositionsService_;
    window = $window;

    sandbox = sinon.sandbox.create();

    if (appConfig.apiUri) {
      endPointUrl = appConfig.apiUri + '/f9/dispositions';
    }


    ListComponent = $componentController('al.dispositions.list', {
      $scope: scope,
      $stateParams: { message: null },
      $state: state,
      $timeout: timeout,
      DispositionsService: dispositionsService
    });

    httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);


  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingRequest();
    sandbox.restore();
  });

  describe('#deleteDisposition', () => {
    it('diposition deleted should return 204 statusCode', () => {

      httpBackend.whenDELETE(endPointUrl + '/Disposition1').respond(204, null);

      sandbox.stub(window, 'confirm').returns(true);

      let item = { name: 'Disposition1' };

      ListComponent.deleteDisposition(item, 5)
        .then(response => {
          expect(ListComponent.toggleDispositionRow).to.equal(-1);
          expect(response.statusCode).to.equal(204);
        });
      expect(window.confirm.calledOnce).to.equal(true);
      httpBackend.flush();
    });

    it('list should not be deleted (if associated with campaign) return 403 statusCode', () => {
      httpBackend.whenDELETE(endPointUrl + '/Disposition1').respond(403, {
          error: 'The object cannot be deleted. Please verify it is not being used by any campaign.'
        });

      sandbox.stub(window, 'confirm').returns(true);

      let item = { name: 'Disposition1' };

      ListComponent.deleteDisposition(item, 5)
        .then(response => {
          expect(ListComponent.toggleDispositionRow).to.equal(-1);
          expect(response.statusCode).to.equal(403);
          expect(ListComponent.message.type).to.equal('danger');
          expect(ListComponent.message.text).to.equal('The object cannot be deleted. Please verify it is not being used by any campaign.');
       

        });

      expect(window.confirm.calledOnce).to.equal(true);
      httpBackend.flush();
    });

    it('list should not be deleted (if  is a system disposition) return 403 statusCode', () => {
      httpBackend.whenDELETE(endPointUrl + '/Disposition1').respond(403, {
          error: 'The object is a system disposition and it cannot be deleted'
        });

      sandbox.stub(window, 'confirm').returns(true);

      let item = { name: 'Disposition1' };

      ListComponent.deleteDisposition(item, 5)
        .then(response => {

          expect(ListComponent.toggleDispositionRow).to.equal(-1);
          expect(response.statusCode).to.equal(403);
          expect(ListComponent.message.type).to.equal('danger');
          expect(ListComponent.message.text).to.equal('The object is a system disposition and it cannot be deleted');
       

        });

      expect(window.confirm.calledOnce).to.equal(true);
      httpBackend.flush();
    });

  });
  describe('#getDispositions', () => {

    it('List of Dispositions Returned', () => {
      httpBackend.whenGET(endPointUrl).respond(mockDispositionData);
      expect(ListComponent.message.show).to.equal(false);
      expect(ListComponent.dispositions).to.have.lengthOf(0);
      var getDispositions = ListComponent.getDispositions();
      getDispositions.then(_dispositions => {
        expect(_dispositions).to.be.an.instanceOf(Array);
        expect(_dispositions).to.have.lengthOf(5);
        expect(ListComponent.totalItems).to.not.equal(0);
        expect(ListComponent.currentPage).to.equal(1);
        expect(ListComponent.reverse).to.equal(true);
      });

      httpBackend.flush();
    });
    it('List of Dispositions Returned but empty', () => {
        httpBackend.whenGET(endPointUrl).respond({'return':[]});

        expect(ListComponent.message.show).to.equal(false);
        expect(ListComponent.dispositions).to.have.lengthOf(0);

        var getDispositions = ListComponent.getDispositions();


        getDispositions.then(_dispositions => {
          expect(_dispositions).to.be.an.instanceOf(Array);
          expect(_dispositions).to.have.lengthOf(0);
          expect(ListComponent.filteredDispositions.length).to.equal(0);
          expect(ListComponent.filteredDispositions).to.have.lengthOf(0);
        });

        httpBackend.flush();
      });
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

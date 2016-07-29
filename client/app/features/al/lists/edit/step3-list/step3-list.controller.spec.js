/*
* TODO
* I have issues using lodash in the unit test, the functions with issues are: 
* #uploadContacts
* #getContactFields
*
*/

'use strict';

describe('Component: al.lists.edit', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var ListComponent, scope, _$httpBackend;
  var state, timeout, sandbox, window, endPointUrl;


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope, $httpBackend, $state, $stateParams, $timeout, $window, $filter, ConfirmAsync, ContactFieldsService, appConfig, lodash) {
    scope = $rootScope.$new();
    _$httpBackend = $httpBackend;
    state = $state;
    timeout = $timeout;
    window = $window;
    lodash = lodash;

    sandbox = sinon.sandbox.create();

    if (appConfig.apiUri) {
      endPointUrl = appConfig.apiUri + '/f9/contactfields';
    }


    ListComponent = $componentController('al.lists.edit.list', {
      $scope: scope,
      $stateParams: { message: null },
      $state: state,
      $timeout: timeout,
      ContactFieldsService: ContactFieldsService,
      _ : lodash,
      sendContact: {listName: '', importData: { values: []}}

    });

    _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);

  }));

  afterEach(function () {
    _$httpBackend.verifyNoOutstandingRequest();
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

  describe('#getContactFields', () => {

    it('should return all contact fields', () => {
      _$httpBackend.whenGET(endPointUrl).respond(200, {
        return: [{
          'displayAs': 'Long',
          'mapTo': 'None',
          'name': 'number3',
          'system': true,
          'type': 'PHONE'
        },
          {
            'displayAs': 'Short',
            'mapTo': 'None',
            'name': 'first_name',
            'system': true,
            'type': 'STRING'
          }]
      });
      
      expect(ListComponent.loadingContacts).to.equal(true);

      ListComponent.getContactFiels()
        .then(response => {
          expect(response.statusCode).to.equal(200);
          expect(response.errorMessage).to.equal(null);
          expect(ListComponent.loadingContacts).to.equal(false);
        });
      _$httpBackend.flush();
    });

    it('should show error message when error', () => {
      _$httpBackend.whenGET(endPointUrl).respond(500, {
        data: null, statusCode: 500, errorMessage: 'Some Error front Endpoint'
      });

      expect(ListComponent.loadingContacts).to.equal(true);

      ListComponent.getContactFiels()
        .then(response => {
          expect(response.statusCode).to.equal(500);
          expect(response.errorMessage).to.not.equal(null);
          expect(response.data).to.equal(null);
          expect(ListComponent.loadingContacts).to.equal(true);
        });
      _$httpBackend.flush();
    });

  });

  describe('#uploadContacts', ()=>{
    it('add contacts to list', () => {
      _$httpBackend.whenGET(endPointUrl).respond(201, {return: {identifier: 'ad-fg-js'}});
      ListComponent.sendContact.listName = 'testAutobox';
      ListComponent.sendContact.importData = {values: [{item: ['9874563217']}]};
      ListComponent.sendContact.listUpdateSettings = {fieldsMapping: [{columnNumber: 1, fieldName: 'number1', key: true}],cleanListBeforeUpdate: false, crmAddMode: 'ADD_NEW', crmUpdateMode: 'DONT_UPDATE', listAddMode: 'ADD_FIRST'};
      ListComponent.uploadContacts()
        .then(response => {
          expect(response.statusCode).to.equal(201);
          expect(response.errorMessage).to.equal(null);
          expect(response.data.return.identifier).should.not.equal(null);
        });
      _$httpBackend.flush();
    });

    it('remove contacts to list', () => {
      _$httpBackend.whenDELETE(endPointUrl).respond(200, {return: {identifier: 'ad-fg-js'}});
      ListComponent.sendContact.listName = 'testAutobox';
      ListComponent.sendContact.importData = {values: [{item: ['9874563217']}]};
      ListComponent.sendContact.listDeleteSettings = {fieldsMapping: [{columnNumber: 1, fieldName: 'number1', key: true}], listDeleteMode: 'DELETE_ALL'};
      ListComponent.uploadContacts()
        .then(response => {
          expect(response.statusCode).to.equal(200);
          expect(response.errorMessage).to.equal(null);
          expect(response.data.return.identifier).should.not.equal(null);
        });
      _$httpBackend.flush();
    });

  });
});

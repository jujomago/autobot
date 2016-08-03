'use strict';

describe('Component: al.lists.edit', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  let ListComponent, scope, _$httpBackend;
  let state, timeout, sandbox, window, endPointUrl;
  //TODO
  //This params belongs to method that have issues with lodash and also it didn't 
  //work because the mock modal instance doesn't receive the data correctly, 
  //this test will be fix in another user story
  
  /*let fakeModal = {
    result: {
        then: function(confirmCallback, cancelCallback) {
            this.confirmCallBack = confirmCallback;
            this.cancelCallback = cancelCallback;
        }
    },
    close: function(item) {
        this.result.confirmCallBack(item);
    },
    dismiss: function( type ) {
        this.result.cancelCallback(type);
    }
  };

  let modalOptions = {
      animation: false,
      templateUrl: 'app/features/al/lists/edit/step3-list/contactModal/contactModal.html',
      size: 'md',
      controller: 'ContactModalCtrl',
      controllerAs: '$ctrl',
      appendTo: angular.element(document.querySelector('#edit-list')),
      resolve: {
        contactModal: sinon.match(Function),
        fields: sinon.match(Function)
      }
  };

  let actualOptions;*/

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
      sendContact: {listName: '', importData: { values: []}},
    });

    _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);

  }));

  afterEach(function () {
    _$httpBackend.verifyNoOutstandingRequest();
    sandbox.restore();
  });
  //TODO
  //This method uses lodash and we have issues with it and also it didn't 
  //work because the mock modal instance doesn't receive the data correctly, 
  //this test will be fix in another
  //user story
  
  /*describe('#openModal', ()=>{
    
    it('Should correctly show the modal', function () {
      let contact = {number1 : '202-555-0193'};
      let fields = [{
        displayAs: 'Short',
        isKey: true, 
        mapTo: 'None', 
        mappedIndex: 0, 
        mappedName: 'number1', 
        name: 'number1', 
        system: true,
        type: 'PHONE'
      }];
      ListComponent.contact = contact;
      ListComponent.fields = fields;
      ListComponent.openModal();
      expect(modal.open).calledWith(modalOptions);
      expect(modalOptions.resolve.contactModal()).to.equal(contact);
    });
  });*/

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
    //TODO
    //This method uses lodash and we have issues with it, this test will be 
    //fix in another user story
     
    /*it('should return all contact fields', () => {
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
          expect(ListComponent.listManual).to.have.lengthOf(2);
        });
      _$httpBackend.flush();
    });*/

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
          expect(ListComponent.listManual).to.deep.equal({});
        });
      _$httpBackend.flush();
    });

  });

  //TODO
  //This method uses lodash and we have issues with it, this test will be 
  //fix in another user story
    
  /*describe('#uploadContacts', ()=>{
    
    it('add contacts to list', () => {
      ListComponent.fieldsMapping = [{columnNumber: 1, fieldName: 'number1', key: true}];
      let listUpdateSettings = {fieldsMapping: [{columnNumber: 1, fieldName: 'number1', key: true}],cleanListBeforeUpdate: false, crmAddMode: 'ADD_NEW', crmUpdateMode: 'DONT_UPDATE', listAddMode: 'ADD_FIRST'};
      let listUpdateSettingsManual = {cleanListBeforeUpdate: false, crmAddMode: 'ADD_NEW', crmUpdateMode: 'DONT_UPDATE', listAddMode: 'ADD_FIRST'};
      _$httpBackend.whenGET(endPointUrl).respond(201, {return: {identifier: 'ad-fg-js'}});
      ListComponent.sendContact.listName = 'testAutobox';
      ListComponent.sendContact.importData = {values: [{item: ['9874563217']}]};
      if(ListComponent.manual){
        ListComponent.sendContact.listUpdateSettings = listUpdateSettingsManual;
        ListComponent.sendContact.listUpdateSettings.fieldsMapping = ListComponent.fieldsMapping;
      }else{
        ListComponent.sendContact.listUpdateSettings = listUpdateSettings;
      }
      
      ListComponent.uploadContacts()
        .then(response => {
          expect(response.statusCode).to.equal(201);
          expect(response.errorMessage).to.equal(null);
          expect(response.data.return.identifier).should.not.equal(null);
        });
      _$httpBackend.flush();
    });

    it('remove contacts to list', () => {
      ListComponent.fieldsMapping = [{columnNumber: 1, fieldName: 'number1', key: true}];
      let listDeleteSettings = {fieldsMapping: [{columnNumber: 1, fieldName: 'number1', key: true}],cleanListBeforeUpdate: false, crmAddMode: 'ADD_NEW', crmUpdateMode: 'DONT_UPDATE', listAddMode: 'ADD_FIRST'};
      let listDeleteSettingsManual = {cleanListBeforeUpdate: false, crmAddMode: 'ADD_NEW', crmUpdateMode: 'DONT_UPDATE', listAddMode: 'ADD_FIRST'};
      _$httpBackend.whenDELETE(endPointUrl).respond(200, {return: {identifier: 'ad-fg-js'}});
      ListComponent.sendContact.listName = 'testAutobox';
      ListComponent.sendContact.importData = {values: [{item: ['9874563217']}]};
      if(ListComponent.manual){
        ListComponent.sendContact.listDeleteSettings = listDeleteSettingsManual;
        ListComponent.sendContact.listDeleteSettings.fieldsMapping = ListComponent.fieldsMapping;
      }else{
        ListComponent.sendContact.listDeleteSettings = listDeleteSettings;
      }
      ListComponent.uploadContacts()
        .then(response => {
          expect(response.statusCode).to.equal(200);
          expect(response.errorMessage).to.equal(null);
          expect(response.data.return.identifier).should.not.equal(null);
        });
      _$httpBackend.flush();
    });

  });*/
});

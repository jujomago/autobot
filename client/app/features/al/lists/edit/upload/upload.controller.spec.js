'use strict';

describe('Component: alUploadList', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  let ListComponent, _$httpBackend, _$q ,_$stateParams, _Utils;
  let mockState, sandbox, _endPointUrl;
  let mockAlert, mockAlertResult, mockPrompt, mockModal;
  let _$scope;
  let mockFields = [
    {
      name: 'number1',
      type: 'PHONE',
      mapTo: 'None'
    },
    {
      name: 'string1',
      type: 'STRING',
      mapTo: 'None'
    },
    {
      name: 'percent1',
      type: 'PERCENT',
      mapTo: 'None'
    },
    {
      name: 'date1',
      type: 'DATE',
      mapTo: 'None'
    },
    {
      name: 'last_disposition',
      type: 'STRING',
      mapTo: 'LAST_DISPOSITION'
    }
  ];
  beforeEach(inject(function ($componentController,$rootScope, $httpBackend, appConfig, $stateParams, $q, Utils) {
    _$httpBackend = $httpBackend;
    _$stateParams = $stateParams;
    _Utils = Utils;
    _$q = $q;
    _$scope = $rootScope.$new();
    mockState = {
      url: '',
      params: {},
      go: function(url, params){
        this.url = url;
        this.params = params;
      }
    };
    _$stateParams.update = true;
    sandbox = sinon.sandbox.create();
    mockModal ={
      open: function(){
        return {result: $q.defer().promise};
      }
    };
    if (appConfig.apiUri) {
      _endPointUrl = appConfig.apiUri;
    }
    mockAlert = function(params, config){
      mockAlertResult = {params: params, config: config};
    };
    mockPrompt = {
      open: function(params, config){
        this.params = params;
        this.config = config;
        return true;
      }
    };
    ListComponent = $componentController('alUploadList', {
      $state: mockState,
      $stateParams: _$stateParams,
      PromptDialog: mockPrompt,
      AlertDialog: mockAlert,
      ModalManager: mockModal,
      $scope: _$scope
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


  describe('#editContact', () => {

    it('Should change contact', () => {
      ListComponent.contact = null;
      ListComponent.editContact({number1: '9876543219'});
      expect(ListComponent.contact.number1).to.equal('9876543219');
    });

    it('Should not change contact', () => {
      ListComponent.contact = {number1: '9876543217'};
      ListComponent.editContact();
      expect(ListComponent.contact.number1).to.equal('9876543217');
    });

  });
  describe('#getContactFields', () => {
    it('Should get all map to none fields to Update List', () => {
      _$httpBackend.whenGET(_endPointUrl+'/f9/contacts/fields').respond(200, {return: mockFields});
      ListComponent.getContactFields()
        .then(()=>{
          expect(ListComponent.contactFields.length).to.equal(4);
          let expected = [{name: 'number1', type: 'PHONE', mapTo: 'None', isKey: true},{name: 'string1',type: 'STRING',mapTo: 'None'},{name: 'percent1', type: 'PERCENT',mapTo: 'None'},{name: 'date1', type: 'DATE', mapTo: 'None'}];
          expect(ListComponent.contactFields).to.deep.equal(expected);
          expect(ListComponent.loaded).to.equal(true);
        });
      _$httpBackend.flush();
    });

    it('Should get all map to none fields to Delete List', () => {
      _$httpBackend.whenGET(_endPointUrl+'/f9/contacts/fields').respond(200, {return: mockFields});
      ListComponent.isUpdate = false;
      ListComponent.getContactFields()
        .then(()=>{
          expect(ListComponent.contactFields.length).to.equal(1);
          let expected = [{name: 'number1', type: 'PHONE', mapTo: 'None', isKey: true},{name: 'string1',type: 'STRING',mapTo: 'None'},{name: 'percent1', type: 'PERCENT',mapTo: 'None'},{name: 'date1', type: 'DATE', mapTo: 'None'}];
          expect(ListComponent.contactFields).to.deep.equal([expected[0]]);
          expect(ListComponent.loaded).to.equal(true);
        });
      _$httpBackend.flush();
    });

    it('Should show error message', () => {
      _$httpBackend.whenGET(_endPointUrl+'/f9/contacts/fields').respond(500, {error: 'Internal Server Error'});
      ListComponent.getContactFields()
        .then(()=>{
          expect(ListComponent.message).to.deep.equal({ show: true, type: 'danger', text: 'Internal Server Error' });
        });
      _$httpBackend.flush();
    });
  });

  describe('#uploadContacts', () => {
    beforeEach(function() {
      ListComponent.settings = {
        listAddMode: 'ADD_FIRST',
        crmAddMode: 'ADD_NEW',
        crmUpdateMode: 'UPDATE_FIRST',
        cleanListBeforeUpdate: false
      };
    });

    it('Should insert records', () => {
      _$httpBackend.whenPOST(_endPointUrl+'/f9/lists/test/records').respond(200, {return: {identifier: '123-abc'}});
      ListComponent.sendContact = {listName: 'test'};
      ListComponent.uploadContacts()
        .then(()=>{
          expect(ListComponent.sending).to.equal(false);
          expect(mockState.url).to.equal('ap.al.lists');
          expect(_Utils.getDataListAction()).to.deep.equal({name: 'test', identifier: '123-abc', isUpdate: true});
        });
      _$httpBackend.flush();
    });

    it('Should show error message', () => {
      _$httpBackend.whenPOST(_endPointUrl+'/f9/lists/test/records').respond(500, {error: 'Internal Server Error'});
      ListComponent.sendContact = {listName: 'test'};
      ListComponent.uploadContacts()
        .then(()=>{
          expect(ListComponent.SubmitText).to.equal('Save');
          expect(_Utils.getDataListAction().messageError).to.deep.equal({ show: true, type: 'danger', text: 'Internal Server Error', name: 'test', expires: 5000 });
        });
      _$httpBackend.flush();
    });
  });

  describe('#generatePhones', () => {

    it('should open a modal with phones', () => {
      ListComponent.list=[{number1: '9876543219',number2: '9876543219',number3: '9876543210' }, {number1: '9876543211',number2: '',number3: '' }];
      ListComponent.generatePhones();
      expect(ListComponent.phones).to.equal('9876543219,9876543210,9876543211');
    });
    it('should return empty', () => {
      ListComponent.list=[{number1: '0119876543219',number2: '',number3: '' }, {number1: '0119876543211',number2: '',number3: '' }];
      ListComponent.generatePhones();
      expect(ListComponent.phones).to.equal('');
    });

  });

  describe('#openDNCModal', () => {

    it('should replace list with valids', () => {
      let deferred = _$q.defer();

      deferred.resolve([{phone: '9876543210', status: 'P'}, {phone: '9876543211', status: 'C'}]);
      mockModal.open= function(){
        return {result: deferred.promise};
      };
      ListComponent.list=[{number1: '9876543219',number2: '9876543211',number3: '9876543210' }, {number1: '9876543217',number2: '',number3: '' }];
      ListComponent.openDNCModal()
        .then(() => {
          expect(ListComponent.list.length).to.equal(1);
          expect(ListComponent.list).to.deep.equal([{number1: '9876543217',number2: '',number3: '' }]);
          expect(ListComponent.selectedArray.length).to.equal(0);
          expect(ListComponent.contact).to.deep.equal({});
        });
      _$scope.$apply();
    });
    it('should display alert message', () => {
      let deferred = _$q.defer();
      deferred.resolve([{phone: '9876543210', status: 'C'}]);
      mockModal.open= function(){
        return {result: deferred.promise};
      };
      ListComponent.openDNCModal()
        .then(() => {
          expect(mockAlertResult.params).to.deep.equal({title: 'DNC Scrub', body: 'All your records have been found valid.\nYou may continue uploading the list.'});
          expect(mockAlertResult.config).to.deep.equal({center: true});
        });
      _$scope.$apply();
    });

  });

  describe('#deleteContact', () => {
    it('list selected records must be removed', () => {

      ListComponent.list = [{number1: '9876543215'}, {number1: '9876543210'}, {number1: '9876543219'}, {number1: '9876543218'}, {number1: '9876543217'}];
      ListComponent.selectedArray = [0,3,4];
      sandbox.stub(window, 'confirm').returns(true);
      ListComponent.deleteContact()
        .then(() => {
          expect(ListComponent.list).to.deep.equal([{number1: '9876543210'}, {number1: '9876543219'}]);
          expect(ListComponent.selectedArray).to.deep.equal([]);
          expect(ListComponent.contact).to.deep.equal({});

        });

      expect(window.confirm.calledOnce).to.equal(true);
    });
    it('should return false in cancel', () => {
      sandbox.stub(window, 'confirm').returns(false);
      ListComponent.deleteContact()
        .then(response => {
          expect(response).to.deep.equal(false);
        });

      expect(window.confirm.calledOnce).to.equal(true);
    });
  });

});

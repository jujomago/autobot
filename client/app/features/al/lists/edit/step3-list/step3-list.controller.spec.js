'use strict';

describe('Component:step3', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  let ListComponent, _$httpBackend, _Utils;
  let mockState, sandbox, _endPointUrl;
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

  beforeEach(inject(function ($componentController, $httpBackend, appConfig, Utils) {
    _$httpBackend = $httpBackend;
    _Utils = Utils;
    mockState = {
      url: '',
      params: {},
      go: function(url, params){
        this.url = url;
        this.params = params;
      }
    };

    sandbox = sinon.sandbox.create();

    if (appConfig.apiUri) {
      _endPointUrl = appConfig.apiUri;
    }

    ListComponent = $componentController('al.lists.edit.list', {
      $state: mockState
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
    it('Should get all map to none fields', () => {
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

});

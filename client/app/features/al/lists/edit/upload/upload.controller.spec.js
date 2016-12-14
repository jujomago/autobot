'use strict';

describe('Component: alUploadList', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  let ListComponent,ParentComponent, _$httpBackend, _$q ,_$stateParams, _Utils,
      mockState, sandbox, _endPointUrl,
      mockAlert, mockAlertResult, mockPrompt, mockModal, _$scope, stateParamsParent;

  let DEFAULT_SETTINGS = {
      UPDATE: {
        isCrmUpdate: true,
        listAddMode: 'ADD_FIRST',
        crmAddMode: 'ADD_NEW',
        crmUpdateMode: 'UPDATE_FIRST',
        cleanListBeforeUpdate: false,
        insertOnlyKeys: false
      },
      DELETE: {
        listDeleteMode: 'DELETE_ALL'
      }
    };

  beforeEach(inject(function ($componentController,$rootScope, $httpBackend, appConfig, $stateParams, $q, Utils, _lodash_) {
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

    stateParamsParent = $stateParams;
    stateParamsParent.name = 'list-test';
    stateParamsParent.action = 'update';

    ParentComponent = $componentController('al.lists.edit', {
      $stateParams: stateParamsParent,
      lodash: _lodash_
    });

    ListComponent = $componentController('alUploadList', {
      $state: mockState,
      $stateParams: _$stateParams,
      PromptDialog: mockPrompt,
      AlertDialog: mockAlert,
      ModalManager: mockModal,
      $scope: _$scope
    });
    ListComponent.parent = ParentComponent;

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

  describe('#InitUploadComponent', () => {
    beforeEach(() => {
      let contactMapping = [
        {
          displayAs:'Long',
          mapTo:'None',
          name:'number1',
          system:true,
          type:'PHONE',
          isKey:true
        },
        {
          displayAs:'Long',
          mapTo:'None',
          name:'number2',
          system:true,
          type:'PHONE',
          isKey:false
        },
        {
          displayAs:'Long',
          mapTo:'None',
          name:'number3',
          system:true,
          type:'PHONE',
          isKey:false
        },
        {
          displayAs:'Short',
          mapTo:'None',
          name:'first_name',
          system:true,
          type:'STRING',
          isKey:true
        }
      ];

      ListComponent.parent.setContactField(contactMapping);
      ListComponent.parent.setSettings(DEFAULT_SETTINGS.UPDATE);
    });

    it('should load all configurations when is Updated', () => {
      let mapping = [
        {
          columnNumber:1,
          fieldName:'number1',
          key:true
        },
        {
          columnNumber:2,
          fieldName:'number2',
          key:false
        },
        {
          columnNumber:3,
          fieldName:'number3',
          key:false
        },
        {
          columnNumber:4,
          fieldName:'first_name',
          key:true
        }
      ];
      ListComponent.$onInit();
      expect(ListComponent.settings).to.deep.equal(DEFAULT_SETTINGS.UPDATE);
      expect(ListComponent.isUpdate).to.be.equal(true);
      expect(ListComponent.contactFields).to.have.lengthOf(4);
      expect(ListComponent.fieldsMapping).to.deep.equal(mapping);
    });

    it('should load only keys to contactFields when is Updated', () => {
      let settings = DEFAULT_SETTINGS.UPDATE,
          mapping;

      settings.insertOnlyKeys = true;
      mapping = [
        {
          columnNumber:1,
          fieldName:'number1',
          key:true
        },
        {
          columnNumber:2,
          fieldName:'first_name',
          key:true
        }
      ];

      ListComponent.parent.setSettings(settings);
      ListComponent.$onInit();
      expect(ListComponent.settings).to.deep.equal(settings);
      expect(ListComponent.isUpdate).to.be.equal(true);
      expect(ListComponent.contactFields).to.have.lengthOf(2);
      expect(ListComponent.fieldsMapping).to.deep.equal(mapping);
    });

    it('should load only keys to contactFields when is Delete', () => {
      ListComponent.parent.isUpdate = false;
      let mapping = [
          {
            columnNumber:1,
            fieldName:'number1',
            key:true
          },
          {
            columnNumber:2,
            fieldName:'number3',
            key:true
          },
          {
            columnNumber:3,
            fieldName:'first_name',
            key:true
          }
      ],
      contactField = ListComponent.parent.getContactField();

      contactField[2].isKey = true;
      ListComponent.parent.setContactField(contactField);
      ListComponent.parent.setSettings(DEFAULT_SETTINGS.DELETE);
      ListComponent.$onInit();
      expect(ListComponent.settings).to.deep.equal(DEFAULT_SETTINGS.DELETE);
      expect(ListComponent.isUpdate).to.be.equal(false);
      expect(ListComponent.contactFields).to.have.lengthOf(3);
      expect(ListComponent.fieldsMapping).to.deep.equal(mapping);
    });

    it('should load all configurations when is Updated contactFields null', () => {
      ListComponent.parent.setContactField(null);
      ListComponent.$onInit();
      expect(ListComponent.settings).to.deep.equal(DEFAULT_SETTINGS.UPDATE);
      expect(ListComponent.isUpdate).to.be.equal(true);
      expect(ListComponent.contactFields).to.have.lengthOf(0);
      expect(ListComponent.fieldsMapping).to.deep.equal([]);
    });
  });

  describe('#MappingValidationUpload', () => {
    beforeEach(() => {
      let contactMapping = [
        {
          displayAs:'Long',
          mapTo:'None',
          name:'number1',
          system:true,
          type:'PHONE',
          isKey:true
        },
        {
          displayAs:'Long',
          mapTo:'None',
          name:'number2',
          system:true,
          type:'PHONE',
          isKey:false
        },
        {
          displayAs:'Long',
          mapTo:'None',
          name:'number3',
          system:true,
          type:'PHONE',
          isKey:false
        },
        {
          displayAs:'Short',
          mapTo:'None',
          name:'first_name',
          system:true,
          type:'STRING',
          isKey:true
        }
      ];

      ListComponent.parent.setContactField(contactMapping);
      ListComponent.settings = DEFAULT_SETTINGS.UPDATE;
    });

    it('should map contactFields when is update List', () => {
      let mapping = [
        {
          columnNumber:1,
          fieldName:'number1',
          key:true
        },
        {
          columnNumber:2,
          fieldName:'number2',
          key:false
        },
        {
          columnNumber:3,
          fieldName:'number3',
          key:false
        },
        {
          columnNumber:4,
          fieldName:'first_name',
          key:true
        }
      ],
      contactFields = ListComponent.parent.getContactField();
      ListComponent.settings = DEFAULT_SETTINGS.UPDATE;
      ListComponent.settings.insertOnlyKeys = false;
      ListComponent.mappingValidation(contactFields);
      expect(ListComponent.contactFields).to.have.lengthOf(4);
      expect(ListComponent.fieldsMapping).to.deep.equal(mapping);
    });

    it('should map only keys of contactFields when is update List', () => {
      let settings = DEFAULT_SETTINGS.UPDATE,
        mapping = [
          {
            columnNumber:1,
            fieldName:'number1',
            key:true
          },
          {
            columnNumber:2,
            fieldName:'first_name',
            key:true
          }
        ],
      contactFields = ListComponent.parent.getContactField();
      settings.insertOnlyKeys = true;
      ListComponent.settings = settings;
      ListComponent.mappingValidation(contactFields);
      expect(ListComponent.contactFields).to.have.lengthOf(2);
      expect(ListComponent.fieldsMapping).to.deep.equal(mapping);
    });

    it('should map contactFields empty when is Update List', () => {
      let settings = DEFAULT_SETTINGS.UPDATE;

      settings.insertOnlyKeys = true;
      ListComponent.settings = settings;
      ListComponent.mappingValidation([]);
      expect(ListComponent.contactFields).to.have.lengthOf(0);
      expect(ListComponent.fieldsMapping).to.deep.equal([]);
    });

    it('should map contactFields when is delete List', () => {
      let mapping = [
          {
            columnNumber:1,
            fieldName:'number1',
            key:true
          },
          {
            columnNumber:2,
            fieldName:'number3',
            key:true
          },
          {
            columnNumber:3,
            fieldName:'first_name',
            key:true
          }
        ],
        contactFields = ListComponent.parent.getContactField();

      ListComponent.settings = DEFAULT_SETTINGS.DELETE;
      ListComponent.isUpdate = false;
      contactFields[2].isKey = true;
      ListComponent.mappingValidation(contactFields);
      expect(ListComponent.contactFields).to.have.lengthOf(3);
      expect(ListComponent.fieldsMapping).to.deep.equal(mapping);
    });

    it('should map contactFields empty when is delete List', () => {
      ListComponent.settings = DEFAULT_SETTINGS.DELETE;
      ListComponent.isUpdate = false;
      ListComponent.mappingValidation([]);
      expect(ListComponent.contactFields).to.have.lengthOf(0);
      expect(ListComponent.fieldsMapping).to.deep.equal([]);
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
      _$httpBackend.whenPOST(_endPointUrl+'/f9/admin/lists/test/records').respond(200, {return: {identifier: '123-abc'}});
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
      _$httpBackend.whenPOST(_endPointUrl+'/f9/admin/lists/test/records').respond(500, {error: 'Internal Server Error'});
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

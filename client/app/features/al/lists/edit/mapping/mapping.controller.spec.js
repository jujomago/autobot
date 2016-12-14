'use strict';

describe('Component: alMappingList', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var MappingComponent, ParentComponent, $scope, _$httpBackend,
      contactFieldService, listService, endPointUrl, lodash,contacts,stateParamsParent;

  // Initialize the controller and a mock scope
  beforeEach(
    inject(function (
      $componentController,
      $httpBackend,
      $q,
      $rootScope,
      $state,
      $stateParams,
      _ContactFieldsService_,
      _ListsService_,
      _Utils_,
      _EditListActions_,
      appConfig,
      _lodash_) {

      stateParamsParent = $stateParams;
      stateParamsParent.name = 'list-test';
      stateParamsParent.action = 'update';

      $scope = $rootScope.$new();
      _$httpBackend = $httpBackend;
      contactFieldService = _ContactFieldsService_;
      listService = _ListsService_;

      lodash = _lodash_;

      if (appConfig.apiUri) {
        endPointUrl = appConfig.apiUri + '/f9/admin/contacts/fields';
      }

      contacts = $q.defer();
      sinon.stub(contactFieldService, 'getContactFields').returns(contacts.promise);
      sinon.spy($state, 'go');

      ParentComponent = $componentController('al.lists.edit', {
        $stateParams: stateParamsParent,
        $state: $state,
        lodash: _lodash_
      });

      MappingComponent = $componentController('alMappingList', {
        $scope: $scope,
        ContactFieldsService: contactFieldService,
        Utils: _Utils_,
        EditListActions: _EditListActions_
      });

      MappingComponent.parent = ParentComponent;

      _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
    }));

  describe('#getContactFieldsMappingKeys', () => {

    it('should return all contact fields', () => {
      _$httpBackend.whenGET(endPointUrl).respond(200, {
        return: [
          {
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
          },
          {
            'displayAs': 'Short',
            'mapTo': 'Something',
            'name': 'last_name',
            'system': true,
            'type': 'STRING'
          }]
      });

      expect(MappingComponent.loadingContacts).to.equal(true);

      MappingComponent.getContactFields()
        .then(response => {
          expect(response.statusCode).to.equal(200);
          expect(response.errorMessage).to.equal(null);
          expect(response.data).to.have.lengthOf(3);
          expect(MappingComponent.loadingContacts).to.equal(false);
          expect(MappingComponent.contactFields).to.have.lengthOf(2);
        });
    });

    it('should show error message when error', () => {
      _$httpBackend.whenGET(endPointUrl).respond(500, {
        data: null, statusCode: 500, errorMessage: 'Some Error Endpoint'
      });

      expect(MappingComponent.loadingContacts).to.equal(true);

      MappingComponent.getContactFields()
        .then(response => {
          expect(response.statusCode).to.equal(500);
          expect(response.errorMessage).to.not.equal(null);
          expect(response.data).to.equal(null);
          expect(MappingComponent.message).to.deep.equal({ show: true, type: 'warning', text: response.errorMessage });
          expect(MappingComponent.loadingContacts).to.equal(false);
          expect(MappingComponent.contactFields).to.have.lengthOf(0);
        });
    });

  });

  describe('#nextStep', () => {

    it('Show message if no have key fields', () => {

      MappingComponent.contactFields = [
        { 'name': 'number1', 'isKey': false },
        { 'name': 'number2', 'isKey': false },
        { 'name': 'number3', 'isKey': false },
        { 'name': 'first_name', 'isKey': false },
        { 'name': 'last_name', 'isKey': false },
        { 'name': 'company', 'isKey': false }
      ];

      MappingComponent.handleFinish();
      expect(MappingComponent.message.type).to.equal('warning');
      expect(MappingComponent.message.show).to.equal(true);
      expect(MappingComponent.message.text).to.equal('At least one field must be marked as key');
    });

    it('Show message if have more than 12 key fields', () => {

      MappingComponent.contactFields = [
        { 'name': 'number1', 'isKey': true },
        { 'name': 'number2', 'isKey': true },
        { 'name': 'number3', 'isKey': true },
        { 'name': 'first_name', 'isKey': true },
        { 'name': 'last_name', 'isKey': true },
        { 'name': 'company', 'isKey': true },
        { 'name': 'last_sms', 'isKey': true },
        { 'name': 'url', 'isKey': true },
        { 'name': 'test1', 'isKey': true },
        { 'name': 'test2', 'isKey': true },
        { 'name': 'test3', 'isKey': true },
        { 'name': 'test4', 'isKey': true },
        { 'name': 'test5', 'isKey': true }
      ];

      MappingComponent.handleFinish();
      expect(MappingComponent.message.type).to.equal('warning');
      expect(MappingComponent.message.show).to.equal(true);
      expect(MappingComponent.message.text).to.equal('No more than 12 fields can be marked as key');

    });

    it('Save data Keys when send to next step when is updating', () => {
      const RESPONSE = {
          statusCode: 200,
          data: [
            {
              displayAs: 'Long',
              mapTo: 'None',
              name: 'number1',
              system: true,
              type: 'PHONE'
            },
            {
              displayAs: 'Long',
              mapTo: 'None',
              name: 'number2',
              system: true,
              type: 'PHONE'
            },
            {
              displayAs: 'Long',
              mapTo: 'None',
              name: 'number3',
              system: true,
              type: 'PHONE'
            },
            {
              displayAs: 'Short',
              mapTo: 'None',
              name: 'first_name',
              system: true,
              type: 'STRING'
            },
            {
              displayAs: 'Short',
              mapTo: 'Something',
              name: 'last_name',
              system: true,
              type: 'STRING'
            }]
        },
        EXPECTED = [
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
            isKey:true
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


      contacts.resolve(RESPONSE);
      MappingComponent.getContactFields();
      $scope.$apply();

      expect(MappingComponent.contactFields).to.have.lengthOf(4);

      MappingComponent.contactFields[2].isKey = true;
      MappingComponent.contactFields[3].isKey = true;
      MappingComponent.handleFinish();
      expect(MappingComponent.parent.getContactField()).to.deep.equal(EXPECTED);
    });
  });
});

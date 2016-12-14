'use strict';

describe('Component: CreateComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var _CreateComponent, _$scope,_$httpBackend, _$state, _ListsService, _endPointUrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope, $httpBackend, $state, $stateParams, _ListsService_, appConfig) {
    _$scope = $rootScope.$new();

    _$httpBackend = $httpBackend;
    _$state = $state;
    _ListsService = _ListsService_;

    if (appConfig.apiUri) {
      _endPointUrl = appConfig.apiUri + '/f9/admin/lists';
    }


    _CreateComponent = $componentController('al.lists.create', {
      $scope: _$scope,
      $stateParams: { message: null },
      $state: _$state,
      ListsService: _ListsService
    });

    _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
    _$httpBackend.whenGET(appConfig.apiUri+'/f9/admin/lists/%$&unexisting_list)(*&^%^').respond(200);
  }));

  describe('#createList', () => {
    it('list created should return 201 statusCode', () => {
      _$httpBackend.whenPOST(_endPointUrl).respond(201, null);
      _CreateComponent.list = { listName: 'List1' };
      _CreateComponent.save()
        .then(response => {
          expect(_CreateComponent.message.type).to.equal('success');
          expect(_CreateComponent.message.text).to.equal('List Created SuccessFully');
          expect(_CreateComponent.message.expires).to.equal(3000);
          expect(response.statusCode).to.equal(201);
        });


      _$httpBackend.flush();
    });
    it('list created should return 500 error statusCode', () => {
      _$httpBackend.whenPOST(_endPointUrl).respond(500, {error: 'Error in create list'});
      _CreateComponent.list = { listName: 'List1' };
      _CreateComponent.save()
        .then(response => {
          expect(_CreateComponent.message.type).to.equal('danger');
          expect(_CreateComponent.message.text).to.equal('Error in create list');
          expect(_CreateComponent.message.expires).to.equal(5000);
          expect(response.statusCode).to.equal(500);
        });


      _$httpBackend.flush();
    });


  });
});

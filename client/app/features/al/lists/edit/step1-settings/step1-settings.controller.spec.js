'use strict';

describe('Controller: SettingsComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var SettingsComponent, listService,endPointUrl,_$httpBackend,_$scope, _$state;
  beforeEach(inject(function ($componentController, $rootScope, $state, $httpBackend, $stateParams, _ListsService_, appConfig) {
    _$scope = $rootScope.$new();
    _$httpBackend = $httpBackend;
    listService = _ListsService_;
    if (appConfig.apiUri) {
      endPointUrl = appConfig.apiUri + '/f9/lists';
    }
    _$state = $state;
    SettingsComponent = $componentController('al.lists.settings', {
      $scope: _$scope,
      $stateParams: { message: null },
      $state: _$state,
      ListsService: listService
    });
    _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
  }));
});

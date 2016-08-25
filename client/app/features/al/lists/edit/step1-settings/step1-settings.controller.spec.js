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
  //inactive while API complete this endpoint
/*
  describe('#getList', () => {
    it('get single list', () => {
      _$httpBackend.whenGET(endPointUrl + '/List1').respond(200, {
            return: { 'name': 'List1', 'size': 7}
        });
      let item = 'List1';
      expect(SettingsComponent.found).to.equal(false);
      SettingsComponent.getList(item)
        .then(response => {
          expect(SettingsComponent.found).to.equal(true);
          expect(SettingsComponent.list.name).to.equal('List1');
          expect(SettingsComponent.list.size).to.equal(7);
          expect(response.statusCode).to.equal(200);

        });
      _$httpBackend.flush();
    });
    it('could not find a single list', () => {
      _$httpBackend.whenGET(endPointUrl + '/List1').respond(404, {
            body: 'List not found'
        });
      let item = 'List1';
      expect(SettingsComponent.found).to.equal(false);
      SettingsComponent.getList(item)
        .then(response => {
          expect(SettingsComponent.found).to.equal(false);
          expect(response.statusCode).to.equal(404);
        });
      _$httpBackend.flush();
    });
  });
*/
  describe('#nextStep', () => {
    it('should set update settings', () => {
      SettingsComponent.selectUpdate();
      SettingsComponent.nextStep();
      let settings=SettingsComponent.settingsParams.listUpdateSettings;
      expect(SettingsComponent.settingsParams.skipPreview).to.equal(false);
      expect(settings.listAddMode).to.equal('ADD_FIRST');
      expect(settings.crmAddMode).to.equal('ADD_NEW');
      expect(settings.crmUpdateMode).to.equal('UPDATE_FIRST');
      expect(settings.cleanListBeforeUpdate).to.equal(false);
    });
    it('should set delete settings', () => {
      SettingsComponent.selectDelete();
      SettingsComponent.nextStep();
      let settings=SettingsComponent.settingsParams.listDeleteSettings;
      expect(settings.listDeleteMode).to.equal('DELETE_ALL');
    });
  });
  describe('#sendFile', () => {
    it('should load a csv file', () => {
      SettingsComponent.csvFile = {data: 'demo, csv, text'};
      expect(SettingsComponent.sent).to.equal(false);
      SettingsComponent.sendFile();
      expect(SettingsComponent.sent).to.equal(true);
      expect(SettingsComponent.settingsParams.csvData).to.equal('demo, csv, text');
    });
  });
  describe('#isCsv', () => {
    it('should return csv', () => {
      SettingsComponent.csvFile = {name: 'test.csv'};
      expect(SettingsComponent.isCsv()).to.equal('csv');
    });
    it('should return js', () => {
      SettingsComponent.csvFile = {name: 'test.controller.spec.js'};
      expect(SettingsComponent.isCsv()).to.equal('js');
    });
    it('should return null', () => {
      SettingsComponent.csvFile = {name: 'file'};
      expect(SettingsComponent.isCsv()).to.equal(null);
    });
  });
});

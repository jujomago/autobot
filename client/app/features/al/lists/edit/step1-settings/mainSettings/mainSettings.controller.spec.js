// 'use strict';
//
// describe('Controller: MainSettings', function () {
//
//   // load the controller's module
//   beforeEach(module('fakiyaMainApp'));
//
//   var mainSettings, listService,endPointUrl,_$httpBackend,_$scope, _$state;
//   beforeEach(inject(function ($componentController, $rootScope, $state, $httpBackend, $stateParams, _ListsService_, appConfig) {
//     _$scope = $rootScope.$new();
//     _$httpBackend = $httpBackend;
//     listService = _ListsService_;
//     if (appConfig.apiUri) {
//       endPointUrl = appConfig.apiUri + '/f9/lists';
//     }
//     _$state = $state;
//     mainSettings = $componentController('al.lists.settings', {
//       $scope: _$scope,
//       $stateParams: { message: null },
//       $state: _$state,
//       ListsService: listService
//     });
//     _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
//   }));
//   describe('#nextStep', () => {
//     it('should set update settings', () => {
//       mainSettings.selectUpdate();
//       mainSettings.nextStep();
//       let settings=mainSettings.settingsParams.listUpdateSettings;
//       expect(mainSettings.settingsParams.skipPreview).to.equal(false);
//       expect(settings.listAddMode).to.equal('ADD_FIRST');
//       expect(settings.crmAddMode).to.equal('ADD_NEW');
//       expect(settings.crmUpdateMode).to.equal('UPDATE_FIRST');
//       expect(settings.cleanListBeforeUpdate).to.equal(false);
//     });
//     it('should set delete settings', () => {
//       mainSettings.selectDelete();
//       mainSettings.nextStep();
//       let settings=mainSettings.settingsParams.listDeleteSettings;
//       expect(settings.listDeleteMode).to.equal('DELETE_ALL');
//     });
//   });
//   describe('#sendFile', () => {
//     it('should load a csv file', () => {
//       mainSettings.csvFile = {data: 'demo, csv, text'};
//       expect(mainSettings.sent).to.equal(false);
//       mainSettings.sendFile();
//       expect(mainSettings.sent).to.equal(true);
//       expect(mainSettings.settingsParams.csvData).to.equal('demo, csv, text');
//     });
//   });
//   describe('#isCsv', () => {
//     it('should return csv', () => {
//       mainSettings.csvFile = {name: 'test.csv'};
//       expect(mainSettings.isCsv()).to.equal('csv');
//     });
//     it('should return js', () => {
//       mainSettings.csvFile = {name: 'test.controller.spec.js'};
//       expect(mainSettings.isCsv()).to.equal('js');
//     });
//     it('should return null', () => {
//       mainSettings.csvFile = {name: 'file'};
//       expect(mainSettings.isCsv()).to.equal(null);
//     });
//   });
// });

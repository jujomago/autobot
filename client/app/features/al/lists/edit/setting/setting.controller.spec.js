'use strict';

describe('Controller: alSettingList', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  let SettingsComponent,
      _$stateParams,
      ParentComponent,
      PromptDialog,
      DEFAULT_UPDATE_SETTINGS;

  beforeEach(inject(function (
    $componentController,
    $rootScope,
    $state,
    $httpBackend,
    $stateParams,
    _PromptDialog_,
    _Utils_,
    _EditListActions_,
    _lodash_) {

    _$stateParams = $stateParams;
    _$stateParams.name = 'List-test';
    _$stateParams.action = 'update';

    DEFAULT_UPDATE_SETTINGS = {
      listAddMode: 'ADD_FIRST',
      crmAddMode: 'ADD_NEW',
      crmUpdateMode: 'UPDATE_FIRST',
      cleanListBeforeUpdate: false,
      isCrmUpdate: true
    };

    PromptDialog = _PromptDialog_;

    sinon.spy(PromptDialog, 'open');

    ParentComponent = $componentController('al.lists.edit', {
      $state: $state,
      $stateParams: _$stateParams,
      lodash: _lodash_
    });

    SettingsComponent = $componentController('alSettingList', {
      $stateParams: _$stateParams,
      PromptDialog: PromptDialog,
      Utils: _Utils_,
      EditListActions: _EditListActions_
    });

    SettingsComponent.parent = ParentComponent;
  }));

  describe('#InitComponentSettings', () => {
    it('should load default settings when update is is select', () => {
      SettingsComponent.$onInit();
      expect(SettingsComponent.settings).to.deep.equal(DEFAULT_UPDATE_SETTINGS);
    });

    it('should load setting from storage values', () => {
      let storageSetting = {
        listAddMode: 'ADD_ALL',
        crmAddMode: 'DONT_ADD',
        crmUpdateMode: 'UPDATE_SOLE_MATCHES',
        cleanListBeforeUpdate: true,
        isCrmUpdate: false,
      };
      SettingsComponent.parent.setSettings(storageSetting);
      SettingsComponent.$onInit();
      expect(SettingsComponent.settings).to.deep.equal(storageSetting);
    });
  });

  describe('#SendConfigurationSettings', () => {
    let saveSettings;

    beforeEach(() => {
      saveSettings  = {
        listAddMode: 'ADD_FIRST',
        crmAddMode: 'ADD_NEW',
        crmUpdateMode: 'UPDATE_FIRST',
        cleanListBeforeUpdate: false,
        isCrmUpdate: true
      };
    });

    it('should save configuration settings default', () => {
      saveSettings.insertOnlyKeys = false;

      SettingsComponent.$onInit();
      SettingsComponent.sendConfiguration();
      expect(SettingsComponent.parent.getSettings()).to.deep.equal(saveSettings);
    });

    it('should save configuration settings to show only keys when is not selected Update/Add Contact', () => {
      saveSettings.insertOnlyKeys = true;
      saveSettings.isCrmUpdate = false;
      saveSettings.crmAddMode = 'DONT_ADD';

      SettingsComponent.$onInit();
      expect(SettingsComponent.settings).to.deep.equal(DEFAULT_UPDATE_SETTINGS);
      SettingsComponent.settings.isCrmUpdate = false;
      SettingsComponent.settings.crmAddMode = 'DONT_ADD';

      SettingsComponent.sendConfiguration();
      expect(SettingsComponent.parent.getSettings()).to.deep.equal(saveSettings);
    });

    it('should show confirmation message after to save', () => {
      SettingsComponent.$onInit();
      expect(SettingsComponent.settings).to.deep.equal(DEFAULT_UPDATE_SETTINGS);
      SettingsComponent.settings.crmUpdateMode = 'UPDATE_ALL';

      SettingsComponent.sendConfiguration();
      expect(SettingsComponent.parent.getSettings()).to.be.equal(null);
    });
  });
});

(function () {
    'use strict';

    let _$stateParams,
        _PromptDialog,
        _Utils,
        _EditListActions;

    class SettingListController {
        constructor(
            $stateParams,
            PromptDialog,
            Utils,
            EditListActions) {

            _$stateParams = $stateParams;
            _PromptDialog = PromptDialog;
            _Utils = Utils;
            _EditListActions = EditListActions;

            this.MODE_ACTION = _EditListActions.getConstantsUpdate();
            this.name = _$stateParams.name;
            this.advancedOptions = {isCollapsed: true};
            this.MESSAGE_UPDATE_ALL_MATCH = _EditListActions.getSettingMessage();
            this.settings = {};
        }

        $onInit() {
            let settingsLoaded = this.parent.getSettings();

            this.isUpdate = this.parent.isUpdate;
            this.settings = _Utils.isUndefinedOrNull(settingsLoaded) ?
                            _EditListActions.getDefaultSetting(this.isUpdate) : settingsLoaded;

            this.labels = _EditListActions.getLabelsSettings(this.isUpdate);
        }

        sendConfiguration() {
          if (this.isUpdate) {
            this.settings.insertOnlyKeys = !this.settings.isCrmUpdate &&
              this.settings.crmAddMode === this.MODE_ACTION.CRM.DONT_ADD;

            if (this.settings.crmUpdateMode === this.MODE_ACTION.CRM.UPDATE_ALL && this.settings.isCrmUpdate) {
              _PromptDialog.open(this.MESSAGE_UPDATE_ALL_MATCH.message, this.MESSAGE_UPDATE_ALL_MATCH.buttons).
              then(() => {
                this.saveSetting();
              });
            }
            else {
              this.saveSetting();
            }
          }
          else {
            this.saveSetting();
          }
        }

        saveSetting() {
          this.parent.setSettings(this.settings);
          this.parent.handleNext();
        }

        cancel() {
            this.parent.cancel();
        }
    }

    SettingListController.$inject = [
        '$stateParams',
        'PromptDialog',
        'Utils',
        'EditListActions'
    ];

    angular.module('fakiyaMainApp')
        .component('alSettingList', {
            require: {
                parent: '^al.lists.edit'
            },
            templateUrl: 'app/features/al/lists/edit/setting/setting.html',
            controller: SettingListController
        });
})();

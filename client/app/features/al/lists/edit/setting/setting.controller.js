(function () {
    'use strict';

    let _$stateParams,
        _Utils,
        _UtilsList;

    class SettingListController {
        constructor(
            $stateParams,
            Utils,
            UtilsList) {

            _$stateParams = $stateParams;
            _Utils = Utils;
            _UtilsList = UtilsList;

            this.MODE_ACTION = _UtilsList.getConstantsUpdate();
            this.name = _$stateParams.name;
            this.advancedOptions = {isCollapsed: true};
            this.defaultUpdateSettings = {
                isCrmUpdate: true,
                listAddMode: this.MODE_ACTION.LIST.ADD_FIRST,
                crmAddMode: this.MODE_ACTION.CRM.ADD_NEW,
                crmUpdateMode: this.MODE_ACTION.CRM.UPDATE_FIRST,
                cleanListBeforeUpdate: false
            };
            this.settings = {};
        }

        $onInit() {
            let settingsLoaded = this.parentComp.getSettings();

            this.settings = _Utils.isUndefinedOrNull(settingsLoaded) ?
                            this.defaultUpdateSettings : settingsLoaded;

        }

        sendConfiguration() {
            this.parentComp.setSettings(this.settings);
            this.parentComp.handleNext();
        }

        handleNext() {
          this.parentComp.handleNext();
        }

        cancel() {
            this.parentComp.cancel();
        }
    }

    SettingListController.$inject = [
        '$stateParams',
        'Utils',
        'UtilsList'
    ];

    angular.module('fakiyaMainApp')
        .component('settingList', {
            require: {
                parentComp: '^al.lists.edit'
            },
            templateUrl: 'app/features/al/lists/edit/setting/setting.html',
            controller: SettingListController
        });
})();

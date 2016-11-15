'use strict';
(function () {
    let _$state,
        _$stateParams,
        _ContactFieldsService,
        _ListsService,
        _UtilsList;

    class SettingUpdateController {
        constructor($state,
                    $stateParams,
                    ContactFieldsService,
                    UtilsList)
        {
          _$state = $state;
          _$stateParams = $stateParams;
          _ContactFieldsService = ContactFieldsService;
          _UtilsList = UtilsList;

          this.MODE_ACTION = _UtilsList.getConstantsUpdate();
          this.name = _$stateParams.name;
          this.advancedOptions = {isCollapsed: true};
          this.defaultUpdateSettings = {
              listAddMode: this.MODE_ACTION.LIST.ADD_FIRST,
              crmAddMode: this.MODE_ACTION.CRM.ADD_NEW,
              crmUpdateMode: this.MODE_ACTION.CRM.UPDATE_FIRST,
              cleanListBeforeUpdate: false,
              fieldsMapping: []
          };
          this.listUpdateSettings = {};

          this.isContactUpdate = false;

          this.listAdvancedtSetting = {
            isCrmUpdate: true,
            crmUpdateMode: this.MODE_ACTION.CRM.UPDATE_FIRST,
            crmAddMode: this.MODE_ACTION.CRM.ADD_NEW,
            listAddMode: this.MODE_ACTION.LIST.ADD_FIRST,
            cleanListBeforeUpdate: false
          };
        }

        $onInit(){
          //this.listUpdateSettings = this.defaultUpdateSettings;

        }

        checkContactUpdate() {

        }

        sendConfiguration(){
          // _$state.go('ap.al.listsEdit-list', {name: this.name});
          /// _$state.go('ap.al.mapping', {settings:'',name:_$stateParams.name, manual: true});
          this.parentComp.handleNext();
        }

        setUpdateValue(){
          console.log('this.listAdvancedtSetting . .  .',this.listAdvancedtSetting);
        }

        handleNext() {
          console.log('Parent Component . ..', this.parentComp);
          this.parentComp.handleNext();
        }

        cancel() {
          this.parentComp.cancel();
        }

    }

    SettingUpdateController.$inject = [
      '$state',
      '$stateParams',
      'ContactFieldsService',
      'UtilsList'];

    angular.module('fakiyaMainApp')
        .component('settingUpdate', {
            require: {
                parentComp: '^al.lists.edit'
            },
            templateUrl: 'app/features/al/lists/edit/setting/update/setting.html',
            controller: SettingUpdateController
        });
})();

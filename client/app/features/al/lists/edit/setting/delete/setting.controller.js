'use strict';
(function () {
    let _$state,
        _$stateParams,
        _ContactFieldsService,
        _ListsService;

    class SettingDeleteController {
        constructor($state,
                    $stateParams,
                    ContactFieldsService) {
            _$state = $state;
            _$stateParams = $stateParams;
            _ContactFieldsService = ContactFieldsService;

            this.name = _$stateParams.name;
            // this.isUpdate = $stateParams.isUpdate;
            this.advancedOptions = {isCollapsed: true};
        }

        sendConfiguration(){
          // _$state.go('ap.al.listsEdit-list', {name: this.name});
          _$state.go('ap.al.mapping', {settings:'',name:_$stateParams.name, manual: true});
        }

        handleNext() {
          console.log('Parent Component . ..', this.parentComp);
          this.parentComp.handleNext();
        }

        cancel() {
          this.parentComp.cancel();
        }

    }




  SettingDeleteController.$inject = ['$state', '$stateParams', 'ContactFieldsService'];

    angular.module('fakiyaMainApp')
        .component('settingDelete', {
            require: {
              parentComp: '^al.lists.edit'
            },
            templateUrl: 'app/features/al/lists/edit/setting/delete/setting.html',
            controller: SettingDeleteController
        });

  const LIST_ADD_MODES={
    ADD_FIRST: 'ADD_FIRST',
    ADD_ALL: 'ADD_ALL',
    ADD_IF_SOLE_CRM_MATCH: 'ADD_IF_SOLE_CRM_MATCH'
  };
  const CRM_ADD_MODES={
    ADD_NEW: 'ADD_NEW',
    DONT_ADD: 'DONT_ADD'
  };
  const CRM_UPDATE_MODES={
    UPDATE_FIRST: 'UPDATE_FIRST',
    UPDATE_ALL: 'UPDATE_ALL',
    UPDATE_SOLE_MATCHES: 'UPDATE_SOLE_MATCHES',
    DONT_UPDATE: 'DONT_UPDATE'
  };
  const LIST_DELETE_MODES={
    DELETE_ALL: 'DELETE_ALL',
    DELETE_EXCEPT_FIRST: 'DELETE_EXCEPT_FIRST'
  };

})();

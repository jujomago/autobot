'use strict';
(function () {
    let _$state,_$stateParams;
    let _ListsService;
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
    class MainSettings {
        constructor($state, $stateParams) {
            _$state = $state;
            _$stateParams = $stateParams;
            this.name = _$stateParams.name;
            this.isUpdate = $stateParams.isUpdate;
            this.advancedOptions = {isCollapsed: true};
        }
        sendConfiguration(){
          _$state.go('ap.al.listsEdit-list', {name: this.name});
        }

    }


    MainSettings.$inject = ['$state', '$stateParams' ];

    angular.module('fakiyaMainApp')
        .component('mainSettings', {
            templateUrl: 'app/features/al/lists/edit/step1-settings/mainSettings/mainSettings.html',
            controller: MainSettings
        });

})();

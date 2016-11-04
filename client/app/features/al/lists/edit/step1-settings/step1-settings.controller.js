'use strict';
(function () {
    let _$state,_$stateParams;
    let _ListsService;
    class SettingsComponent {
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


    SettingsComponent.$inject = ['$state', '$stateParams', ];

    angular.module('fakiyaMainApp')
        .component('al.lists.settings', {
            templateUrl: 'app/features/al/lists/edit/step1-settings/step1-settings.html',
            controller: SettingsComponent
        });

})();

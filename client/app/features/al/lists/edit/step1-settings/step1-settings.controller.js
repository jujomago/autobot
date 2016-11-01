'use strict';
(function () {
    let _$state,_$stateParams, _Utils;
    class SettingsComponent {
        constructor($state, $stateParams, Utils) {
            _$state = $state;
            _$stateParams = $stateParams;
            _Utils = Utils;
            this.name = _$stateParams.name;
          console.log('state..', _$state);
          console.log('State Params. . . ', _$stateParams);
          console.log('_Utils. . . ', _Utils.getDataShared('ListAction'));
        }
        sendConfiguration(){
          _$state.go('ap.al.listsEdit-list', {name: this.name});
        }

    }


    SettingsComponent.$inject = ['$state', '$stateParams', 'Utils' ];

    angular.module('fakiyaMainApp')
        .component('al.lists.settings', {
            templateUrl: 'app/features/al/lists/edit/step1-settings/step1-settings.html',
            controller: SettingsComponent
        });

})();

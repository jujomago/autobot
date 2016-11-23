'use strict';
(function () {
    let _lodash,
        _$state,
        _$stateParams;

    class EditController {
        constructor(
            $state,
            $stateParams,
            lodash) {

            _lodash = lodash;
            _$state = $state;
            _$stateParams = $stateParams;
            this.name = _$stateParams.name;
            this.isUpdate = _$stateParams.action === 'update';
            this.advancedOptions = {isCollapsed: true};
            this.STEPS = {
                SETTING: {
                    index: 1,
                    key: 'Setting'
                },
                MAPPING: {
                    index: 2,
                    key: 'Mapping'
                },
                UPLOAD: {
                    index: 3,
                    key: 'Upload'
                }
            };
            this.currentStep = this.STEPS.SETTING;
            this.contactFields = null;
            this.settings = null;
        }

        $onInit() {
            if (!this.isUpdate) {
              this.currentStep = this.STEPS.UPLOAD;
            }
        }

        cancel(){
            _$state.go('ap.al.lists');
        }

        //Contact Fields
        getContactField() {
            return this.contactFields;
        }

        setContactField(contactFields) {
            this.contactFields = contactFields;
        }

        //Settings
        getSettings() {
            return this.settings;
        }

        setSettings(settings) {
            this.settings = settings;
        }

        isFirstStep() {
            return this.currentStep.index === 1;
        }

        getCurrentStep() {
            return this.currentStep.key;
        }

        //Previous Step
        handlePrevious() {
            let previous = (this.isFirstStep()) ? 0 : 1,
                indexPre = this.currentStep.index - previous;

            this.currentStep = _lodash.find(this.STEPS, function (value) {
              return value.index === indexPre;
            });
        }

        //Next Step
        handleNext() {
            let indexNext = this.currentStep.index + 1;

            this.currentStep = _lodash.find(this.STEPS, function (value) {
                return value.index === indexNext;
            });
        }
    }

    EditController.$inject = [
        '$state',
        '$stateParams',
        'lodash'
    ];

    angular.module('fakiyaMainApp')
        .component('al.lists.edit', {
            templateUrl: 'app/features/al/lists/edit/edit.html',
            controller: EditController
        });

})();

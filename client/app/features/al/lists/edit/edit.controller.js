'use strict';
(function () {
    let _$state,_$stateParams;
    let _ListsService;

    class EditController {
        constructor($state, $stateParams) {
            _$state = $state;
            _$stateParams = $stateParams;
            this.name = _$stateParams.name;
            this.isUpdate = _$stateParams.action === 'update';
            this.advancedOptions = {isCollapsed: true};
            this.isAdvancedOptions = false;


            this.currentStep = 1;
            this.STEP = {
              SETTING: {
                index: 1,
                isValid: false,
                key: 'Setting'
              },
              MAPPING: {
                index: 2,
                isValid: false,
                key: 'Mapping'
              },
              LIST: {
                index: 3,
                isValid: false,
                key: 'List'
              }
            };

          this.steps = ['one', 'two', 'three'];
          this.step = 0;
          this.wizard = {tacos: 2};


          this.contactFields;
        }
        sendConfiguration(){
          // _$state.go('ap.al.listsEdit-list', {name: this.name});
          _$state.go('ap.al.mapping', {settings:'',name:_$stateParams.name, manual: true});
        }

        cancel(){
          _$state.go('ap.al.lists');
        }

        //Contact Fields
        getContactField() {
          return this.contactFields;
        }

        setContactField(object) {
          this.contactFields = object;
        }

        //ADD WIZARD FUNCTIONS
        activeStep(step) {
          if(!step) {
            return;
          }

          $scope.$broadcast(step.key, {
            activate: true
          });
        }

        isFirstStep = function () {
          return this.step === 0;
        };

        isLastStep = function () {
          return this.step === (this.steps.length - 1);
        };

        isCurrentStep = function (step) {
          return this.step === step;
        };

        setCurrentStep = function (step) {
          this.step = step;
        };

        getCurrentStep = function () {
          return this.steps[this.step];
        };

        getNextLabel = function () {
          return (this.isLastStep()) ? 'Submit' : 'Next';
        };

        handlePrevious = function () {
          this.step -= (this.isFirstStep()) ? 0 : 1;
        };

        //Next Step
        handleNext = function () {
          this.step += 1;
          // if (this.isAdvancedOptions) {
          //   this.step += 1;
          // } else {
          //   this.step = this.steps.length - 1;
          // }
        }

    }


  EditController.$inject = ['$state', '$stateParams', ];

    angular.module('fakiyaMainApp')
        .component('al.lists.edit', {
            templateUrl: 'app/features/al/lists/edit/edit.html',
            controller: EditController
        });

})();

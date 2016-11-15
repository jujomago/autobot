'use strict';
(function() {

    let _$stateParams, _$state, _$scope, _$timeout,_ContactFieldsService, _ListService, _;

    class MappingUpdateController {

        constructor($scope,
                    $stateParams,
                    $state,
                    $timeout,
                    lodash,
                    ContactFieldsService,
                    ListsService,
                    ValidatorService
                    ) {
            _ = lodash;
            _$scope = $scope;
            _$stateParams = $stateParams;
            _$state = $state;
            _$timeout=$timeout;
            _ContactFieldsService = ContactFieldsService;
            _ListService = ListsService;
            this.ValidatorService = ValidatorService;
            this.hasHeader = true;
            this.delimiters = [
                { title: 'Comma', symbol: ',' },
                { title: 'Colon', symbol: ':' },
                { title: 'SemiColon', symbol: ';' },
                { title: 'Custom' }
            ];

            this.selectedDelimiter = this.delimiters[0];
            this.customDelimiterDefaultSymbol = ',';
            this.customDelimiterEnabled = false;
            this.contactFields = [];
            this.selectedRowRemovedIndex=-1;
            this.selectedRowRemovedName='';
            this.message = { show: false };
            this.loadingContacts = true;
            this.canMapping = false;
            this.selectedRow = -1;
            this.jsonCSV = [];
            this.jsonHeaders = [];
            this.selectedRowsMapped=[];
            this.sending = false;
            this.actionList='update';

        }

        $onInit() {
          this.setStateParams(_$stateParams);
          this.getContactFiels();
        }

        setStateParams(stateParams) {
            if (stateParams.name) {
                this.listName = stateParams.name;
            }
        }

        getContactFiels() {
          return _ContactFieldsService.getContactFields()
            .then(response => {
              if (response.statusCode === 200) {
                this.contactFields = response.data.filter(e => (e.mapTo === 'None'));
                this.initArrays();

                // this.loadingContacts = false;
              }
              else {
                this.message = { show: true, type: 'warning', text: response.errorMessage };
              }
              return response;
            })
            .catch(e => {
              this.message = { show: true, type: 'warning', text: e };
              return e;
            });
        }

        initArrays() {
            if (this.contactFields) {
                angular.forEach(this.contactFields, (el) => {
                    el.mappedName = null;
                    el.mappedIndex = 0;
                    if (el.name === 'number1') {
                        el.isKey = true;
                    } else {
                        el.isKey = false;
                    }
                });
            }
        }



      handlePrevious() {
        console.log('Parent Component . ..', this.parentComp);
        this.parentComp.handlePrevious();
        //this.parentComp.sendConfiguration();
      }

      // handleNext() {
      //   console.log('Parent Component . ..', this.parentComp);
      //   this.parentComp.handleNext();
      // }

        //FINISH MAPPING
        handleFinish() {

            let keysFields = _.filter(this.contactFields,{'isKey': true}),
                countKeys = keysFields.length;

            if(countKeys>0 && countKeys<13){
                let dataToSend = {};
                // if ( _$stateParams.settings.listDeleteSettings) {
                //     dataToSend.listDeleteSettings = _$stateParams.settings.listDeleteSettings;
                //     //dataToSend.fields = keysFields;
                // } else {
                //     dataToSend.listUpdateSettings = _$stateParams.settings.listUpdateSettings;
                //
                // }
                   dataToSend.fields = this.contactFields;

              console.log('DATA TO SEND. . ....',dataToSend);
                // _$state.go('ap.al.listsEdit-list', {settings:dataToSend, name: _$stateParams.name, manual: true});

              // _$state.go('ap.al.listsEdit-list', {name: this.name});

              this.parentComp.setContactField(this.contactFields);
              this.parentComp.handleNext();
               return dataToSend;
            }
            else {
                let messageText;
                if(countKeys===0){
                    messageText = 'At least one field must be marked as key';
                }
                else {
                    messageText = 'No more than 12 fields can be marked as key';
                }
                this.message = {type: 'warning', show: true, text: messageText, expires: 5000};
                return null;
            }

        }
    }

  MappingUpdateController.$inject = [
    '$scope',
    '$stateParams',
    '$state',
    '$timeout',
    'lodash',
    'ContactFieldsService',
    'ListsService',
    'ValidatorService'
  ];

  angular.module('fakiyaMainApp')
      .component('mappingUpdate', {
          require: {
            parentComp: '^al.lists.edit'
          },
          templateUrl: 'app/features/al/lists/edit/mapping/update/mapping.html',
          controller: MappingUpdateController
      });

})();

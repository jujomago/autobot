(function() {
    'use strict';

    let _,
        _$stateParams,
        _$state,
        _$scope,
        _$timeout,
        _ContactFieldsService,
        _Utils,
        _UtilsList,
        _ListService;

    class MappingListController {
        constructor(
            $scope,
            $stateParams,
            $state,
            $timeout,
            lodash,
            ContactFieldsService,
            ListsService,
            Utils,
            UtilsList,
            ValidatorService) {

            _ = lodash;
            _$scope = $scope;
            _$stateParams = $stateParams;
            _$state = $state;
            _$timeout=$timeout;
            _ContactFieldsService = ContactFieldsService;
            _Utils = Utils;
            _UtilsList = UtilsList;
            _ListService = ListsService;
            this.ValidatorService = ValidatorService;
            this.contactFields = [];
            this.message = { show: false };
            this.loadingContacts = true;
        }

        $onInit() {
            this.getContactFields();
        }

        getContactFields() {
            return _ContactFieldsService.getContactFields()
                .then(response => {
                    this.loadingContacts = false;

                    if (response.statusCode === 200) {

                        this.contactFields = _Utils.isUndefinedOrNull(response.data) ?
                                            [] : _UtilsList.loadDefaultKey(response.data);
                    }
                    else {
                        this.message = { show: true, type: 'warning', text: response.errorMessage };
                    }

                    return response;
                })
                .catch(e => {
                    this.loadingContacts = false;
                    this.message = { show: true, type: 'warning', text: e.errorMessage };
                    return e;
                });
        }

        handlePrevious() {
            this.parentComp.handlePrevious();
        }

        //FINISH MAPPING
        handleFinish() {
            let countKeys = _.filter(this.contactFields, {'isKey': true}).length;

            if (countKeys > 0 && countKeys < 13) {
                this.parentComp.setContactField(this.contactFields);
                this.parentComp.handleNext();
            }
            else {
                let messageText;

                messageText = countKeys === 0 ? 'At least one field must be marked as key' :
                                                'No more than 12 fields can be marked as key';

                this.message = {type: 'warning', show: true, text: messageText, expires: 5000};
            }
        }
    }

  MappingListController.$inject = [
        '$scope',
        '$stateParams',
        '$state',
        '$timeout',
        'lodash',
        'ContactFieldsService',
        'ListsService',
        'Utils',
        'UtilsList',
        'ValidatorService'
    ];

    angular.module('fakiyaMainApp')
        .component('alMappingList', {
            require: {
              parentComp: '^al.lists.edit'
            },
            templateUrl: 'app/features/al/lists/edit/mapping/mapping.html',
            controller: MappingListController
        });

})();

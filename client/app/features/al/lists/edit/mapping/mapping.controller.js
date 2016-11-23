(function() {
    'use strict';

    let _ContactFieldsService,
        _Utils,
        _EditListActions;

    class MappingListController {
        constructor(
            ContactFieldsService,
            Utils,
            EditListActions
            ) {
            _ContactFieldsService = ContactFieldsService;
            _Utils = Utils;
            _EditListActions = EditListActions;
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
                                            [] : _EditListActions.loadDefaultKey(response.data);
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
            this.parent.handlePrevious();
        }

        //FINISH MAPPING
        handleFinish() {
            let countKeys = _.filter(this.contactFields, {'isKey': true}).length;

            if (countKeys > 0 && countKeys < 13) {
                this.parent.setContactField(this.contactFields);
                this.parent.handleNext();
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
        'ContactFieldsService',
        'Utils',
        'EditListActions'
    ];

    angular.module('fakiyaMainApp')
        .component('alMappingList', {
            require: {
              parent: '^al.lists.edit'
            },
            templateUrl: 'app/features/al/lists/edit/mapping/mapping.html',
            controller: MappingListController
        });

})();

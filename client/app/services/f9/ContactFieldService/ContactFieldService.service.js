'use strict';
(function () {
    let _$http;

    class ContactFieldsService {
        constructor($http, appConfig) {
            this.endPointUrl = '/f9/contacts/fields';
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri + this.endPointUrl;
            }

            _$http = $http;
        }
        getContactFields() {

            var result = { data: null, statusCode: 200, errorMessage: null };

            return _$http.get(this.endPointUrl)
                .then(response => {
                    if (response.data) {
                        result.data = response.data.return;
                        return result;
                    }
                })
                .catch(error => {
                    result.statusCode = error.status;
                    result.errorMessage = error.data.body;
                    return result;
                });
        }    

    }

    ContactFieldsService.$inject = ['$http','appConfig'];
    angular.module('fakiyaMainApp')
        .service('ContactFieldsService', ContactFieldsService);

})();
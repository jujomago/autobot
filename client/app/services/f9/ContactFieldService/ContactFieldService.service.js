'use strict';
(function () {
    let _$http, _HandleError;
    class ContactFieldsService {
        constructor($http, HandleError, appConfig) {
            this.endPointUrl = '/f9/contacts/fields';
            _HandleError = HandleError;
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri + this.endPointUrl;
            }

            _$http = $http;
        }
        getContactFields() {

            var result = { data: null, statusCode: 200, errorMessage: null };

            return _$http.get(this.endPointUrl)
                .then(response => {
                    console.log(response.data.return);
                    if (response.data) {
                        result.data = response.data.return;
                        return result;
                    }
                })
                .catch(err => _HandleError(err, result));
        }    

    }

    ContactFieldsService.$inject = ['$http', 'HandleError','appConfig'];
    angular.module('fakiyaMainApp')
        .service('ContactFieldsService', ContactFieldsService);

})();
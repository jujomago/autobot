'use strict';
(() => {
    let _$http,_HandleError,_$location;

    class ContactService {

        constructor($http, appConfig, HandleError, $location) {
            _$http = $http;           
            _HandleError = HandleError;
            _$location = $location;
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri;
            }
        }

        getCompanies() {
            let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.get(this.endPointUrl + '/admin/companies')
                .then(response => {
                    if (response.status === 200) {
                      return response.data;
                    }
                })
                .catch(err => _HandleError(err, result));
        }  
    }

    ContactService.$inject = ['$http', 'appConfig', 'HandleError', '$location'];
    angular.module('fakiyaMainApp')
        .service('ContactService', ContactService);
})();

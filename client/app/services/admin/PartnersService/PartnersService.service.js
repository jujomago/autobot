'use strict';
(function () {
    let _$http,_HandleError;
    class PartnersService {
        constructor($http, HandleError, appConfig) {
            this.endPointUrl = '/admin/users';
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri + this.endPointUrl;
            }
            _HandleError = HandleError;
            _$http = $http;
        }
        partnerLogin(credentials) {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            return _$http.post(this.endPointUrl+'/auth', credentials)
                .then(response => {
                    result.data = response.data.return;
                    return result;
                })
                .catch(error => _HandleError(error, result));
        }
        addAppToPartner(appAccount) {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            return _$http.post(this.endPointUrl + '/partner/app', appAccount)
                .then(response => {
                    result.data = response.data.return;
                    return result;
                })
                .catch(error => _HandleError(error, result));
        }
    }
    PartnersService.$inject = ['$http','HandleError','appConfig'];
	angular.module('fakiyaMainApp')
	  .service('PartnersService',PartnersService);
})();

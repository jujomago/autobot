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
                    console.log(response);
                    result.data = response.data;
                    return result;
                })
                .catch(error => _HandleError(error, result));
        }

        getLastUsedPartnerAccount(partnerName){
            var result = { data: null, statusCode: 200, errorMessage: '' };
            return _$http.get(this.endPointUrl+'/partner/'+partnerName+'/lastusedaccount')
                .then(response => {
                    result.data = response.data;
                    return result;
                })
                .catch(error => _HandleError(error, result));
        }
        // When we need to get different partners, we need to update the endpoint call
        getPartnerAccounts(){
          let result = { data: null, statusCode: 200, errorMessage: null };
          return _$http.get(this.endPointUrl+'/partners/f9/accounts')
            .then(response => {
              result.data = response.data;
              return result;
            })
            .catch(err => _HandleError(err, result));
        }
    }
    PartnersService.$inject = ['$http','HandleError','appConfig'];
	angular.module('fakiyaMainApp')
	  .service('PartnersService',PartnersService);
})();

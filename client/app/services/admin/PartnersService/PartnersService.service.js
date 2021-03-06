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

        getPartnerAccounts(partnerName){
          let result = { data: null, statusCode: 200, errorMessage: null };
          return _$http.get(this.endPointUrl+'/partners/'+partnerName+'/accounts')
            .then(response => {
              result.data = response.data;
              return result;
            })
            .catch(err => _HandleError(err, result));
        }

        partnerAccountSubscription(partnerInfo) {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            return _$http.post(this.endPointUrl+'/partner/app', partnerInfo)
                .then(response => {
                    result.data = response.data;
                    return result;
                })
                .catch(error => _HandleError(error, result));
        }
    }
    PartnersService.$inject = ['$http','HandleError','appConfig'];
	angular.module('fakiyaMainApp')
	  .service('PartnersService',PartnersService);
})();

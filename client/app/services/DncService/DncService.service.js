'use strict';
(function () {
    let _$http,_HandleError, _$q;
    class DncService {
        constructor($http, HandleError, appConfig) {
            this.endPointUrl = '/dnc/scrubs';
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri + this.endPointUrl;
            }
            _HandleError = HandleError;
            _$http = $http;
        }
        getDNC(loginId, phones) {
            let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.get(this.endPointUrl+'/'+loginId, {params: {phonelist: phones}})
            .then(response => {
                result.data = response.data;
                return result;
            })
            .catch(err => _HandleError(err, result));
        }
    }
    DncService.$inject = ['$http','HandleError','appConfig'];
	angular.module('fakiyaMainApp')
	  .service('DncService', DncService);
})();


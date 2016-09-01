'use strict';
(function () {
    let _$http,_HandleError;

    class DispositionsService {
        constructor($http, HandleError, appConfig) {
            this.endPointUrl = '/f9/dispositions';
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri + this.endPointUrl;
            }
            _HandleError=HandleError;
            _$http = $http;
        }

        getDispositions() {

            var result = { data: null, statusCode: 200, errorMessage: '' };

            return _$http.get(this.endPointUrl)
                .then(response => {
                    if (response.data) {
                        result.data = response.data.return;
                        return result;
                    }
                })
                .catch(err => _HandleError(err, result));
        }
        getDisposition(dispositionName) {

            var result = { data: null, statusCode: 200, errorMessage: '' };

            return _$http.get(this.endPointUrl+'/'+dispositionName)
                .then(response => {
                    if (response.data) {
                        result.data = response.data.return;
                        return result;
                    }
                })
                .catch(err => _HandleError(err, result));
        }
        deleteDisposition(disposition) {
            var result = { data: null, statusCode: 204, errorMessage: '' };
            return _$http.delete(this.endPointUrl + '/' + disposition.name)
                .then(response => {
                    if (response.status !== 204) {
                        result.statusCode = response.status;
                        result.data = response;
                    }
                    return result;
                })
                .catch(err => _HandleError(err, result));
        }

        createDisposition(newDisposition) {
          let result = { data: null, statusCode: 201, errorMessage: null };
          return _$http.post(this.endPointUrl, {disposition: newDisposition})
            .then(() => result)
            .catch(err => _HandleError(err, result));
        }
        updateDisposition(disposition) {
          let result = { data: null, statusCode: 200, errorMessage: null };
          return _$http.put(this.endPointUrl+'/'+disposition.oldName,{disposition:  disposition})
            .then(() => result)
            .catch(err => _HandleError(err, result));
        }

    }
    DispositionsService.$inject = ['$http','HandleError','appConfig'];
	angular.module('fakiyaMainApp')
	  .service('DispositionsService',DispositionsService);
})();
'use strict';
(function () {
    let http,_q;

    //let endPointUrl = 'http://localhost:9000/api/f9/skills';
      function handleError(err, result) {
        result.errorMessage = err.data.error;
        result.statusCode = err.status;
        //return result;
        let defered = _q.defer();
        let promise = defered.promise;
        defered.reject(result);    
        return promise;
      }
    class DispositionsService {
        constructor($http, $q, appConfig) {
            this.endPointUrl = '/f9/dispositions';
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri + this.endPointUrl;
            }
            _q=$q;
            http = $http;
        }

        getDispositions() {

            var result = { data: null, statusCode: 200, errorMessage: '' };

            return http.get(this.endPointUrl)
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
        getDisposition(dispositionName) {

            var result = { data: null, statusCode: 200, errorMessage: '' };

            return http.get(this.endPointUrl+'/'+dispositionName)
                .then(response => {
                    if (response.data) {
                        result.data = response.data.return;
                        return result;
                    }
                })
                .catch(err => handleError(err, result));
        }
        deleteDisposition(disposition) {
            var result = { data: null, statusCode: 204, errorMessage: '' };
            return http.delete(this.endPointUrl + '/' + disposition.name)
                .then(response => {
                    if (response.status !== 204) {
                        result.statusCode = response.status;
                        result.data = response;
                    }
                    return result;
                })
                .catch(err => {
                    result.statusCode = err.status;
                    result.errorMessage = err.data.error;
                    return result;
                });
        }

        createDisposition(newDisposition) {
          let result = { data: null, statusCode: 201, errorMessage: null };
          return http.post(this.endPointUrl, {disposition: newDisposition})
            .then(() => result)
            .catch(err => handleError(err, result));
        }
        updateDisposition(disposition) {
          let result = { data: null, statusCode: 200, errorMessage: null };
          return http.put(this.endPointUrl+'/'+disposition.oldName,{disposition:  disposition})
            .then(() => result)
            .catch(err => handleError(err, result));
        }

    }
    DispositionsService.$inject = ['$http','$q','appConfig'];
	angular.module('fakiyaMainApp')
	  .service('DispositionsService',DispositionsService);
})();
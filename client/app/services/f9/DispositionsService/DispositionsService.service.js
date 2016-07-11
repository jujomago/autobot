'use strict';
(function () {
    let http;

    //let endPointUrl = 'http://localhost:9000/api/f9/skills';

    class DispositionsService {
        constructor($http, appConfig) {
            this.endPointUrl = '/f9/dispositions';
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri + this.endPointUrl;
            }

            http = $http;
        }

        getDispositions() {

            var result = { data: null, statusCode: 200, errorMessage: '' };

            return http.get(this.endPointUrl)
                .then(response => {
                console.log('response in SERVICE');
                console.log(response);
                    if (response.data) {
                        result.data = response.data.return;
                        return result;
                    }
                })
                .catch(error => {
                    console.log('response in SERVICE ERROR');
                    console.log(error);
                    result.statusCode = error.status;
                    result.errorMessage = error.data.body;
                    return result;
                });
        }
        deleteDisposition(disposition) {
            var result = { data: null, statusCode: 204, errorMessage: '' };
            return http.delete(this.endPointUrl + '/' + disposition.name)
                .then(response => {
                    console.log('response in service');
                    console.log(response);
                    if (response.status !== 204) {
                        result.statusCode = response.status;
                        result.data = response;
                    }
                    return result;
                })
                .catch(err => {
                    console.log('response in SERVICE ERROR');
                    console.log(err);
                    result.statusCode = err.status;
                    result.errorMessage = err.data.body;
                    return result;
                });
        }

    }
    DispositionsService.$inject = ['$http','appConfig'];
	angular.module('fakiyaMainApp')
	  .service('DispositionsService',DispositionsService);
})();
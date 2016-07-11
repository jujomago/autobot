'use strict';
(function () {
    let http;

    //let endPointUrl = 'http://localhost:9000/api/f9/skills';

    class ListsService {
        constructor($http, appConfig) {
            this.endPointUrl = '/f9/lists';
            if (appConfig.apiUri) {
                console.log('APPCONFIG VALUE=========>>>>>>> ' + appConfig.apiUri);
                console.log('CONCATENATED VALUE=========>>>>>>> ' + appConfig.apiUri + '/f9/lists');
                this.endPointUrl = appConfig.apiUri + this.endPointUrl;
            }

            http = $http;
        }

        getLists() {

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
        deleteList(list) {
            console.log('list name in service');
            console.log(list.name);
      
            var result = { data: null, statusCode: 204, errorMessage: '' };
            return http.delete(this.endPointUrl +'/'+ list.name)
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
                    console.log('ERROR IN DELETE LIST');
                    console.log(err);
                    err.statusCode = err.status;
                    err.errorMessage = err.data.body;
                    return err;
                });
        }
        
      

    }

    ListsService.$inject = ['$http','appConfig'];
    angular.module('fakiyaMainApp')
        .service('ListsService', ListsService);

})();
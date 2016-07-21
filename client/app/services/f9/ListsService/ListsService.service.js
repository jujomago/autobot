'use strict';
(function () {
    let _$http;

    class ListsService {
        constructor($http, appConfig) {
            this.endPointUrl = '/f9/lists';
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri + this.endPointUrl;
            }

            _$http = $http;
        }

        getList(name) {

            var result = { data: null, statusCode: 200, errorMessage: '' };
            console.log(this.endPointUrl + '/' + name);
            return _$http.get(this.endPointUrl + '/' + name)
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
        getCSV(path) {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            return _$http.get(path)
                .then(response => {
                    if (response) {
                        if(typeof response.data !== 'string'){
                            result.data = JSON.stringify(response.data);
                        }
                        else{
                            result.data = response.data;                            
                        }

                        return result;
                    }
                })
                .catch(() => {
                    result.statusCode = 403;
                    result.errorMessage = 'Couldn\'t open csv file';
                    return result;
                });
        }
        getLists() {

            var result = { data: null, statusCode: 200, errorMessage: '' };

            return _$http.get(this.endPointUrl)
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
            return _$http.delete(this.endPointUrl +'/'+ list.name)
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
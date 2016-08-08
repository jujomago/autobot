'use strict';
(function () {
    let _$http, _$q;
    function _handleError(err, result) {
        result.errorMessage = err.data;
        result.statusCode = err.status;
        let defered = _$q.defer();
        let promise = defered.promise;
        defered.reject(result);    
        return promise;
    }
    class ListsService {
        constructor($http, $q, appConfig) {
            this.endPointUrl = '/f9/lists';
            _$q = $q;
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
        createList(list) {

            var result = { data: null, statusCode: 201, errorMessage: '' };

            return _$http.post(this.endPointUrl, list)
                .then(response => {
                        result.data = response.data;
                        return result;
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
        isImportRunning(identifier, waitTime) {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            let isRunningPath = this.endPointUrl +'/contacts/result/running/'+ identifier;
            if(waitTime){
                isRunningPath+='?waitTime='+waitTime;
            }
            return _$http.get(isRunningPath)
                .then(response => {
                    result.statusCode = response.status;
                    result.data = response.data.return;
                    return result;
                })
                .catch(err => _handleError(err, result));
        }

        getResult(identifier) {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            return _$http.get(this.endPointUrl +'/contacts/result/'+ identifier)
                .then(response => {
                    result.statusCode = response.status;
                    result.data = response.data.return;
                    return result;
                })
                .catch(err => _handleError(err, result));
        }

        addContacts(contacts){
            var result = { data: null, statusCode: 201, errorMessage: '' };

            return _$http.post(this.endPointUrl+'/contacts', contacts)
                .then(response => {
                        result.data = response.data;
                        return result;
                })
                .catch(error => {
                    result.statusCode = error.status;
                    result.errorMessage = error.data.body;
                    return result;
                });
        }

        deleteContacts(contacts) {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            
            return _$http({
                method: 'DELETE',
                url: this.endPointUrl +'/contacts/delete',
                data: contacts,
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            }).then(response => {
                     result.data = response.data;
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

    ListsService.$inject = ['$http', '$q','appConfig'];
    angular.module('fakiyaMainApp')
        .service('ListsService', ListsService);

})();
'use strict';
(function () {
    let _$http, _HandleError;
    class ListsService {
        constructor($http, HandleError, appConfig) {
            this.endPointUrl = '/f9/lists';
            _HandleError = HandleError;
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri + this.endPointUrl;
            }

            _$http = $http;
        }

        getList(name) {

            var result = { data: null, statusCode: 200, errorMessage: '' };
            return _$http.get(this.endPointUrl + '/' + name)
                .then(response => {
                    if (response.data) {
                        result.data = response.data.return;
                    }
                    else{
                        result.data = 'error getting list';
                        result.statusCode = 404;
                    }
                    return result;
                })
                .catch(err => _HandleError(err, result));
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
                .catch(err => _HandleError(err, result));
        }
        createList(list) {
            var result = { data: null, statusCode: 201, errorMessage: '' };

            return _$http.post(this.endPointUrl, list)
                .then(response => {
                        result.data = response.data;
                        return result;
                })
                .catch(err => _HandleError(err, result));
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
                .catch(err => _HandleError(err, result));
        }
        isImportRunning(identifier, waitTime) {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            let isRunningPath = this.endPointUrl +'/importrunning/'+ identifier;
            if(waitTime){
                isRunningPath+='?waitTime='+waitTime;
            }
            return _$http.get(isRunningPath)
                .then(response => {
                    result.statusCode = response.status;
                    result.data = response.data.return;
                    return result;
                })
                .catch(err => _HandleError(err, result));
        }

        getResult(identifier) {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            return _$http.get(this.endPointUrl +'/importresults/'+ identifier)
                .then(response => {
                    result.statusCode = response.status;
                    result.data = response.data.return;
                    return result;
                })
                .catch(err => _HandleError(err, result));
        }

        addContacts(contacts){
            var result = { data: null, statusCode: 201, errorMessage: '' };

            return _$http.post(this.endPointUrl+'/'+contacts.listName+'/records', contacts)
                .then(response => {
                        result.data = response.data;
                        return result;
                })
                .catch(err => _HandleError(err, result));
        }

        deleteContacts(contacts) {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            
            return _$http({
                method: 'DELETE',
                url: this.endPointUrl +'/'+contacts.listName+'/records',
                data: contacts,
                headers: {'Content-Type': 'application/json;charset=utf-8'}
            }).then(response => {
                     result.data = response.data;
                     return result;
                })
                .catch(err => _HandleError(err, result));
        }
    }

    ListsService.$inject = ['$http', 'HandleError','appConfig'];
    angular.module('fakiyaMainApp')
        .service('ListsService', ListsService);

})();
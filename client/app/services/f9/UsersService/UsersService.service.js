'use strict';
(function () {
    let _$http,_HandleError;
    class UsersService {
        constructor($http, appConfig, HandleError) {
            _HandleError = HandleError;
            this.endPointUrl = '/f9/admin/users';
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri + this.endPointUrl;
            }
            _$http = $http;
        }
        getUsers() {
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
        getUser(userName) {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            return _$http.get(this.endPointUrl + '/' + userName)
                .then(response => {
                    if (response.data) {
                        return response.data.return[0];
                    }
                    return null;
                })
                .catch(err => _HandleError(err, result));
        }

        getUserDetail(userName) {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            return _$http.get(this.endPointUrl + '/detail/' + userName)
                .then(response => {
                    if (response.data) {
                        return response.data.return[0];
                    }
                    return null;
                })
                .catch(err => _HandleError(err, result));
        }

        addSkilltoUser(userSkill) {
            var result = { data: null, statusCode: 201, errorMessage: '' };
            return _$http.post(this.endPointUrl + '/' + userSkill.userName + '/skills', userSkill)
                .then(response => {
                    if (response.status !== 201) {
                        result.statusCode = response.status;
                        result.data = response.data;
                    }
                    return result;
                })
                .catch(err => _HandleError(err, result));
        }

        deleteSkillfromUser(userSkill) {
            var result = { data: null, statusCode: 204, errorMessage: '' };
            return _$http({
                url: this.endPointUrl + '/' + userSkill.userName + '/skills',
                method: 'DELETE',
                data: userSkill,
                headers: { 'Content-Type': 'application/json;charset=utf-8' }
                })
                .then(response => {
                    if (response.status !== 204) {
                        result.statusCode = response.status;
                        result.data = response;
                    }
                    return result;
                })
                .catch(err => _HandleError(err, result));
        }

        updateSkillfromUser(userSkill) {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            return _$http.put(this.endPointUrl + '/' + userSkill.userName +'/skills', userSkill)
                .then(response => {
                    if (response.status !== 200) {
                        result.statusCode = response.status;
                        result.data = response;
                    }
                    return result;
                })
                .catch(err => _HandleError(err, result));
        }

        createUser(userInfo) {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            return _$http.post(this.endPointUrl, userInfo)
                .then(r => {
                    if (r.data.response) { // some error generally in response
                        result.statusCode = r.data.response.statusCode;
                        result.errorMessage = r.data.body;
                    } else {
                        result.data = r.data.return;
                    }
                    return result;
                })
                .catch(err => _HandleError(err, result));
        }

        updateUser(userInfo) {
            let userName = userInfo.userGeneralInfo.userName;
            var result = { data: null, statusCode: 200, errorMessage: '' };
            return _$http.put(this.endPointUrl + '/' + userName, userInfo)
                .then(response => {
                    result.data = response.data.return;
                    return result;
                })
                .catch(err => _HandleError(err, result));
        }


        deleteUser(userName) {
            var result = { data: null, statusCode: 204, errorMessage: '' };
            return _$http.delete(this.endPointUrl + '/' + userName)
                .then(response => {
                    if (response.status !== 204) {
                        result.statusCode = response.status;
                        result.data = response.data;
                    }
                    return result;
                })
                .catch(err => _HandleError(err, result));
        }

        getPermissions() {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            return _$http.get('/assets/al/json/roles.json')
                .then(response => {
                    if (response.data) {
                        return response.data;
                    }
                    return null;
                })
                .catch(err => _HandleError(err, result));
        }
    }

    UsersService.$inject = ['$http', 'appConfig', 'HandleError'];
    angular.module('fakiyaMainApp')
        .service('UsersService', UsersService);

})();

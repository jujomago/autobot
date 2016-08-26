'use strict';
(() => {
    let _$http, _$cookies, _$q;
    function _handleError(err, result) {
        result.errorMessage = err.data;
        result.statusCode = err.status;
        let defered = _$q.defer();
        let promise = defered.promise;
        defered.reject(result);    
        return promise;
    }
    class AuthService {

        constructor($cookies, $http, $q, appConfig) {
            _$http = $http;
            _$cookies = $cookies;
            _$q=$q;
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri;
            }
        }

        login(credentials) {
            return _$http.post(this.endPointUrl + '/auth/login', credentials)
                .then(response => {
                    if (response.status === 200) {
                        if (_$cookies.get('auth_token') === undefined) {
                            _$cookies.put('auth_token', response.data);
                        }
                        return response;
                    }
                    throw Error(response);
                })
                .catch(e => e);
        }
        loginApplication(credentialsApp) {
            return _$http.post(this.endPointUrl + '/admin/users/auth', credentialsApp)
                .then(response => {
                    if (response.status === 200) {
                        return response;
                    }
                })
                .catch(error=>error);
        }
        logout() {
            let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.get(this.endPointUrl + '/auth/logout')
                .then(response => {
                    console.log('cleaning cookie');
                    _$cookies.remove('auth_token');
                    return response;
                })
                .catch(e => _handleError(e, result));
        }
    }

    AuthService.$inject = ['$cookies', '$http', '$q', 'appConfig'];

    angular.module('fakiyaMainApp')
        .service('AuthService', AuthService);
})();

'use strict';
(() => {
    let _$http, _$cookies, _$q, _authManager;
    function _handleError(err, result) {
        result.errorMessage = err.data;
        result.statusCode = err.status;
        let defered = _$q.defer();
        let promise = defered.promise;
        defered.reject(result);
        return promise;
    }
  
    class AuthService {

        constructor($cookies, $http, $q, appConfig, authManager) {
            _$http = $http;
            _$cookies = $cookies;
            _$q = $q;
            _authManager = authManager;
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri;
            }
        }
        
        isAuthenticated(){
            return(_$cookies.put('auth_token'))?true:false;
        }

        login(credentials) {
            return _$http.post(this.endPointUrl + '/auth/login', credentials)
                .then(response => {
                    if (response.status === 200) {                         
                        if (_$cookies.get('auth_token') === undefined) {                       
                            _$cookies.put('auth_token', response.data);
                            _authManager.authenticate();
                        }
                        return response;
                    }
                    throw Error(response);
                })
                .catch(e => e);
        }
        renewToken(oldToken) {
            return _$http.put(this.endPointUrl + '/auth/refresh-token', { token: oldToken })
                .then(response => {
                    if (response.status === 200) {
                        _$cookies.put('auth_token', response.data);
                        _authManager.authenticate();
                        
                        return response.data;
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
                .catch(error => error);
        }
        logout() {
            let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.get(this.endPointUrl + '/auth/logout')
                .then(response => {
                    console.log('cleaning cookie');
                    _$cookies.remove('auth_token');
                    _authManager.unauthenticate();
                    return response;
                })
                .catch(e => _handleError(e, result));
        }
    }

    AuthService.$inject = ['$cookies', '$http', '$q', 'appConfig', 'authManager'];

    angular.module('fakiyaMainApp')
        .service('AuthService', AuthService);
})();

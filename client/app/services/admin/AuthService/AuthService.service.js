'use strict';
(() => {
    let _$http, _$cookies, _authManager,_HandleError;

  
    class AuthService {

        constructor($cookies, $http, appConfig, authManager,HandleError) {
            _$http = $http;
            _$cookies = $cookies;          
            _authManager = authManager;
            _HandleError = HandleError;
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri;
            }
        }
        
        isAuthenticated(){
             return(_$cookies.get('auth_token'))?true:false;
        }

        login(credentials) {
            let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.post(this.endPointUrl + '/auth/login', credentials)
                .then(response => {
                    if (response.status === 200) {                         
                        if (_$cookies.get('auth_token') === undefined) {                       
                            _$cookies.put('auth_token', response.data);
                            _authManager.authenticate();
                        }
                        return response;
                    }                  
                })
                .catch(err => _HandleError(err, result));
        }
        renewToken(oldToken) {
            let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.put(this.endPointUrl + '/auth/refresh-token', { token: oldToken })
                .then(response => {
                    if (response.status === 200) {
                        _$cookies.put('auth_token', response.data);
                        _authManager.authenticate();            
                    }
                    return response;                  
                })
                .catch(err => _HandleError(err, result));
        }
        loginApplication(credentialsApp) {
            let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.post(this.endPointUrl + '/admin/users/auth', credentialsApp)
                .then(response => {
                    if (response.status === 200) {
                        return response;
                    }
                })
                .catch(err => _HandleError(err, result));
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
                .catch(err => _HandleError(err, result));
        }
    }

    AuthService.$inject = ['$cookies', '$http', 'appConfig', 'authManager','HandleError'];

    angular.module('fakiyaMainApp')
        .service('AuthService', AuthService);
})();

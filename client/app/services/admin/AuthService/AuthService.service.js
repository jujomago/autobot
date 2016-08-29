'use strict';
(() => {
    let _$http, _$cookies, _$localStorage, _$q,_authManager;
    function _handleError(err, result) {
        result.errorMessage = err.data;
        result.statusCode = err.status;
        let defered = _$q.defer();
        let promise = defered.promise;
        defered.reject(result);    
        return promise;
    }
    class AuthService {

        constructor($cookies, $localStorage, $http, $q, appConfig , authManager) {
            _$http = $http;
            _$cookies = $cookies;
            _$localStorage=$localStorage;
            _$q=$q;
            _authManager=authManager;
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri;
            }
        }

        login(credentials) {
            return _$http.post(this.endPointUrl + '/auth/login', credentials)
                .then(response => {
                    if (response.status === 200) {
                        if (_$cookies.get('auth_token') === undefined) {
                            
                            let expDate = new Date();
                            let minutes = 30;
                            expDate.setTime(expDate.getTime() + (minutes * 60 * 1000));
                            
                            _$cookies.put('auth_token', response.data ,{
                                expires:expDate
                            });
                            _$localStorage.userCred=credentials;
                            _authManager.authenticate();
                        
                        }
                        return response;
                    }
                    throw Error(response);
                })
                .catch(e => e);
        }
        renewToken(){
            this.login(_$localStorage.userCred);
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
                    _authManager.unauthenticate();
                    return response;
                })
                .catch(e => _handleError(e, result));
        }
    }

    AuthService.$inject = ['$cookies', '$localStorage', '$http', '$q', 'appConfig' ,'authManager'];

    angular.module('fakiyaMainApp')
        .service('AuthService', AuthService);
})();

'use strict';
(() => {
    let _$http, _$cookies;
    class AuthService {

        constructor($cookies, $http, appConfig) {
            _$http = $http;
            _$cookies = $cookies;
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
                .catch(error => {
                    throw error;
                });
        }
        logout() {
            return _$http.get(this.endPointUrl + '/auth/logout')
                .then(response => {
                    if (response.status === 200) {
                        console.log('cleaning cookie');
                        _$cookies.remove('auth_token');
                        return response;
                    }
                    return null;
                });

        }
    }

    AuthService.$inject = ['$cookies', '$http', 'appConfig'];

    angular.module('fakiyaMainApp')
        .service('AuthService', AuthService);
})();

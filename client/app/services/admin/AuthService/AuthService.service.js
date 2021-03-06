'use strict';
(() => {
    let _$http, _$cookies, _authManager,_jwtHelper,_HandleError,_$location;

    function _setCookieToken(token,type){
        if(type==='persistent'){
            let tokenDate = _jwtHelper.getTokenExpirationDate(token);
            let expDate=new Date(tokenDate);
            _$cookies.put('auth_token',token,{'expires': expDate});
        }else{
            _$cookies.put('auth_token',token);
        }
    }
    class AuthService {

        constructor($cookies, $http, appConfig, authManager,jwtHelper,HandleError, $location) {
            _$http = $http;
            _$cookies = $cookies;
            _authManager = authManager;
            _jwtHelper=jwtHelper;
            _HandleError = HandleError;
            _$location = $location;
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri;
            }
        }

        isAuthenticated(){
            if(_$cookies.get('auth_token') && !_jwtHelper.isTokenExpired(_$cookies.get('auth_token'))){
                return true;
            }
            return false;
        }

        login(credentials) {
            let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.post(this.endPointUrl + '/auth/login', credentials)
                .then(response => {
                    if (response.status === 200) {
                        if (!_$cookies.get('auth_token')) {
                            _setCookieToken(response.data,'session');
                            _authManager.authenticate();
                        }
                        return response;
                    }
                })
                .catch(err => _HandleError(err, result));
        }
        register(reg) {
            let result = { data: null, statusCode: 201, errorMessage: null };
            return _$http.post(this.endPointUrl + '/admin/temporaryusers', reg)
                .then(response => {
                    if (response.status === 201) {
                      return response;
                    }
                })
                .catch(err => _HandleError(err, result));
        }
        getCompanies() {
            let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.get(this.endPointUrl + '/admin/companies')
                .then(response => {
                    if (response.status === 200) {
                      return response.data;
                    }
                })
                .catch(err => _HandleError(err, result));
        }
        activate(activationCode) {
            let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.get(this.endPointUrl + '/admin/temporaryusers/'+activationCode)
                .then(response => {
                    if (response.status === 200) {
                      return response.data;
                    }
                })
                .catch(err => _HandleError(err, result));
        }
        createUser(newuser) {
            let result = { data: null, statusCode: 201, errorMessage: null };
            return _$http.post(this.endPointUrl + '/admin/users', newuser)
                .then(response => {
                    if (response.status === 201) {
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
                         _setCookieToken(response.data,'session');
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
                    _$cookies.remove('auth_token');
                    _authManager.unauthenticate();
                    return response;
                })
                .catch(err => _HandleError(err, result));
        }
        getProfile(){
            let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.get(this.endPointUrl + '/admin/users/profile')
                .then(response => {
                    result.data = response.data;
                    return result;
                })
                .catch(err => _HandleError(err, result));
        }
    }

    AuthService.$inject = ['$cookies', '$http', 'appConfig', 'authManager', 'jwtHelper','HandleError', '$location'];

    angular.module('fakiyaMainApp')
        .service('AuthService', AuthService);
})();

'use strict';

(function () {

  let _auth,_Base64Manager, _$location, _$stateParams, _RefreshToken;
  class LoginController {

    constructor($location, $stateParams, AuthService, Base64Manager, RefreshToken) {

      this.username = '';
      this.password = '';
      this.message = { show: false };
      _auth = AuthService;
      _$location = $location;
      _$stateParams = $stateParams;
      _Base64Manager = Base64Manager;
      _RefreshToken = RefreshToken;
    }

    login() {
      // {'username':'admin@autoboxcorp.com', 'password' : 'Password1'};
      let credentials = {
        'username': this.username,
        'password': this.password
      };
      return _auth.login(credentials)
      .then(response => {
        _RefreshToken.checkToken();
        let decoded;
        if(_$stateParams.url && (decoded = _Base64Manager.decode(_$stateParams.url))){
          _$location.url(decoded).search('url', null);
        }else{
          _$location.url('/ap/dashboard').search('url', null);
        }
        return response;
      })
      .catch(e => {
        this.message = { show: true, text: e.errorMessage || e, type: 'danger' };   
        return e;
      });
    }
  }

  LoginController.$inject = ['$location', '$stateParams', 'AuthService', 'Base64Manager', 'RefreshToken'];



  angular.module('fakiyaMainApp')
    .component('login', {
      templateUrl: 'app/site/login/login.html',
      controller: LoginController
    });

})();

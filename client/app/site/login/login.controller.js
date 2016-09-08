'use strict';

(function () {

  let _auth,_Base64Manager, _$location, _$stateParams;
  class LoginController {

    constructor($location, $stateParams, AuthService, Base64Manager) {

      this.username = '';
      this.password = '';
      this.message = { show: false };
      _auth = AuthService;
      _$location = $location;
      _$stateParams = $stateParams;
      _Base64Manager = Base64Manager;
      this.sendingInfo = false;
    }

    login() {
      // {'username':'admin@autoboxcorp.com', 'password' : 'Password1'};
      let credentials = {
        'username': this.username,
        'password': this.password
      };
      this.sendingInfo = true;
      return _auth.login(credentials)
        .then(response => {
          if (response.status === 200) {
            let userApp = {
              'partnerId': 'f9',
              'appName': 'al',
              'username': 'five9_1@five.com',
              'password': '1234565'
            };
            return _auth.loginApplication(userApp);
          }
          throw response;
        })
        .then(response => {    
          let decoded;
          if(_$stateParams.url && (decoded = _Base64Manager.decode(_$stateParams.url))){
            _$location.url(decoded).search('url', null);
          }else{
            _$location.url('/ap/al/skills').search('url', null);
          }
          return response;
        })
        .catch(e => {         
          this.message = { show: true, text: e.errorMessage || e, type: 'danger' };        
          return e;
        });
    }
  }

  LoginController.$inject = ['$location', '$stateParams', 'AuthService', 'Base64Manager'];



  angular.module('fakiyaMainApp')
    .component('login', {
      templateUrl: 'app/site/login/login.html',
      controller: LoginController
    });

})();

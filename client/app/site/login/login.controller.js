'use strict';

(function () {

  let _auth, _$location;

  class LoginController {

    constructor($location, AuthService) {

      this.username = '';
      this.password = '';
      this.message = { show: false };
      _auth = AuthService;
      _$location = $location;
    }

    login() {
      // {'username':'admin@autoboxcorp.com', 'password' : 'Password1'};
      let credentials = {
        'username': this.username,
        'password': this.password
      };
      console.log(credentials);
      return _auth.login(credentials)
        .then(response => {

          if (response.status === 200) {
            let userApp = {
              'partnerId': 'f9',
              'appName': 'al',
              'username': 'rolandorojas@five.com',
              'password': '123456'
            };
            _auth.loginApplication(userApp)
              .then(res => {
                console.log('==== AUTH RESPONSE ====');
                console.log(res);
                _$location.path('/ap/al/skills');
              });
            return response;
          }
          throw response;
        })
        .catch(e => {     
          if (e.status && e.data) {
            this.message = { show: true, text: e.data, type: 'danger' };
          } else {
            this.message = { show: true, text: e, type: 'danger' };
          }
          return e;
        });
    }

    logout() {

      return _auth.logout()
        .then(response => {
          if (response.status === 200) {
            _$location.path('/login');
          }
          return response;
        });
    }
  }

  LoginController.$inject = ['$location', 'AuthService'];



  angular.module('fakiyaMainApp')
    .component('login', {
      templateUrl: 'app/site/login/login.html',
      controller: LoginController
    });

})();

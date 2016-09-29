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
    }

    login() {
      // {'username':'admin@autoboxcorp.com', 'password' : 'Password1'};
      let credentials = {
        'username': this.username,
        'password': this.password
      };
      return _auth.login(credentials)
      .then(response => {
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
        if(e.errorMessage=== undefined)
        {
            this.message.text='Unable to connect to the server. Please try again';
        }
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

'use strict';

(function () {
  let _auth,_Base64Manager, _$location, _$stateParams;
  class ActivationController {

    constructor($location, $stateParams, AuthService, Base64Manager) {
      this.newAccount = {};
      this.message = { show: false };
      _auth = AuthService;
      _$location = $location;
      this.activationCode = $location.$$search.activationCode;
      _$stateParams = $stateParams;
      _Base64Manager = Base64Manager;
    }
    $onInit(){
      this.activation();
    }
    activation() {
      return _auth.activate(this.activationCode)
      .then(response => {
        console.log(response);
        this.newAccount = response;
        return response;
      })
      .catch(e => {
        this.message = { show: true, text: e.errorMessage };
        return e;
      });
    }
    createUser() {
      let newUser = {
        activationCode: this.activationCode,
        firstName: this.newAccount.firstname,
        lastName: this.newAccount.lastname,
        password: this.newAccount.password
      };
      let credentials = {
            'username': this.newAccount.email,
            'password': this.newAccount.password
          };
      return _auth.createUser(newUser)
      .then(response => {
        console.log(response);
        return _auth.login(credentials);
      })
      .then(response =>{
        console.log(response);
        _$location.path('/ap/dashboard');
        return response;
      })
      .catch(e => {
        this.message = { show: true, text: e.errorMessage };
        if(response.status === '404'){
          _$location.path('/404');
        }
        console.log(e);
        return e;
      });
    }
  }

  ActivationController.$inject = ['$location', '$stateParams', 'AuthService', 'Base64Manager'];

  angular.module('fakiyaMainApp')
    .component('activation', {
      templateUrl: 'app/site/accounts/activate/activation.html',
      controller: ActivationController
    });

})();

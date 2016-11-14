'use strict';

(function () {
  let _auth,_Base64Manager, _$location, _$stateParams;
  class ActivationController {

    constructor($location, $stateParams, AuthService, Base64Manager) {
      this.newAccount = {};
      this.message = { show: false };
      _auth = AuthService;
      _$location = $location;
      this.activationCode = $stateParams.activationCode;
      _$stateParams = $stateParams;
      _Base64Manager = Base64Manager;
    }
    $onInit(){
      this.activation();      
    }
    activation() {
      return _auth.activate(this.activationCode)
      .then(response => {
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
      .then(() => {
        let isLogged = _auth.isAuthenticated();
        if(isLogged){
            _auth.logout();
        }    
      })
      .then(() => {        
        return _auth.login(credentials);
      })
      .then(response =>{
        _$location.path('/ap/dashboard');
        return response;
      })
      .catch(e => {
        this.message = { show: true, text: e.errorMessage };
        if(e.status === '404'){
          _$location.path('/404');
        }
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

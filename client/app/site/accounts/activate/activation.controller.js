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
      return _auth.activate('09Jc3mty3wKJxu22q3pfxvG6jlaR7swM8tEJ6gYCuDURuJ6tmWzp8wsy')
      //return _auth.activate(this.activationCode)
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
      console.log("CREATE NEW USER");
      this.newUser = {
        activationCode: '09Jc3mty3wKJxu22q3pfxvG6jlaR7swM8tEJ6gYCuDURuJ6tmWzp8wsy',
        firstName: this.newAccount.firstname,
        lastName: this.newAccount.lastname,
        password: this.newAccount.password
      }
      return _auth.createUser(this.newUser)
      //return _auth.activate(this.activationCode)
      .then(response => {
        return response;
      })
      .catch(e => {
        this.message = { show: true, text: e.errorMessage };
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

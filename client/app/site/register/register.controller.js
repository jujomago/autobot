'use strict';

(function () {

  let _auth,_Base64Manager, _$location, _$stateParams;
  class RegisterController {

    constructor($location, $stateParams, AuthService, Base64Manager) {
      this.company = '';
      this.email = '';
      this.firstname = '';
      this.lastname = '';
      this.companies = [];
      this.message = { show: false };
      this.required = true;
      _auth = AuthService;
      _$location = $location;
      _$stateParams = $stateParams;
      _Base64Manager = Base64Manager;
    }
    $onInit(){
	  	this.getCompanies();
	  }
    getCompanies() {
      return _auth.getCompanies()
      .then(response => {
        this.companies = response;
        return response;
      })
      .catch(e => {
        this.message = { show: true, text: e.errorMessage };
        return e;
      });
    }
    register() {
      let reg = {
        'email': this.email,
        'company': this.company,
        'firstname': this.firstname,
        'lastname': this.lastname
      };
      this.required = true;
      return _auth.register(reg)
      .then(response => {
        this.message = { show: false };
        return response;
      })
      .catch(e => {
        this.message = { show: true, text: e.errorMessage };
        return e;
      });
    }
  }

  RegisterController.$inject = ['$location', '$stateParams', 'AuthService', 'Base64Manager'];

  angular.module('fakiyaMainApp')
    .component('register', {
      templateUrl: 'app/site/register/register.html',
      controller: RegisterController
    });

})();

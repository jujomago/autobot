'use strict';

(function () {
  let _auth,_Base64Manager, _$location, _$stateParams;
  class ActivationController {

    constructor($location, $stateParams, AuthService, Base64Manager) {
      this.newAccount = {};
      this.message = { show: false };
      _auth = AuthService;
      _$location = $location;
      _$stateParams = $stateParams;
      _Base64Manager = Base64Manager;
    }
    $onInit(){
      this.activation();
    }
    activation() {
      console.log("ACTIVATION");
      return _auth.activate('09JXW7vjB0QGjlgZQTHdrttXv2QxwWCktBcegrrf6LPk7oWwO5rV8sPt')
      .then(response => {
        console.log(response);
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

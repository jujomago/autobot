'use strict';

(function() {

class LoginController {

  constructor($state,$sessionStorage) {
    console.log('sesionStraoge login');
    console.log($sessionStorage);


    this.storage = $sessionStorage;   
    this.state=$state;
    this.username='';
    this.password='';   
    this.message={show:false};
  }

  autentichate(){
    if(this.username==='autobox' && this.password==='autobox'){
      this.state.go('skills.list');
      this.storage.logged=true;
    }else{
      this.message={show:true,text:'INVALID CREDENTIALS',type:'danger',expires:4000};
    }
  }
  
}
  
LoginController.$inject = ['$state', '$sessionStorage'];


angular.module('fakiyaMainApp')
  .component('login', {
    templateUrl: 'app/login/login.html',
    controller: LoginController
  });

})();

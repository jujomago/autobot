'use strict';

(function() {

let _auth,_cookies; 

class LoginController {

  constructor($state,$cookies,AuthService) {

    this.state=$state;
    this.username='';
    this.password='';   
    this.message={show:false};
    _auth=AuthService;
    _cookies=$cookies;
  }

  login(){ 
      // {'username':'admin@autoboxcorp.com', 'password' : 'Password1'};
        let credentials={
          'username':this.username,
          'password':this.password
        };  

        _auth.login(credentials)
        .then(token=>{
            console.log('== TOKEN RESPONSE ======');
            console.log(token);
            if(_cookies.get('auth_token')===undefined){
              console.log('saving cookie'); 
              _cookies.put('auth_token',token); 
            }           
          return token;
        })
        .then(()=>{

            let userApp={
              'partnerId': 'f9',
              'appName': 'al',
              'username': 'rolandorojas@five.com',
              'password': '123456'
            };

          _auth.loginApplication(userApp)
          .then(res=>{
              console.log('==== AUTH RESPONSE ====');
              console.log(res);             
              this.state.go('ap.al.skills');
           });
        })        
        .catch(e=>{     
          console.log('error catch');
          console.log(e);     
            this.message={show:true,text:e.data,type:'danger',expires:4000};
        }); 
  }  
}
  
LoginController.$inject = ['$state','$cookies','AuthService'];



angular.module('fakiyaMainApp')
  .component('login', {
    templateUrl: 'app/site/login/login.html',
    controller: LoginController
  });

})();

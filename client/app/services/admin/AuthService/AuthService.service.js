'use strict';
(() => {
let http;
class AuthService{
    constructor($http, appConfig){
       http=$http;
      if (appConfig.apiUri) {
         this.endPointUrl = appConfig.apiUri;
      }
    }
    login(credentials){

        return http.post(this.endPointUrl+'/auth/login',credentials)
              .then(response=>{
                  if(response.status===200){
                    return response.data;
                  }
              })
              .catch(error=>{
                  if(error.status===400){
                   throw error;
                  }
                  else{
                   console.error('Another Error');
                  }
              });
    }
    loginApplication(credentialsApp){
      return http.post(this.endPointUrl+'/admin/users/auth',credentialsApp)
            .then(response=>{
                  if(response.status===200){
                    return response.data;
                  }
              })
              .catch(error=>{                 
                   throw error;      
              });
    }
    logout(){
        return http.post(this.endPointUrl+'/auth/logout');
    }    
}

AuthService.$inject=['$http','appConfig'];

angular.module('fakiyaMainApp')
  .service('AuthService', AuthService);
})();

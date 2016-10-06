'use strict';

angular.module('fakiyaMainApp')
  .factory('RefreshToken', function (jwtHelper,$cookies,$interval,$window,$state,AuthService) {
    const LIFE_TIME = 30;
    const TOKEN_LIFE_TIME = 60;
    let interval;
    let token, remainingMinutes;
    function deleteInterval(){
      if(interval){
        $interval.cancel(interval);
      }
    }
    function getRemainingMinutes(token){
      var tokenDate = jwtHelper.getTokenExpirationDate(token);    
      let today=new Date(); 
      let expDate=new Date(tokenDate);
      let diff = expDate.getTime() - today.getTime();     
      let remainingMinutes= Math.round(diff / 60000);
      return remainingMinutes;
    }
    function renewToken(token){
      AuthService.renewToken(token)
      .then(()=>{
        token=$cookies.get('auth_token');
        remainingMinutes = getRemainingMinutes(token);
        console.info(`token new life time ${remainingMinutes-LIFE_TIME} minutes`);
        createInterval();
      })
      .catch(() => {
        $cookies.remove('auth_token');
        $state.go('login');
      });
    }
    function createInterval(){
      deleteInterval();
      interval = $interval(checkTokenRenew,(remainingMinutes-LIFE_TIME) * 60000);
    }
    function checkTokenRenew(){         
        console.log('checking if token should be renewed');
        token=$cookies.get('auth_token');
        if(token){    
          remainingMinutes= getRemainingMinutes(token);
          if(remainingMinutes<=LIFE_TIME){
              console.info('CALLING RENEW TOKEN');
              renewToken(token);
              return;
          }
          console.info(`token new life time ${remainingMinutes-LIFE_TIME} minutes`);
          createInterval();

        }else{
          console.warn('no exists cookie token!!');
          deleteInterval();
          $state.go('login');
        } 
    }
    $window.onbeforeunload = function () {
      deleteInterval();
    };
    return {
      checkToken: checkTokenRenew
    };
  });

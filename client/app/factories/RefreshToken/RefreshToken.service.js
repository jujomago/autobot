'use strict';

angular.module('fakiyaMainApp')
  .factory('RefreshToken', function (jwtHelper,$cookies,$interval,$window,$location,AuthService) {
    const LIFE_TIME = 30;
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
        createInterval();
      })
      .catch(() => {
        $cookies.remove('auth_token');
        $location.path('/login');
      });
    }
    function createInterval(){
      deleteInterval();
      interval = $interval(checkTokenRenew,(remainingMinutes-LIFE_TIME) * 60000);
    }
    function checkTokenRenew(){
        token=$cookies.get('auth_token');
        if(token){
          remainingMinutes= getRemainingMinutes(token);
          if(remainingMinutes<=LIFE_TIME){
              renewToken(token);
              return;
          }
          createInterval();

        }else{
          deleteInterval();
        }
    }
    $window.onbeforeunload = function () {
      deleteInterval();
    };
    return {
      checkToken: checkTokenRenew,
      cancelRefresh: deleteInterval
    };
  });

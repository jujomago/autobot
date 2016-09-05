'use strict';

angular.module('fakiyaMainApp')
  .factory('SelectLastAccount', function ($http, $state, PartnersService) {
    function getLastPartnerAccount(partnerId, appName){
      return PartnersService.getLastUsedPartnerAccount(partnerId)
      .then(response => {
        console.log(response);
        $state.go('ap.al.skills');
        return response;
      })
      .catch(error => {
        $state.go('login');
        return error;
      });
    }
    return getLastPartnerAccount;
  });

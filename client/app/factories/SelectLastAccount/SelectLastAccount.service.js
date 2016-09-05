'use strict';

angular.module('fakiyaMainApp')
  .factory('SelectLastAccount', function ($http, $state, PartnersService) {
    function getLastPartnerAccount(partnerId, appName){
      return PartnersService.getLastUsedPartnerAccount(partnerId)
      .then(response => {
        $state.go('');
        return response;
      })
      .catch(error => {
        $state.go('');
        return error;
      });
    }
    return getLastPartnerAccount;
  });

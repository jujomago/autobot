'use strict';

angular.module('fakiyaMainApp')
  .factory('AccountManager', function($http, $state, PartnersService) {
    function getLastPartnerAccount(partnerId, appName) {
      return PartnersService.getLastUsedPartnerAccount(partnerId)
        .then(response => {
          if (response.data.username) {
            $state.go('ap.login', { partnerId: partnerId, appName: appName, username: response.data.username });
          }
          else {
            $state.go('partneraccounts', { partnerId: partnerId, appName: appName });
          }
          return response;
        })
        .catch(error => {
          $state.go('partneraccounts', { partnerId: partnerId, appName: appName });
          return error;
        });
    }
    return {
      getLastPartnerAccount: getLastPartnerAccount
    };
  });

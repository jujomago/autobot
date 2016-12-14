'use strict';
(function () {
    let _$http,_HandleError;
    class CampaignProfilesService {
        constructor($http, HandleError, appConfig) {
            this.endPointUrl = '/f9/admin/campaigns/profiles';
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri + this.endPointUrl;
            }
            _HandleError = HandleError;
            _$http = $http;
        }

        getCampaignProfiles() {
            var result = { data: null, statusCode: 200, errorMessage: '' };
            return _$http.get(this.endPointUrl)
                .then(response => {
                    if (response.data) {
                        result.data = response.data.return;
                        return result;
                    }
                })
                .catch(error => _HandleError(error, result));
        }
        deleteCampaignProfile(profile) {
            var result = { data: null, statusCode: 204, errorMessage: '' };
            return _$http.delete(this.endPointUrl + '/' + profile.name)
                .then(response => {
                    if (response.status !== 204) {
                        result.statusCode = response.status;
                        result.data = response;
                    }
                    return result;
                })
                .catch(error => _HandleError(error, result));
        }
    }
    CampaignProfilesService.$inject = ['$http','HandleError','appConfig'];
	angular.module('fakiyaMainApp')
	  .service('CampaignProfilesService',CampaignProfilesService);
})();

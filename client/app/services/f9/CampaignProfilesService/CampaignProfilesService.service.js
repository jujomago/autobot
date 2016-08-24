'use strict';
(function () {
    let _$http,_$q;

	function _handleError(err, result) {
		result.errorMessage = err.data;
		result.statusCode = err.status;
		let defered = _$q.defer();
		let promise = defered.promise;
		defered.reject(result);    
		return promise;
	}
    class CampaignProfilesService {
        constructor($http, $q, appConfig) {
            this.endPointUrl = '/f9/campaignProfiles';
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri + this.endPointUrl;
            }
            _$q=$q;
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
                .catch(error => _handleError(error, result));
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
                .catch(error => _handleError(error, result));
        }
    }
    CampaignProfilesService.$inject = ['$http','$q','appConfig'];
	angular.module('fakiyaMainApp')
	  .service('CampaignProfilesService',CampaignProfilesService);
})();

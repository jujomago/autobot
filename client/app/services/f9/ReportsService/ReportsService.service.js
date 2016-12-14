'use strict';
(function () {
    let _$http,_HandleError;
    class ReportsService {
        constructor($http, HandleError, appConfig) {
            this.endPointUrl = '/f9/admin/reports';
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri + this.endPointUrl;
            }
            _HandleError = HandleError;
            _$http = $http;
        }
        sendCallLogRequest(startDate, endDate) {
            let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.get(this.endPointUrl+'/calllogs', {params: {startDate: startDate, endDate: endDate}})
            .then(response => {
                result.data = response.data;
                return result;
            })
            .catch(err => _HandleError(err, result));
        }
        isRunning(identifier, appName) {
            let config = {params: {timeout: 500}};
            if(appName){
                config.headers = {appName: appName};
            }
            let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.get(this.endPointUrl+'/'+identifier, config)
            .then(response => {
                result.data = response.data;
                return result;
            })
            .catch(err => _HandleError(err, result));
        }
        getCallLogResult(identifier){
        	let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.get(this.endPointUrl+'/calllogs/'+identifier)
            .then(response => {
                result.data = response.data;
                return result;
            })
            .catch(err => _HandleError(err, result));
        }

    }
    ReportsService.$inject = ['$http','HandleError','appConfig'];
	angular.module('fakiyaMainApp')
	  .service('ReportsService', ReportsService);
})();

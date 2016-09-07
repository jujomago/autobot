'use strict';
(function () {
    let _$http,_HandleError;
    class AppsService {
        constructor($http, HandleError, appConfig) {
            this.endPointUrl = '/admin/apps';
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri + this.endPointUrl;
            }
            this.installedEndPoint = '/assets/admin/json/installed.json';
            this.newestEndPoint = '/assets/admin/json/newapps.json';
            _HandleError = HandleError;
            _$http = $http;

        }
        getApps() {
          let result = { data: null, statusCode: 200, errorMessage: null };
          //return _$http.get('/assets/admin/json/apps.json')
          return _$http.get(this.endPointUrl)
            .then(response => {
            	result.data = response.data;
            	return result;
            })
            .catch(err => _HandleError(err, result));
        }
        getApp(appName){

          let result = { data: null, statusCode: 200, errorMessage: null };
          return _$http.get(this.endPointUrl+'/'+appName)
            .then(response => {
            	result.data = response.data;
            	return result;
            })
            .catch(err => _HandleError(err, result));
        }
        getInstalled(){
            let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.get(this.endPointUrl+'/installed')
            .then(response => {
                result.data = response.data;
                return result;
            })
            .catch(err => _HandleError(err, result));
        }
        getNewest(){
            let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.get(this.endPointUrl+'/notinstalled')
            .then(response => {
                result.data = response.data;
                return result;
            })
            .catch(err => _HandleError(err, result));
        }

    }
  AppsService.$inject = ['$http','HandleError', 'appConfig'];
	angular.module('fakiyaMainApp')
	  .service('AppsService',AppsService);
})();

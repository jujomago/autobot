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
    class AppsService {
        constructor($http, $q) {
            this.endPointUrl = '/assets/admin/json/apps.json';
            this.installedEndPoint = '/assets/admin/json/installed.json';
            this.newestEndPoint = '/assets/admin/json/newapps.json';
            _$q=$q;
            _$http = $http;

        }
        getApps() {
          let result = { data: null, statusCode: 200, errorMessage: null };
          return _$http.get(this.endPointUrl)
            .then(response => {
            	result.data = response.data;
            	return result;
            })
            .catch(err => _handleError(err, result));
        }
        getApp(appName){
        
          let result = { data: null, statusCode: 200, errorMessage: null };

          return _$http.get(`/api/admin/apps/${appName}`)

            .then(response => {
            	result.data = response.data;
            	return result;
            })
            .catch(err => _handleError(err, result));
        }
        getInstalled(){
            let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.get(this.installedEndPoint)
            .then(response => {
                result.data = response.data;
                return result;
            })
            .catch(err => _handleError(err, result));
        }
        getNewest(){
            let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.get(this.newestEndPoint)
            .then(response => {
                result.data = response.data;
                return result;
            })
            .catch(err => _handleError(err, result));
        }

    }
    AppsService.$inject = ['$http','$q'];
	angular.module('fakiyaMainApp')
	  .service('AppsService',AppsService);
})();
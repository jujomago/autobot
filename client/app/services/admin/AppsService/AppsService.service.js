'use strict';
(function () {
    let _lodash, _$parse;
    let _$http,_HandleError;
    class AppsService {
        constructor($http, HandleError, appConfig, lodash, $parse) {
            this.partners = [];
      		  this.apps = [];
            this.getter = 'partner.partnerFullName';
            this.endPointUrl = '/admin/apps';
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri + this.endPointUrl;
            }
            //this.installedEndPoint = '/assets/admin/json/installed.json';
            //this.newestEndPoint = '/assets/admin/json/newapps.json';
            _HandleError = HandleError;
            _$http = $http;
            _$parse = $parse;
            _lodash = lodash;
        }
        getApps() {
          let result = { data: null, statusCode: 200, errorMessage: null };
          //return _$http.get('/assets/admin/json/apps.json')
          return _$http.get(this.endPointUrl)
            .then(response => {
              this.apps=this.groupBy(response.data);
        			var j = 0;
        			for(let partnerName in this.apps)
        			{
        				console.log(this.apps);
        				this.partners[j] = {apps: this.apps[partnerName], partner: partnerName};
        				j++;
        			}
              result.data = this.partners;
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
        groupBy(list){
          let getter = _$parse(this.getter);
          return _lodash.groupBy(list, function(item) {
              return getter(item);
          });
        }

    }
  AppsService.$inject = ['$http','HandleError', 'appConfig', 'lodash', '$parse'];
	angular.module('fakiyaMainApp')
	  .service('AppsService',AppsService);
})();

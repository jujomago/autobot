'use strict';
(function () {
    let _lodash, _$parse;
    let _$http,_HandleError;
    function _removeInactives(result){
      return  result.filter(function( application ) {
        return application.app.appStatus !== 2;
      });
    }
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
        //This logic must be moved to controller and use the new method getFilteredApps
        getApps() {
          let result = { data: null, statusCode: 200, errorMessage: null };
          //this is temporal, when API correct the US 1711 this param size must be removed
          let params = {size: 100};
          return _$http.get(this.endPointUrl+'/filter',{params: params})
            .then(response => {
              this.apps=this.groupBy(_removeInactives(response.data));
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
        getFilteredApps(params){
            let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.get(this.endPointUrl+'/filter', {params: params})
            .then(response => {
                result.data = _removeInactives(response.data);
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

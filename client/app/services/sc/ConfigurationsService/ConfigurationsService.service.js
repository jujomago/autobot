(function () {
  'use strict';

  let _$http,
    _HandleError;

  class ConfigurationsService {
    constructor(
      $http,
      HandleError,
      appConfig) {
      _$http = $http;
      _HandleError = HandleError;

      this.endPointUrl = '/sc/statistics/configurations';

      if (appConfig.apiUri) {
        this.endPointUrl = appConfig.apiUri + this.endPointUrl;
      }
    }

    //Configurations SC
    getStatisticsConfiguration(userId) {
      var result = {};

      return _$http.get(this.endPointUrl+  '/' + userId)
        .then(response => {
          if (response.data) {
            result.data = response.data.return;
            return result;
          }
        })
        .catch(err => _HandleError(err, result));
    }

    saveStatisticsConfiguration(configuration) {
      var result = {};

      return _$http.post(this.endPointUrl, configuration)
        .then(response => {
          result.data = response.data;
          return result;
        })
        .catch(err => _HandleError(err, result));
    }

    updateStatisticsConfiguration(configuration) {
      let result = {};

      return _$http.put(this.endPointUrl, configuration)
        .then(() => result)
        .catch(err => _HandleError(err, result));
    }

    removeStatisticsConfiguration(configurationId) {
      var result = { data: null, statusCode: 200, errorMessage: '' };

      return _$http({
        method: 'DELETE',
        url: this.endPointUrl +'/'+configurationId,
        headers: {'Content-Type': 'application/json;charset=utf-8'}
      }).then(response => {
          result.data = response.data;
          return result;
        })
        .catch(err => _HandleError(err, result));
    }
  }

  ConfigurationsService.$inject = [
    '$http',
    'HandleError',
    'appConfig'
  ];

  angular.module('fakiyaMainApp')
    .service('ConfigurationsService',ConfigurationsService);
})();


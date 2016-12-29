(function () {
  'use strict';

  let _$http,
    _HandleError,
    _Utils;

  class StatisticsService {
    constructor(
      $http,
      HandleError,
      Utils,
      appConfig) {
      _$http = $http;
      _HandleError = HandleError;
      _Utils = Utils;

      this.endPointUrl = '/f9/supervisor';

      if (appConfig.apiUri) {
        this.endPointUrl = appConfig.apiUri + this.endPointUrl;
      }
    }

    getColumns(columns) {
      return columns === '' || _Utils.isUndefinedOrNull(columns) ? '' : '?columnnames='+columns;
    }

    //AGENTS_STATE GET-REFRESH
    getStatisticsAgentState(columns) {
      var result = {};

      return _$http.get(this.endPointUrl + '/statistics/agents/state'+this.getColumns(columns)).then(response => {

          if (response.data) {
            result.data = response.data;
            return result;
          }
        })
        .catch(err => _HandleError(err, result));
    }

    refreshStatisticsAgentState(columns, timestamp, longpollingtimeout) {
      var result = {};

      return _$http.get(this.endPointUrl + '/statistics/agents/state/livereload'+this.getColumns(columns)+'&previoustimestamp='+timestamp+'&longpollingtimeout='+longpollingtimeout)
        .then(response => {
          if (response.data) {
            result.data = response.data;
            return result;
          }
        })
        .catch(err => _HandleError(err, result));
    }

    //USERS GET-REFRESH
    getStatisticsUsers() {
      var result = {};

      return _$http.get(this.endPointUrl+  '/users/logged')
        .then(response => {

          if (response.data) {
            result.data = response.data.return;
            return result;
          }
        })
        .catch(err => _HandleError(err, result));
    }

    //SKILLS GET-REFRESH
    getStatisticsSkillStatus(columns) {
      var result = {};

      return _$http.get(this.endPointUrl+'/statistics/acd/status'+this.getColumns(columns))
        .then(response => {
          if (response.data) {
            result.data = response.data;
            return result;
          }
        })
        .catch(err => _HandleError(err, result));
    }

    refreshStatisticsSkillStatus(columns,timestamp, longpollingtimeout) {
      var result = {};

      return _$http.get(this.endPointUrl+'/statistics/acd/status/livereload'+this.getColumns(columns)+'&previoustimestamp='+timestamp+'&longpollingtimeout='+longpollingtimeout)
        .then(response => {
          if (response.data) {
            result.data = response.data;
            return result;
          }
        })
        .catch(err => _HandleError(err, result));
    }

    //SUMMARY AGENTS_STATE GET-REFRESH
    getStatisticsSummary(columns) {
      var result = {};

      return _$http.get(this.endPointUrl + '/statistics/agents'+this.getColumns(columns))
        .then(response => {
          if (response.data) {
            result.data = response.data;
            return result;
          }
        })
        .catch(err => _HandleError(err, result));
    }

    refreshStatisticsSummary(columns,timestamp,longpollingtimeout) {
      var result = {};

      return _$http.get(this.endPointUrl + '/statistics/agents/livereload'+this.getColumns(columns)+'&previoustimestamp='+timestamp+'&longpollingtimeout='+longpollingtimeout)
        .then(response => {
          if (response.data) {
            result.data = response.data;
            return result;
          }
        })
        .catch(err => _HandleError(err, result));
    }
  }

  StatisticsService.$inject = [
    '$http',
    'HandleError',
    'Utils',
    'appConfig'
  ];

  angular.module('fakiyaMainApp')
    .service('StatisticsService',StatisticsService);
})();

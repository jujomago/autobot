'use strict';

angular.module('fakiyaMainApp').
  factory('Utils', function () {
    var mapValues = [];

    function isUndefinedOrNull(obj) {
      return angular.isUndefined(obj) || obj === null;
    }

    function get(key) {
      console.log('map Values. . ',mapValues);
      return mapValues[key];
    }

    function set(key, value) {
      mapValues[key] = value;
    }

    return {
      getDataShared: get,
      setDataShared: set,
      isUndefinedOrNull: isUndefinedOrNull
    };
  });

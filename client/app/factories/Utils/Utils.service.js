(function () {
  'use strict';

  function Utils() {
    var dataList = null;

    function isUndefinedOrNull(obj) {
      return angular.isUndefined(obj) || obj === null;
    }

    function getDataListAction() {
      return dataList;
    }

    function setDataListAction(value) {
      dataList = value;
    }

    return {
      getDataListAction: getDataListAction,
      setDataListAction: setDataListAction,
      isUndefinedOrNull: isUndefinedOrNull
    };
  }

  Utils.$inject = [];

  angular.module('fakiyaMainApp').
  factory('Utils', Utils);
})();

'use strict';

angular.module('fakiyaMainApp')
  .filter('groupBy', function (lodash, $parse) {
  	let _ = lodash;
    return _.memoize(function(items, field) {
        var getter = $parse(field);
        return _.groupBy(items, function(item) {
            return getter(item);
        });
    });
  });
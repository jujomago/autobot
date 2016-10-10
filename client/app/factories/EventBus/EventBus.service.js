'use strict';

angular.module('fakiyaMainApp')
  .factory('EventBus', function (EventAggregator) {
    let instance = new EventAggregator();
    return instance;
});

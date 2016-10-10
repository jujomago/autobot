'use strict';

angular.module('fakiyaMainApp')
  .factory('EventAggregator', function ($rootScope) {
    function EventAggregator() {
      this.$eventBus = $rootScope.$new(true);
    }

    EventAggregator.prototype.publish = function(name, args) {
      this.$eventBus.$broadcast(name, args);
    };

    EventAggregator.prototype.subscribe = function(name, listener, scope) {
      var unbind = this.$eventBus.$on(name, listener);
      if (scope) {
        scope.$on('$destroy', function() {
          unbind();
        });
      }
    return unbind;
    };
    return EventAggregator;
  });

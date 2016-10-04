'use strict';

angular.module('fakiyaMainApp')
  .service('lodash', function ($window) {
    // Get a local handle on the global lodash reference.
    var _ = $window._;
    // OPTIONAL: Sometimes I like to delete the global reference to make sure
    // that no one on the team gets lazy and tried to reference the library
    // without injecting it. It's an easy mistake to make, and one that won't
    // throw an error (since the core library is globally accessible).
    // ALSO: See .run() block above.
    // delete ($window._);
    // ---
    // CUSTOM LODASH METHODS.
    // ---
    return _;
  });

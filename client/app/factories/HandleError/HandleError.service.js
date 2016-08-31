'use strict';

angular.module('fakiyaMainApp')
  .factory('HandleError', function ($q) {
    function handleError(err, result) {
      result.errorMessage = err.data.error;
      result.statusCode = err.status;
      let defered = $q.defer();
      let promise = defered.promise;
      defered.reject(result);    
      return promise;
    }

    return handleError;
  });

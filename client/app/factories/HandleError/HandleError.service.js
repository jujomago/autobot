'use strict';

angular.module('fakiyaMainApp')
  .factory('HandleError', function ($q) {
    function handleError(err, result) {
      console.log(err);
      if(err.status===-1)
      {
            result.errorMessage='Unable to connect to the server. Please try again';
      }
      else{
            result.errorMessage = err.data.error || err.data;  
      }    
      result.statusCode = err.status;
      let defered = $q.defer();
      let promise = defered.promise;
      defered.reject(result);    
      return promise;
    }
    return handleError;
  });

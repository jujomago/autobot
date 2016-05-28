'use strict';


 // I define an asynchronous wrapper to the native confirm() method. It returns a
 // promise that will be "resolved" if the user agrees to the confirmation; or
 // will be "rejected" if the user cancels the confirmation.

function ConfirmAsync( $window, $q ){
      // Define promise-based confirm() method.
      
      
      
    function confirm( message ) {
        console.log('ejecuted confirmm....');
        let defer = $q.defer();
        // The native confirm will return a boolean.
        if ( $window.confirm( message ) ) {
            defer.resolve( true );
        } else {
            defer.reject( false );
        }     
        return defer.promise ;
    }
    
    
    return( confirm );
}

angular.module('fakiyaMainApp')
  .factory('ConfirmAsync', ConfirmAsync);

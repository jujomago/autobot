'use strict';
(() => {
    let _$http,_HandleError;
    class ContactService {

        constructor($http, appConfig, HandleError) {
            _$http = $http;
            _HandleError = HandleError;           
         
            if (appConfig.apiUri) {
                this.endPointUrl = appConfig.apiUri;
            }
        }

        sendmail(data) {      
            let result = { data: null, statusCode: 200, errorMessage: null };
            return _$http.post(this.endPointUrl + '/admin/services/contact',data)
            .then(() => result)
            .catch(err => _HandleError(err, result));       
        }    
    }

    ContactService.$inject = ['$http', 'appConfig', 'HandleError'];
    angular.module('fakiyaMainApp')
        .service('ContactService', ContactService);
})();

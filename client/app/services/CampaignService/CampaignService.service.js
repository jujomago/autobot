'use strict';
(() => {
  
  let http;
  
  function handleError(err,result){
     console.log('enter handle error in service');
      result.error = err.data;
      result.statusCode = err.status;
      return result;
  }
  
  //let endPointUrl = 'http://localhost:9000/api/f9/campaigns';
  class CampaignService {    
    
   constructor($http, appConfig) {
      console.log('contrusctor CAMPAIGN SERVICE');

      this.endPointUrl = '/f9/campaigns';
      if (appConfig.apiUri) {
        console.log('APPCONFIG VALUE=========>>>>>>> ' + appConfig.apiUri);
        console.log('CONCATENATED VALUE=========>>>>>>> ' + appConfig.apiUri + '/f9/campaigns');
        this.endPointUrl = appConfig.apiUri + this.endPointUrl;
      }
      http = $http;

    }

    getCampaigns() {
      let result = { data: null, statusCode: 200, error: null };
      return http.get(this.endPointUrl)
        .then(response => {
          result.data = response.data.return;
          return result;
        })
        .catch(err => handleError(err, result));
    }

    getIVRScripts() {
      let result = { data: null, statusCode: 200, error: null };
      return http.get(this.endPointUrl + '/ivrscripts')
        .then(response => {
          result.data = response.data.return;
          return result;
        })
        .catch(err => handleError(err, result));

    }

    getCampaign(type, name) {
      let result = { data: null, statusCode: 200, error: null };

      return http.get(this.endPointUrl + '/show/' + type + '/' + name)
        .then(response => {
          result.data = response.data.return;
          return result;
        })
        .catch(err => handleError(err, result));
    }

    createCampaign(newCampaign) {
      let result = { data: null, statusCode: 201, error: null };

      return http.post(this.endPointUrl, newCampaign)
        .then(() => {         
          return result;
        })
        .catch(err => handleError(err, result));
    }


    updateOutBoundCampaign(newCampaign) {
      let result = { data: null, statusCode: 200, error: null };

      return http.put(this.endPointUrl+'/outbound', newCampaign)
        .then(() => {         
          return result;
        })
        .catch(err => handleError(err, result));
    }

    
    updateAutoDialCampaign(newCampaign) {
      let result = { data: null, statusCode: 200, error: null };

      return http.put(this.endPointUrl+'/autodial', newCampaign)
        .then(() => {
          return result;
        })
        .catch(err => handleError(err, result));
    }
    
    updateInBoundCampaign(newCampaign) {
      let result = { data: null, statusCode: 200, error: null };

      return http.put(this.endPointUrl+'/inbound', newCampaign)
        .then(() => {        
          return result;
        })
        .catch(err => handleError(err, result));
    }
    
    getLists(){
       let result = { data: null, statusCode: 200, error: null };

      return http.get(this.endPointUrl+'/lists')
        .then(response => {  
           result.data = response.data.return;
          return result;
        })
        .catch(err => handleError(err, result));
    }

    
     getDNIS(){
       let result = { data: null, statusCode: 200, error: null };

      return http.get(this.endPointUrl+'/dnis')
        .then(response => {  
           result.data = response.data.return;
          return result;
        })
        .catch(err => handleError(err, result));
    }
    
     addDNIS(dnisCampaign){
       let result = { data: null, statusCode: 200, error: null };
      return http.post(this.endPointUrl+'/add/dnis',dnisCampaign)
        .then(() => {          
          return result;
        })
        .catch(err => handleError(err, result));
     }
     
     addLists(listCampaign){
         let result = { data: null, statusCode: 200, error: null };
      return http.post(this.endPointUrl+'/add/lists',listCampaign)
        .then(() => {           
          return result;
        })
        .catch(err => handleError(err, result));
     }   
    

    startCampaign(campaignName){
       let result = { data: null, statusCode: 200, error: null };
       
      return http.get(this.endPointUrl+'/start/'+campaignName)
        .then(() => {        
          return result;
        })
        .catch(err => handleError(err, result));
    }
    stopCampaign(campaignName){
       let result = { data: null, statusCode: 200, error: null };

      return http.get(this.endPointUrl+'/stop/'+campaignName)
        .then(() => {        
          return result;
        })
        .catch(err => handleError(err, result));
    }

    deleteCampaign(name) {
      let result = { data: null, statusCode: 204, error: null };
      return http.delete(this.endPointUrl + '/' + name)
        .then(() => {       
          return result;
        })
        .catch(err => handleError(err, result));

    }
  }

  CampaignService.$inject = ['$http', 'appConfig'];

  angular.module('fakiyaMainApp')
    .service('CampaignService', CampaignService);

})();



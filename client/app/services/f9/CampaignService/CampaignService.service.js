'use strict';
(() => {

  let _http,_q;

  function handleError(err, result) {
    console.log('enter handle error in service');
    result.error = err.data;
    result.statusCode = err.status;
    //return result;
    let defered = _q.defer();
    let promise = defered.promise;
    defered.reject(result);    
    return promise;
  }

  //let endPointUrl = '_http://localhost:9000/api/f9/campaigns';
  class CampaignService {

    constructor($http, $q, appConfig) {
      console.log('contrusctor CAMPAIGN SERVICE');

      this.endPointUrl = '/f9/campaigns';
      if (appConfig.apiUri) {
        console.log('APPCONFIG VALUE=========>>>>>>> ' + appConfig.apiUri);
        console.log('CONCATENATED VALUE=========>>>>>>> ' + appConfig.apiUri + '/f9/campaigns');
        this.endPointUrl = appConfig.apiUri + this.endPointUrl;
      }
      _http = $http;
      _q=$q;

    }

    getCampaigns() {
      let result = { data: null, statusCode: 200, error: null };
      return _http.get(this.endPointUrl)
        .then(response => {
          if (response.data) {
            result.data = response.data.return;
          }
          return result;
        })
        .catch(err => handleError(err, result));
    }

    getIVRScripts() {
      let result = { data: null, statusCode: 200, error: null };
      return _http.get(this.endPointUrl + '/ivrscripts')
        .then(response => {
          if (response.data) {
            result.data = response.data.return;
          }
          return result;
        })
        .catch(err => handleError(err, result));

    }

    getCampaign(type, name) {
      let result = { data: null, statusCode: 200, error: null };

      return _http.get(this.endPointUrl + '/' + type + '/' + name)
        .then(response => {
          if (response.data) {
            result.data = response.data.return;
          }
          return result;
        })
        .catch(err => handleError(err, result));
    }

    createCampaign(newCampaign) {
      let result = { data: null, statusCode: 201, error: null };
      return _http.post(this.endPointUrl, newCampaign)
        .then(() => result)
        .catch(err => handleError(err, result));
    }


    updateOutBoundCampaign(newCampaign) {
      let result = { data: null, statusCode: 200, error: null };

      return _http.put(this.endPointUrl + '/outbound', newCampaign)
        .then(() => result)
        .catch(err => handleError(err, result));
    }


    updateAutoDialCampaign(newCampaign) {
      let result = { data: null, statusCode: 200, error: null };

      return _http.put(this.endPointUrl + '/autodial', newCampaign)
        .then(() => result)
        .catch(err => handleError(err, result));
    }

    updateInBoundCampaign(newCampaign) {
      let result = { data: null, statusCode: 200, error: null };

      return _http.put(this.endPointUrl + '/inbound', newCampaign)
        .then(() => result)
        .catch(err => handleError(err, result));
    }

    getLists() {
      let result = { data: null, statusCode: 200, error: null };

      return _http.get(this.endPointUrl + '/lists')
        .then(response => {
          if (response.data) {
            result.data = response.data.return;
          }
          return result;
        })
        .catch(err => handleError(err, result));
    }

    getAttachedLists(name) {
      let result = { data: null, statusCode: 200, error: null };

      return _http.get(this.endPointUrl + '/attached/lists/' + name)
        .then(response => {
          if (response.data) {
            result.data = response.data.return;
          }
          return result;
        })
        .catch(err => handleError(err, result));
    }


    getAttachedDnis(name) {
      let result = { data: null, statusCode: 200, error: null };

      return _http.get(this.endPointUrl + '/attached/dnis/' + name)
        .then(response => {
          if (response.data) {
            result.data = response.data.return;
          }
          return result;
        })
        .catch(err => handleError(err, result));
    }


    getDNIS() {
      let result = { data: null, statusCode: 200, error: null };
      return _http.get(this.endPointUrl + '/dnis')
        .then(response => {
          if (response.data) {
            result.data = response.data.return;
          }
          return result;
        })
        .catch(err => handleError(err, result));
    }

    addDNIS(dnisCampaign) {
      let result = { data: null, statusCode: 200, error: null };
      return _http.post(this.endPointUrl + '/add/dnis', dnisCampaign)
        .then(() => result)
        .catch(err => handleError(err, result));
    }


    removeDnis(listCampaign) {
      let result = { data: null, statusCode: 200, error: null };
      return _http.post(this.endPointUrl + '/remove/dnis', listCampaign)
        .then(() => result)
        .catch(err => handleError(err, result));
    }



    addLists(listCampaign) {
      let result = { data: null, statusCode: 200, error: null };
      return _http.post(this.endPointUrl + '/add/lists', listCampaign)
        .then(() => result)
        .catch(err => handleError(err, result));
    }

    removeLists(listCampaign) {
      let result = { data: null, statusCode: 200, error: null };
      return _http.post(this.endPointUrl + '/remove/lists', listCampaign)
        .then(() => result)
        .catch(err => handleError(err, result));
    }
    startCampaign(campaignName) {
      let result = { data: null, statusCode: 200, error: null };

      return _http.get(this.endPointUrl + '/start/' + campaignName)
        .then(() => result)
        .catch(err => handleError(err, result));
    }
    stopCampaign(campaignName) {
      let result = { data: null, statusCode: 200, error: null };

      return _http.get(this.endPointUrl + '/stop/' + campaignName)
        .then(() => result)
        .catch(err => handleError(err, result));
    }

    deleteCampaign(name) {
      let result = { data: null, statusCode: 204, error: null };
      return _http.delete(this.endPointUrl + '/' + name)
        .then(() => result)
        .catch(err => handleError(err, result));
    }




  }

  CampaignService.$inject = ['$http','$q','appConfig'];

  angular.module('fakiyaMainApp')
    .service('CampaignService', CampaignService);

})();



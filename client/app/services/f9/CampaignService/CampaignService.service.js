'use strict';
(() => {

  let _http,_HandleError;

  //let endPointUrl = '_http://localhost:9000/api/f9/campaigns';
  class CampaignService {

    constructor($http, HandleError, appConfig) {
      console.log('contrusctor CAMPAIGN SERVICE');

      this.endPointUrl = '/f9/campaigns';
      if (appConfig.apiUri) {
        this.endPointUrl = appConfig.apiUri + this.endPointUrl;
      }
      _http = $http;
      _HandleError=HandleError;

    }

    getCampaigns() {
      let result = { data: null, statusCode: 200, errorMessage: null };
      return _http.get(this.endPointUrl)
        .then(response => {
          if (response.data) {
            result.data = response.data.return;
          }
          return result;
        })
        .catch(err => _HandleError(err, result));
    }

    getIVRScripts() {
      let result = { data: null, statusCode: 200, errorMessage: null };
      return _http.get(this.endPointUrl + '/ivrscripts')
        .then(response => {
          if (response.data) {
            result.data = response.data.return;
          }
          return result;
        })
        .catch(err => _HandleError(err, result));

    }

    getCampaign(type, name) {
      let result = { data: null, statusCode: 200, errorMessage: null };

      return _http.get(this.endPointUrl + '/' + type + '/' + name)
        .then(response => {
          if (response.data) {
            result.data = response.data.return;
          }
          return result;
        })
        .catch(err => _HandleError(err, result));
    }

    createCampaign(newCampaign) {
      let result = { data: null, statusCode: 201, errorMessage: null };
      return _http.post(this.endPointUrl+'/'+ newCampaign.type, newCampaign)
        .then(() => result)
        .catch(err => _HandleError(err, result));
    }


    updateOutBoundCampaign(newCampaign) {
      let result = { data: null, statusCode: 200, errorMessage: null };

      return _http.put(this.endPointUrl + '/outbound/'+newCampaign.name, newCampaign)
        .then(() => result)
        .catch(err => _HandleError(err, result));
    }


    updateAutoDialCampaign(newCampaign) {
      let result = { data: null, statusCode: 200, errorMessage: null };

      return _http.put(this.endPointUrl + '/autodial/'+newCampaign.name, newCampaign)
        .then(() => result)
        .catch(err => _HandleError(err, result));
    }

    updateInBoundCampaign(newCampaign) {
      let result = { data: null, statusCode: 200, errorMessage: null };

      return _http.put(this.endPointUrl + '/inbound/'+newCampaign.name, newCampaign)
        .then(() => result)
        .catch(err => _HandleError(err, result));
    }

    getLists() {
      let result = { data: null, statusCode: 200, errorMessage: null };

      return _http.get(this.endPointUrl + '/lists')
        .then(response => {
          if (response.data) {
            result.data = response.data.return;
          }
          return result;
        })
        .catch(err => _HandleError(err, result));
    }

    getAttachedLists(name) {
      let result = { data: null, statusCode: 200, errorMessage: null };

      return _http.get(this.endPointUrl + '/attached/lists/' + name)
        .then(response => {
          if (response.data) {
            result.data = response.data.return;
          }
          return result;
        })
        .catch(err => _HandleError(err, result));
    }


    getAttachedDnis(name) {
      let result = { data: null, statusCode: 200, errorMessage: null };

      return _http.get(this.endPointUrl + '/attached/dnis/' + name)
        .then(response => {
          if (response.data) {
            result.data = response.data.return;
          }
          return result;
        })
        .catch(err => _HandleError(err, result));
    }


    getDNIS() {
      let result = { data: null, statusCode: 200, errorMessage: null };
      return _http.get(this.endPointUrl + '/dnis')
        .then(response => {
          if (response.data) {
            result.data = response.data.return;
          }
          return result;
        })
        .catch(err => _HandleError(err, result));
    }

    addDNIS(dnisCampaign) {
      let result = { data: null, statusCode: 200, errorMessage: null };
      return _http.post(this.endPointUrl + '/dnis', dnisCampaign)
        .then(() => result)
        .catch(err => _HandleError(err, result));
    }


    removeDnis(listCampaign) {
      let result = { data: null, statusCode: 200, errorMessage: null };
      let dnisToRemove={DNISList:listCampaign.DNISList};
      return _http({
          url: this.endPointUrl + '/dnis/'+listCampaign.campaignName,
          method: 'DELETE',
          data:dnisToRemove,
          headers: { 'Content-Type': 'application/json;charset=utf-8' }
      })
      .then(() => result)
      .catch(err => _HandleError(err, result));
    }


    addLists(listCampaign) {
      let result = { data: null, statusCode: 200, errorMessage: null };
      return _http.post(this.endPointUrl + '/lists', listCampaign)
        .then(() => result)
        .catch(err => _HandleError(err, result));
    }

    removeLists(listCampaign) {
      let result = { data: null, statusCode: 200, errorMessage: null };      
      let listsToRemove={lists:listCampaign.lists};
         
      return _http({
          url: this.endPointUrl + '/lists/'+listCampaign.campaignName,
          method: 'DELETE',
          data:listsToRemove,
          headers: { 'Content-Type': 'application/json;charset=utf-8' }
      })
      .then(() => result)
      .catch(err => _HandleError(err, result));
    }

    startCampaign(campaignName) {
      let result = { data: null, statusCode: 200, errorMessage: null };

      return _http.put(this.endPointUrl + '/start/' + campaignName)
        .then(() => result)
        .catch(err => _HandleError(err, result));
    }

    stopCampaign(campaignName) {
      let result = { data: null, statusCode: 200, errorMessage: null };

      return _http.put(this.endPointUrl + '/stop/' + campaignName)
        .then(() => result)
        .catch(err => _HandleError(err, result));
    }

    deleteCampaign(name) {
      let result = { data: null, statusCode: 204, errorMessage: null };
      return _http.delete(this.endPointUrl + '/' + name)
        .then(() => result)
        .catch(err => _HandleError(err, result));
    }




  }

  CampaignService.$inject = ['$http','HandleError','appConfig'];

  angular.module('fakiyaMainApp')
    .service('CampaignService', CampaignService);

})();



'use strict';

(function () {

  let _state, _stateParams, _timeout, _CampaignService, _ConfirmAsync;


  class ListComponent {
    constructor($state, $stateParams, $timeout, ConfirmAsync, CampaignService) {
      console.log('contrusctor Campaign ListComponent');

      this.campaigns = [];
      this.totalItems = 0;
      this.currentPage = 1;
      this.sortKey = '';
      this.reverse = true;
      this.numPerPage = 10;
      this.beginNext = 0;
      this.quantities = [5, 10, 15, 20];
      this.toggleCampaignRow = -1;
      this.message = { show: false };
      this.typeCampaignFilter = '';   
      _state = $state;
      _stateParams = $stateParams;
      _timeout = $timeout;
      _CampaignService = CampaignService;
      _ConfirmAsync = ConfirmAsync;


      if (_stateParams.message !== null) {
        console.log('stateParams');
        console.log(_stateParams);
        this.message = { show: true, type: _stateParams.message.type, text: _stateParams.message.text };
        $timeout(() => {
          this.message.show = false;
        }, 3000);
      }


    }
    $onInit() {
      this.getCampaigns();
    }
    getCampaigns() {
      return _CampaignService.getCampaigns()
        .then(response => {
          console.log('response in cliente');
          console.log(response);
          if (response.statusCode === 200) {
            this.campaigns = response.data;
            this.totalItems = this.campaigns.length;
            return response;
          } else { // error diferent status 
            this.message = { show: true, type: 'danger', text: response.error.body };
            return null;
          }
        }).catch(err => {
          console.log('====ERROR IN CLIENT====');
          console.log(err);
        });
    }



    pageChanged() {
      console.log('Page changed to: ' + this.currentPage);
      this.beginNext = (this.currentPage - 1) * this.numPerPage;
      console.log('beginNext:' + this.beginNext);
    }

    sortColumn(columnName) {
      if (columnName !== undefined && columnName) {
        //   console.log('sorting:' + columnName);
        this.sortKey = columnName;
        this.reverse = !this.reverse;
        return true;
      } else {
        return false;
      }
    }
    
    deleteCampaign(campaign, indexRow) {

      return _ConfirmAsync('Are you sure to delete "' + campaign.name + '"?')
        .then(() => {
          this.toggleCampaignRow = indexRow;
          return _CampaignService.deleteCampaign(campaign.name);
        })
        .then(response => {
          console.log('response in client');
          console.log(response);

          if (response.statusCode === 204 && response.error === null) {
            let index = this.campaigns.indexOf(campaign);

            this.campaigns.splice(index, 1);

            this.toggleCampaignRow = -1;
            this.message = { show: true, type: 'success', text: 'Campaign "' + campaign.name + '" Deleted' };

            _timeout(() => {
              this.message.show = false;
            }, 3000);
            return true;
          } else {
            this.message = { show: true, type: 'danger', text: response.error.body };
            return false;
          }
          //   return response;
        })
        .catch((err) => {
          if (err) {
            console.log('====ERROR IN CLIENT====');
            console.log(err);
          }
          return false;
        });
    }

    updateState(item){     
        if(item.state==='RUNNING'){
          return _CampaignService.stopCampaign(item.name)
          .then(response=>{
              if(response.statusCode===200){
                item.state='NOT_RUNNING';            
                return true;
              }else {
                this.message = { show: true, type: 'danger', text: response.error.body };
                return false;
              }
          }).catch(err => {
              console.log('====ERROR IN CLIENT====');
              console.log(err);
          });
       }else{        
          return _CampaignService.startCampaign(item.name)
          .then(response=>{
              if(response.statusCode===200){
                item.state='RUNNING';      
                return true;
              }else {
                this.message = { show: true, type: 'danger', text: response.error.body };
                return false;
              }
          }).catch(err => {
              console.log('====ERROR IN CLIENT====');
              console.log(err);
          });
       }

    }   


    getDetail(item) {
      let typeEdit = item.type.toLowerCase();
      _state.go('campaigns.edit-' + typeEdit, { campaign: item });
    }
    
  }
  ListComponent.$inject = ['$state', '$stateParams', '$timeout', 'ConfirmAsync', 'CampaignService'];
  angular.module('fakiyaMainApp')
    .component('al.campaigns.list', {
      templateUrl: 'app/features/al/campaigns/list/list.html',
      controller: ListComponent
    });

})();

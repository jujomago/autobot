'use strict';

(function () {

  let _state, _stateParams, _timeout, _CampaignService, _ConfirmAsync;


  class ListComponent {
    constructor($state, $stateParams, $timeout, $filter, ConfirmAsync, CampaignService) {
      this.campaigns = [];
      this.currentPage = 1;
      this.sortKey = '';
      this.reverse = true;
      this.numPerPage = 10;
      this.beginNext = 0;
      this.quantities = [5, 10, 15, 20];
      this.toggleCampaignRow = -1;
      this.toggleStatusRow=-1;
      this.message = { show: false };
      this.typeCampaignFilter = '';

      this.search={name:''};
      this.filteredCampaigns=[];
      this.filter = $filter;
      this.totalMin = false;


      _state = $state;
      _stateParams = $stateParams;
      _timeout = $timeout;
      _CampaignService = CampaignService;
      _ConfirmAsync = ConfirmAsync;


      if (_stateParams.message !== null) {
         this.message={ show: true, type: _stateParams.message.type, text: _stateParams.message.text, expires:3000};
      }
    }
    $onInit() {
      this.getCampaigns();
      this.sortColumn('name');
    }

    getCampaigns() {
      return _CampaignService.getCampaigns()
        .then(response => {
          if (response.statusCode === 200) {
              this.campaigns = response.data;
           }
           return response;
        })
       .catch(error =>{
          this.message={ show: true, type: 'danger', text: error.errorMessage };
          return error;
      });
    }

    pageChanged() {
      this.beginNext = (this.currentPage - 1) * this.numPerPage;
    }

    sortColumn(columnName) {
      if (columnName !== undefined && columnName) {
        this.sortKey = columnName;
        this.reverse = !this.reverse;
        this.campaigns = this.filter('orderBy')(this.campaigns, this.sortKey, this.reverse);
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
          if (response.statusCode === 204) {
            let index = this.campaigns.indexOf(campaign);

            this.campaigns.splice(index, 1);
            this.toggleCampaignRow = -1;
            this.message={ show: true,
                           type: 'success',
                           text: 'Campaign Deleted Successfully',
                           expires:3000};
           // this.showMessage('success','Campaign "' + campaign.name + '" Deleted',3000);
            return response;
          }
        })
        .catch(error =>{
            this.message={ show: true, type: 'danger', text: error.errorMessage };
            return error;
        });
    }

    verifyDependendies(campaign){
          if(campaign.type==='INBOUND'){
              // CHECK DNIS
              return _CampaignService.getAttachedDnis(campaign.name);

          }else{
            //check lists
             return _CampaignService.getAttachedLists(campaign.name);
          }
    }

    updateState(item, indexRow){
     this.toggleStatusRow = indexRow;
     if(item.state==='RUNNING'){
        item.statusBtnText='Stopping';
     }
     else{
        item.statusBtnText='Starting';
     }
     return this.verifyDependendies(item)
      .then(response=>{
         if(response.data===null && response.statusCode===200){
            if(item.type==='INBOUND'){
              this.message={ show: true, type: 'warning', text: 'No DNIS numbers attached to the campain', expires:5000 };
            }else{
              this.message={ show: true, type: 'warning', text: 'No Lists attrached to the campain', expires:5000 };
            }

        }
        return response;
      })
     .then(()=>{

        if(item.state==='RUNNING'){
          return _CampaignService.stopCampaign(item.name)
          .then(response=>{
              if(response.statusCode===200){
                item.state='NOT_RUNNING';
                item.statusBtnText='Start';
                this.toggleStatusRow = -1;
                 this.message={ show: true,
                           type: 'success',
                           text: 'Stopped Successfully',
                           expires:2000};

              }
              return response;
          })
          .catch(error =>{
              item.statusBtnText='Stop';
              this.toggleStatusRow = -1;
              this.message={ show: true, type: 'danger', text: error.errorMessage };
              return error;
          });

       }else{
          return _CampaignService.startCampaign(item.name)
          .then(response=>{
              if(response.statusCode===200){
                item.state='RUNNING';
                 item.statusBtnText='Stop';
                this.toggleStatusRow = -1;
                this.message={ show: true, type: 'success', text: 'Started Successfully', expires:2000 };
              }
            return response;
          })
          .catch(error =>{
              item.statusBtnText='Start';
              this.toggleStatusRow = -1;
              this.message={ show: true, type: 'danger', text: error.errorMessage };
              return error;
          });
       }
     })
      .catch(error =>{
          this.message={ show: true, type: 'danger', text: error.errorMessage, expires: 5000 };
          return error;
      });

    }
    getMax(){
        let total=this.currentPage*this.numPerPage;
        return (total>this.filteredCampaigns.length)?this.filteredCampaigns.length+'':total;
    }
    getDetail(item) {
      let typeEdit = item.type.toLowerCase();
      _state.go('ap.al.campaignsEdit-' + typeEdit, { name: item.name });
    }

    filteringBySearch(){
      this.beginNext = 0;
      this.currentPage = 1;
      if(this.search.name || this.typeCampaignFilter){
          let total = this.filter('filter')(this.campaigns, {name: this.search.name, type: this.typeCampaignFilter});
          this.totalItems = total.length;
          this.totalMin = this.totalItems < this.numPerPage ? true : false;
          return true;
      }else{
          this.totalItems = this.campaigns.length;
          return false;
      }
    }



  }
  ListComponent.$inject = ['$state', '$stateParams', '$timeout', '$filter', 'ConfirmAsync', 'CampaignService'];
  angular.module('fakiyaMainApp')
    .component('al.campaigns.list', {
      templateUrl: 'app/features/al/campaigns/list/list.html',
      controller: ListComponent
    });

})();

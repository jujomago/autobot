'use strict';
(function(){
	let _$stateParams, _$state, _$filter;
	let _CampaignProfilesService, _ConfirmAsync;
	function _replaceUndefined(campaignProfile){
        if(!campaignProfile.description){
            campaignProfile.description = '';
        }
        return campaignProfile;
    }
	class ListComponent {
		constructor($stateParams, $state, $filter, CampaignProfilesService, ConfirmAsync) {
		    this.campaignProfiles = [];
		    _$stateParams = $stateParams;
		    this.message = { show: false }; 
		    if (_$stateParams.message) {
		      this.message = { show: true, type: _$stateParams.message.type, text: _$stateParams.message.text,expires: 3000 };
		    }
		    _CampaignProfilesService = CampaignProfilesService;
		    _$filter = $filter;
		    this.currentPage = 1;
		    this.sortKey = '';
		    this.reverse = true;
		    this.numPerPage = 10;
		    this.beginNext = 0;
		    this.quantities = [5, 10, 15, 20];
		    this.deletedRow = null;
		    this.search={name:''};
		    this.originalCampaignProfiles=[];
		    _$state = $state;
		    _ConfirmAsync = ConfirmAsync;
		}
		$onInit() {
			this.getCampaignProfiles();
		}
		getCampaignProfiles() {
			return _CampaignProfilesService.getCampaignProfiles()
			.then(response => {         
			  if (response.statusCode === 200) {
			      this.originalCampaignProfiles = response.data.map(_replaceUndefined);
			      this.campaignProfiles = this.originalCampaignProfiles;
			      this.sortColumn('name');
			   } 
			   return this.campaignProfiles;
			})
			.catch(error =>{    
			  this.message={ show: true, type: 'warning', text: error.errorMessage};
			  return error;
			});
		}
		orderList(list){
			if(this.sortKey){
				this.campaignProfiles = _$filter('orderBy')(list, this.sortKey, this.reverse);
			}
		}
		sortColumn(columnName) {
		    if (columnName !== undefined && columnName) {
		        this.sortKey = columnName;
		        this.reverse = !this.reverse;
		        this.orderList(this.campaignProfiles);
		        return true;
		    } else {
		        return false;
		    }
		}
		getMax(){
			let total=this.currentPage*this.numPerPage;
			return (total>this.campaignProfiles.length)?this.campaignProfiles.length+'':total;
		}
		filteringBySearch(){  
			this.campaignProfiles = _$filter('filter')(this.originalCampaignProfiles, this.search);
			this.orderList(this.campaignProfiles);
			if(this.search.name){               
			  this.beginNext=0;
			  this.currentPage = 1;
			  return true;
			}
			return false;
		}
		pageChanged() {
		  this.beginNext = (this.currentPage - 1) * this.numPerPage;
		}
		deleteCampaignProfile(item) {
			return _ConfirmAsync('Remove '+item.name+'?')
			    .then(() => {                 
			     
			        this.deletedRow = item.name;
			        return _CampaignProfilesService.deleteCampaignProfile(item)
			            .then(response => {       
			                if (response.statusCode === 204 && response.data === null) {
			                    let index = this.campaignProfiles.indexOf(item);
			                    this.campaignProfiles.splice(index, 1);
			                    this.deletedRow = null;
			                    this.message = { show: true, type: 'success', text: 'Campaign Profile Deleted', expires: 3000 };
			                }
			                return response;
			            }).catch(error => {
			            	this.deletedRow = null;
			            	this.message = { show: true, type: 'danger', text: error.errorMessage, expires:8000};
			            });
			    })
			    .catch(() => {
			        return false;
			    });
		}
	}
	ListComponent.$inject = ['$stateParams', '$state', '$filter', 'CampaignProfilesService', 'ConfirmAsync'];
	angular.module('fakiyaMainApp')
	  .component('al.campaignProfiles.list', {
	    templateUrl: 'app/features/al/campaignProfiles/list/list.html',
	    controller: ListComponent
	  });

})();

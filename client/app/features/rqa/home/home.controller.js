'use strict';
(function(){
const displayNames = {'CUSTOMER NAME': 'Client', 'DNIS': 'Telephone', 'AGENT NAME': 'Agent', 'CAMPAIGN': 'Campaign', 'DISPOSITION': 'Dispositions'};
let _ReportsService, _ModalManager;
function _getHoursRange(hours){
	let now = new Date();
	let start = angular.copy(now);
	start.setHours(start.getHours()-hours);
	return {startDate: start, endDate: now};
}
function _getDaysRange(days){
	let end = new Date();
	end.setDate(end.getDate()-days);
	let start = angular.copy(end);
	start.setHours(0,0,0,0);
	if(days!==0){
		end.setHours(23,59,59,999);
	}
	return {startDate: start, endDate: end};
}
function _getWeeksRange(days){
	let end = new Date();
	let start = angular.copy(end);
	start.setDate(start.getDate()-days);
	start.setHours(0,0,0,0);
	return {startDate: start, endDate: end};
}
function _getMonthRange(month){
  let today = new Date();
  let end = new Date(today.getFullYear(),today.getMonth()+1-month,0);
  let start = angular.copy(end);
  start.setDate(1);
  start.setHours(0,0,0,0);
  return {startDate: start, endDate: end};
}
class HomeComponent {
  constructor(ReportsService, ModalManager) {
   this.headers = ['DATE', 'CLIENT', 'TELEPHONE', 'AGENT', 'CAMPAIGN', 'DISPOSITIONS', 'CALL RECORDING', 'QA SCORE'];
   this.notUsedFilters = [{key: 'CUSTOMER NAME', value: ''}, {key: 'DNIS', value: ''}, {key: 'AGENT NAME', value: ''}, {key: 'CAMPAIGN', value: ''}, {key: 'DISPOSITION', value: ''}];
   this.dates = [{key: 'Last hour', function: _getHoursRange, value: 1},{key: 'Last 2 hours', function: _getHoursRange, value: 2},{key: 'Last 4 hours', function: _getHoursRange, value: 4},{key: 'Today', function: _getDaysRange, value: 0},{key: 'Yesterday', function: _getDaysRange, value: 1},{key: 'This week', function: _getWeeksRange, value: 6},{key: 'Last 2 weeks', function: _getWeeksRange, value: 13},{key: 'This month', function: _getMonthRange, value: 0},{key: 'Last month', function: _getMonthRange, value: 1}];
   this.tmpSelectedDate = this.dates[5];
   this.selectedDate = {};
   this.selectedOption = this.notUsedFilters[0];
   this.usedFilters = [];
   this.openedPopups ={};
   this.calls = [];
   this.open = true;
   this.selectedPopover = null;
   this.isLoading = true;
   this.message = {show: false};
   this.isFilter = true;
   _ReportsService = ReportsService;
   _ModalManager = ModalManager;
  }
  $onInit(){
      this.applyDate();
  }
  switchFilters(){
    if(this.isFilter || !this.open){
    	this.open = !this.open;
    }
      this.isFilter = true;

  }
  selectReports(){
    if(!this.isFilter || !this.open){
      this.open = !this.open;
    }
    this.isFilter = false;
  }
  closeFilters(){
  	this.open = false;
  }
  getFilters(){
  	return this.usedFilters.reduce((result, item)=>{
  		result[item.key] = item.value;
  		return result;
  	}, {});
  }
  openModal(){
    this.modalInstance = _ModalManager.open({
      animation: false,
      size: 'fixed-660',
      controllerAs: '$ctrl',
      appendTo: angular.element('#rqa-modal-container'),
      windowTopClass: 'light-modal',
      template: '<qa-form-modal></qa-form-modal>'
    });
  }
  closeAllPopups(){
  	let keys = Object.keys(this.openedPopups);
  	this.openedPopups['default'] = false;
  	this.openedPopups.date = false;
  	keys.forEach(key => {
  		this.openedPopups[key] = false;
  	});
  	this.selectedPopover = null;
  }
  removeAllFilters(){
  	this.usedFilters.forEach(item =>{
  		this.notUsedFilters.push(item);
  	});
  	this.usedFilters = [];
  }
  removeFilter(item){
  	let index = this.usedFilters.indexOf(item);
  	this.usedFilters.splice(index, 1);
  	item.value = '';
  	this.notUsedFilters.push(item);
  }
  applyFilter(selectedItem){
	let index = this.notUsedFilters.indexOf(this.selectedOption);
  	if(index>-1){
	  	let item = this.notUsedFilters[index];
	  	this.notUsedFilters.splice(index, 1);
	  	item.value = this.selectedValue;
	  	if(!selectedItem){
			this.usedFilters.push(item);
		}
		else{
			this.notUsedFilters.push({key: selectedItem.key, value: ''});
			selectedItem.key = this.selectedOption.key;
			selectedItem.value = this.selectedValue;
		}
	}
	else{
		selectedItem.value = this.selectedValue;
	}
  	this.closeAllPopups();

  }
  getDisplayName(key){
  	return displayNames[key];
  }
  selectDate(){
  	this.tmpSelectedDate = this.selectedDate;
  }
  applyDate(isReload){
      this.closeAllPopups();
      if(this.selectedDate.key !== this.tmpSelectedDate.key || (isReload && !this.isLoading)){
            this.isLoading = true;
        	this.selectedDate = this.tmpSelectedDate;
        	let range = this.selectedDate.function(this.selectedDate.value);
        	let identifier;
        	return _ReportsService.sendCallLogRequest(range.startDate.toISOString(), range.endDate.toISOString())

        	.then(response =>{
        		identifier = response.data.return;
        		return _ReportsService.isRunning(identifier);
        	})
        	.then(() => {
        		console.log(identifier);
        		return _ReportsService.getCallLogResult(identifier);
        	})
        	.then(response =>{
        		this.calls = response.data.return;
        		this.isLoading = false;
            this.message = {show: false};
            return response;
        	})
          .catch(error =>{
            this.message = {show: true, text: error.errorMessage};
            this.isLoading = false;
            this.calls = [];
            return error;
          });
      }
      return null;

  }
  selectPopover(filter){
  	this.selectedPopover = filter;
  	this.availablesFilters = [];
  	this.notUsedFilters.forEach(item =>{
  		this.availablesFilters.push(item);
  	});
  	if(filter){
  		this.availablesFilters.unshift(filter);
  		this.selectedOption = filter;
  		this.selectedValue = filter.value;
  	}
  	else{
  		this.selectedValue = '';
  		this.selectedOption = this.notUsedFilters[0];
  	}
  }
}
HomeComponent.$inject = ['ReportsService', 'ModalManager'];
angular.module('fakiyaMainApp')
  .component('rqa', {
    templateUrl: 'app/features/rqa/home/home.html',
    controller: HomeComponent
  });

})();

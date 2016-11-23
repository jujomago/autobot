'use strict';
(function(){
let mockData = [
    {
      "CALL ID": 24381,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "Operator Intercept",
      "ANI": 8883121153,
      "CUSTOMER NAME": "",
      "DNIS": 9255555555,
      "CALL TIME": "00:00:00",
      "BILL TIME (ROUNDED)": "00:00:00",
      "COST": 0,
      "IVR TIME": "00:00:00",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": "",
      "RECORDINGS": ""
    },
    {
      "CALL ID": 24382,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "No Disposition",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Paul Ruedi",
      "DNIS": 9252012068,
      "CALL TIME": "00:00:03",
      "BILL TIME (ROUNDED)": "00:00:06",
      "COST": 0.0036,
      "IVR TIME": "00:00:03",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": 0,
      "RECORDINGS": ""
    },
    {
      "CALL ID": 24383,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "No Answer",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Sven Ruedi",
      "DNIS": 9255191547,
      "CALL TIME": "00:00:00",
      "BILL TIME (ROUNDED)": "00:00:00",
      "COST": 0,
      "IVR TIME": "00:00:00",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": "",
      "RECORDINGS": ""
    },
    {
      "CALL ID": 24384,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "Operator Intercept",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Ken Osborn",
      "DNIS": 9788874941,
      "CALL TIME": "00:00:00",
      "BILL TIME (ROUNDED)": "00:00:00",
      "COST": 0,
      "IVR TIME": "00:00:00",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": "",
      "RECORDINGS": ""
    },

    {
      "CALL ID": 24384,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "Operator Intercept",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Ken Osborn",
      "DNIS": 9788874941,
      "CALL TIME": "00:00:00",
      "BILL TIME (ROUNDED)": "00:00:00",
      "COST": 0,
      "IVR TIME": "00:00:00",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": "",
      "RECORDINGS": ""
    },

    {
      "CALL ID": 24384,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "Operator Intercept",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Ken Osborn",
      "DNIS": 9788874941,
      "CALL TIME": "00:00:00",
      "BILL TIME (ROUNDED)": "00:00:00",
      "COST": 0,
      "IVR TIME": "00:00:00",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": "",
      "RECORDINGS": ""
    },

    {
      "CALL ID": 24384,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "Operator Intercept",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Ken Osborn",
      "DNIS": 9788874941,
      "CALL TIME": "00:00:00",
      "BILL TIME (ROUNDED)": "00:00:00",
      "COST": 0,
      "IVR TIME": "00:00:00",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": "",
      "RECORDINGS": ""
    },

    {
      "CALL ID": 24384,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "Operator Intercept",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Ken Osborn",
      "DNIS": 9788874941,
      "CALL TIME": "00:00:00",
      "BILL TIME (ROUNDED)": "00:00:00",
      "COST": 0,
      "IVR TIME": "00:00:00",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": "",
      "RECORDINGS": ""
    },

    {
      "CALL ID": 24384,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "Operator Intercept",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Ken Osborn",
      "DNIS": 9788874941,
      "CALL TIME": "00:00:00",
      "BILL TIME (ROUNDED)": "00:00:00",
      "COST": 0,
      "IVR TIME": "00:00:00",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": "",
      "RECORDINGS": ""
    },

    {
      "CALL ID": 24384,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "Operator Intercept",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Ken Osborn",
      "DNIS": 9788874941,
      "CALL TIME": "00:00:00",
      "BILL TIME (ROUNDED)": "00:00:00",
      "COST": 0,
      "IVR TIME": "00:00:00",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": "",
      "RECORDINGS": ""
    },

    {
      "CALL ID": 24384,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "Operator Intercept",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Ken Osborn",
      "DNIS": 9788874941,
      "CALL TIME": "00:00:00",
      "BILL TIME (ROUNDED)": "00:00:00",
      "COST": 0,
      "IVR TIME": "00:00:00",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": "",
      "RECORDINGS": ""
    },
    {
      "CALL ID": 24382,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "No Disposition",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Paul Ruedi",
      "DNIS": 9252012068,
      "CALL TIME": "00:00:03",
      "BILL TIME (ROUNDED)": "00:00:06",
      "COST": 0.0036,
      "IVR TIME": "00:00:03",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": 0,
      "RECORDINGS": ""
    },
    {
      "CALL ID": 24383,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "No Answer",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Sven Ruedi",
      "DNIS": 9255191547,
      "CALL TIME": "00:00:00",
      "BILL TIME (ROUNDED)": "00:00:00",
      "COST": 0,
      "IVR TIME": "00:00:00",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": "",
      "RECORDINGS": ""
    },
    {
      "CALL ID": 24384,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "Operator Intercept",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Ken Osborn",
      "DNIS": 9788874941,
      "CALL TIME": "00:00:00",
      "BILL TIME (ROUNDED)": "00:00:00",
      "COST": 0,
      "IVR TIME": "00:00:00",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": "",
      "RECORDINGS": ""
    },

    {
      "CALL ID": 24384,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "Operator Intercept",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Ken Osborn",
      "DNIS": 9788874941,
      "CALL TIME": "00:00:00",
      "BILL TIME (ROUNDED)": "00:00:00",
      "COST": 0,
      "IVR TIME": "00:00:00",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": "",
      "RECORDINGS": ""
    },

    {
      "CALL ID": 24384,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "Operator Intercept",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Ken Osborn",
      "DNIS": 9788874941,
      "CALL TIME": "00:00:00",
      "BILL TIME (ROUNDED)": "00:00:00",
      "COST": 0,
      "IVR TIME": "00:00:00",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": "",
      "RECORDINGS": ""
    },

    {
      "CALL ID": 24384,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "Operator Intercept",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Ken Osborn",
      "DNIS": 9788874941,
      "CALL TIME": "00:00:00",
      "BILL TIME (ROUNDED)": "00:00:00",
      "COST": 0,
      "IVR TIME": "00:00:00",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": "",
      "RECORDINGS": ""
    },

    {
      "CALL ID": 24384,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "Operator Intercept",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Ken Osborn",
      "DNIS": 9788874941,
      "CALL TIME": "00:00:00",
      "BILL TIME (ROUNDED)": "00:00:00",
      "COST": 0,
      "IVR TIME": "00:00:00",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": "",
      "RECORDINGS": ""
    },

    {
      "CALL ID": 24384,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "Operator Intercept",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Ken Osborn",
      "DNIS": 9788874941,
      "CALL TIME": "00:00:00",
      "BILL TIME (ROUNDED)": "00:00:00",
      "COST": 0,
      "IVR TIME": "00:00:00",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": "",
      "RECORDINGS": ""
    },

    {
      "CALL ID": 24384,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "Operator Intercept",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Ken Osborn",
      "DNIS": 9788874941,
      "CALL TIME": "00:00:00",
      "BILL TIME (ROUNDED)": "00:00:00",
      "COST": 0,
      "IVR TIME": "00:00:00",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": "",
      "RECORDINGS": ""
    },
    
    {
      "CALL ID": 24384,
      "TIMESTAMP": "Thu, 27 Oct 2016 14:51:34",
      "CAMPAIGN": "[Deleted]",
      "CALL TYPE": "Autodial",
      "AGENT": "[None]",
      "AGENT NAME": "",
      "DISPOSITION": "Operator Intercept",
      "ANI": 8883121153,
      "CUSTOMER NAME": "Ken Osborn",
      "DNIS": 9788874941,
      "CALL TIME": "00:00:00",
      "BILL TIME (ROUNDED)": "00:00:00",
      "COST": 0,
      "IVR TIME": "00:00:00",
      "QUEUE WAIT TIME": "00:00:00",
      "RING TIME": "",
      "TALK TIME": "00:00:00",
      "HOLD TIME": "00:00:00",
      "PARK TIME": "00:00:00",
      "AFTER CALL WORK TIME": "00:00:00",
      "TRANSFERS": "",
      "CONFERENCES": "",
      "HOLDS": "",
      "ABANDONED": "",
      "RECORDINGS": ""
    }
  ];

const displayNames = {'CUSTOMER NAME': 'Client', 'DNIS': 'Telephone', 'AGENT': 'Agent', 'CAMPAIGN': 'Campaign', 'DISPOSITION': 'Dispositions'};
class HomeComponent {
  constructor() {
   this.headers = ['DATE', 'CLIENT', 'TELEPHONE', 'AGENT', 'CAMPAIGN', 'DISPOSITIONS', 'CALL RECORDING', 'QA SCORE'];
   this.notUsedFilters = [{key: 'CUSTOMER NAME', value: ''}, {key: 'DNIS', value: ''}, {key: 'AGENT', value: ''}, {key: 'CAMPAIGN', value: ''}, {key: 'DISPOSITION', value: ''}];
   this.dates = [{key: 'Last hour'},{key: 'Last 2 hours'},{key: 'Last 4 hours'},{key: 'Today'},{key: 'Yesterday'},{key: 'This week'},{key: 'Last week'},{key: 'Last 2 weeks'},{key: 'This month'}];
   this.selectedDate = this.dates[0];
   this.selectedOption = this.notUsedFilters[0];
   this.usedFilters = [];
   this.openedPopups ={};
   this.calls = mockData;
   this.open = false;
   this.selectedPopover = null;
  }
  switchFilters(){
  	this.open = !this.open;
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
  closeAllPopups(){
  	let keys = Object.keys(this.openedPopups);
  	this.openedPopups['default'] = false;
  	this.openedPopups['date'] = false;
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
  applyDate(){
  	this.selectedDate = this.tmpSelectedDate;
  	//call endpoints
  	this.closeAllPopups();
  }
  selectPopover(filter){
  	this.selectedPopover = filter;
  	this.availablesFilters = [];
  	this.notUsedFilters.forEach(item =>{
  		this.availablesFilters.push(item);
  	})
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

angular.module('fakiyaMainApp')
  .component('home', {
    templateUrl: 'app/features/rqa/home/home.html',
    controller: HomeComponent
  });

})();

'use strict';
(function(){
  function _parseDate(d, t){
    let time = {h:'', m:'', s:''};
    let date = {d:'', m:'', y:''};
    let dateTime = new Date();
    date.d = d.getDate();
    date.m = d.getMonth();
    date.y = d.getFullYear();

    if(!d && !t){
      return dateTime;
    }

    if(t){
      time.h = t.getHours();
      time.m = t.getMinutes();
      time.s = t.getSeconds();
      dateTime = new Date(date.y, date.m, date.d, time.h, time.m, time.s);
    }else{
      dateTime = new Date(date.y, date.m, date.d, '00', '00', '00');
    }
    return dateTime;
  }

  function _getTime(dates, contact){
    let hours;
    let minutes;
    let seconds;
    dates.map((value, key)=>{
      if(contact[value.name] !== '' && contact[value.name] !== null){
        hours = contact[value.name].getHours();
        minutes = contact[value.name].getMinutes();
        seconds = contact[value.name].getSeconds();
        dates[key].date = contact[value.name];
        dates[key].time = new Date(new Date(1970, 0, 1, hours, minutes, seconds));
      }
    });
    return dates;
  }
class ContactModalComponent {
  constructor() {
  	   this.message = { show: false };
  }

  $onInit(){

  	this.instance = this.edit.modalInstance;

    this.numbers = [];

    this.dates = [];

    this.manual = this.edit.manual;

    this.fields = this.edit.importData.fields;

    this.method = this.edit.method;

    this.phoneRequired = (this.manual && this.method === 'create') ? true : false;
    console.log(`phoneRequired ${this.phoneRequired}`);
    //this.phoneRequired=false;

    this.contactModal = [];
    if(this.method === 'update'){
        this.contactModal = angular.copy(this.edit.contact);
    }
    
    this.formDataModal = this.getValidation(this.fields);

    if(Object.keys(this.contactModal).length > 0){
    	if(this.dates.lentgh>0){
    		this.dates = _getTime(this.dates, this.contactModal);
    	}
    }

    this.contact = this.contactModal;

    this.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      showWeeks: false
    };
  }

  getValidation(fields){
    let validation = [];
    let typeInput;
    let atLeastRequireOnePhone=false;

    if(fields.map(val=>val.name).indexOf('number1')>=0){
      atLeastRequireOnePhone=true;
    }

    fields.map((value, key)=>{

      switch(value.type){
        case 'PHONE': typeInput = 'tel';
          break;
        case 'STRING': typeInput = 'text';
          break;
        case 'EMAIL': typeInput = 'email';
          break;
        case 'DATE_TIME': typeInput = 'date-text';
          break;
        case 'CURRENCY': typeInput = 'number';
          break;
        default:
          typeInput = 'text';
          break;
      }

    //  let required = (value.isKey) ? value.isKey: false;

      if(typeInput === 'date-text'){
        this.dates[key] = {opened: false, name: value.name, time: '', date: ''};
      }


      if(typeInput === 'tel'){
         if(atLeastRequireOnePhone){
            this.phoneRequired=true;
        }
        validation.push({'name': value.name, 'type': typeInput});
      }else{
        validation.push({'name': value.name, 'type': typeInput, 'maxlength': 250}); 
      }
    });

    return validation;
  }

  save(){
    console.log('save');
    console.log(this.contact);
    if(Object.keys(this.contact).length===0){
       this.message={ show: true, type: 'warning', text: 'Can\'t save empty Contact Record', expires: 3000};
        this.instance.close(null);
  }else{
      if(this.dates.length>0){
        this.dates.map((value)=>{
        if(value.date !== '' && value.date !== null){
          this.contact[value.name] = _parseDate(value.date, value.time);
        }
      });
      }
      this.instance.close(this.contact);
    }
 }

  cancel(){
	this.instance.dismiss('cancel');
  }

  openDatePicker(index) {
    this.dates[index].opened = true;
  }

  phoneChanged(){
    let numbers;
    let data = [];
    let number1Exists=angular.element('input[name="number1"]').length;
    if(number1Exists>0){
          numbers = angular.element('input[type="tel"]');
      numbers.map((key, value)=>{
        if(angular.element(value).val()){
          data.push(angular.element(value).val());
        }
      });

      if(data.length > 0){
        this.phoneRequired = false;
      }else{
        this.phoneRequired = true;
      }
      console.log(this.phoneRequired);
    }
  }
}
angular.module('fakiyaMainApp')
  .component('al.lists.contactModal', {
    templateUrl: 'app/features/al/lists/edit/step3-list/contactModal/contactModal.html',
    controller: ContactModalComponent,
    require: {
      edit: '?^al.lists.edit.list',
    }

});

})();

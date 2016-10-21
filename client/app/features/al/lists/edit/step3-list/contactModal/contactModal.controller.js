'use strict';
(function(){

class ContactModalComponent {
  constructor() {
  	   this.message = { show: false };

  }

  $onInit(){

  	this.instance = this.edit.modalInstance;
    this.contactFields = this.edit.contactFields;
    this.method = this.edit.method;
    this.phoneRequired = (this.manual && this.method === 'create') ? true : false;
    this.contactModal = {};
    this.contactFields.forEach(e=>{
      this.contactModal[e.name]='';
    });
    if(this.method === 'update'){
        this.contactModal = angular.copy(this.edit.contact);
    }
    this.contact = this.contactModal;
    console.log(this.edit.contactFields);
  }


  save(){
    if(Object.keys(this.contact).filter(val => {return this.contact[val]!=='';}).length===0){
       this.message={ show: true, type: 'warning', text: 'Can\'t save empty Contact Record', expires: 3000};
    }
    else if(this.contact.number1 === '' && this.contact.number2 === '' && this.contact.number3 === ''){
       this.message={ show: true, type: 'warning', text: 'The Contact Record does not have any number', expires: 3000}; 
    }
    else{
      this.instance.close(this.contact);
    }
 }
 getTypeMessage(field){
  let type = 'field';
  if(field.type==='PHONE'){
    return 'Contact Field "'+field.name+'" has an invalid value. Number must either be 10 digits for dialing within North America, or begin with "011" for international number. International number length should be no more than 20 digits. Please correct it.'
  }
  else if(field.type === 'NUMBER' || field.type === 'PERCENT' || field.type === 'CURRENCY'){
    type = 'number';
  }
  else if(field.type === 'EMAIL'){
   type = 'email'; 
  }
  else if(field.type === 'URL'){
    type = 'URL';
  }
  return 'Contact Field "'+field.name+'" has an invalid value. Invalid '+type+'. Please correct it.';
 }
 getMinMessage(field){
  let type = 'field';
  let chars ='';
  if(field.type==='STRING' || field.type === 'EMAIL' || field.type === 'URL'){
    type = 'String length';
    chars = ' characters';
  }
  else if(field.type === 'NUMBER' || field.type === 'PERCENT' || field.type === 'CURRENCY'){
    type = 'Number';
  }
  else if(field.type === 'DATE'){
    type = 'Date';
  }
  return 'Contact Field "'+field.name+'" has an invalid value. '+type+' cannot be less than '+field.minValue+chars+'. Please correct it.';
 }
  cancel(){
	this.instance.dismiss('cancel');
  }

  openDatePicker(index) {
    this.opened[index] = true;
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

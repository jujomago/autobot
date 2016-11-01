'use strict';
(function(){
  let _FieldFormatter;
class ContactModalComponent {
  constructor(FieldMessages, FieldFormatter) {
  	   this.message = { show: false };
       this.FieldMessages = FieldMessages;
       _FieldFormatter = FieldFormatter;
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
  }

  convertFields(){
    let keys = Object.keys(this.contact);
    for(let i=0;i<keys.length;i++){
      let key = keys[i];
      this.contact[key] = _FieldFormatter.removeExtraChars(this.contactFields[i], this.contact[key]);
    }
  }
  save(){
    if(Object.keys(this.contact).filter(val => {return this.contact[val]!=='';}).length===0){
       this.message={ show: true, type: 'warning', text: 'Can\'t save empty Contact Record', expires: 3000};
    }
    else if(this.contact.number1 === '' && this.contact.number2 === '' && this.contact.number3 === ''){
       this.message={ show: true, type: 'warning', text: 'The Contact Record does not have any number', expires: 3000}; 
    }
    else{
      this.convertFields();
      this.instance.close(angular.copy(this.contact));
    }
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
ContactModalComponent.$inject = ['FieldMessages', 'FieldFormatter'];
angular.module('fakiyaMainApp')
  .component('al.lists.contactModal', {
    templateUrl: 'app/features/al/lists/edit/step3-list/contactModal/contactModal.html',
    controller: ContactModalComponent,
    require: {
      edit: '?^al.lists.edit.list',
    }

});

})();

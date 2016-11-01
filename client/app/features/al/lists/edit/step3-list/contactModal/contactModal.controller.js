'use strict';
(function(){
class ContactModalComponent {
  constructor(FieldMessages) {
  	   this.message = { show: false };
       this.FieldMessages = FieldMessages;
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

    console.log('Method. ..',this.method);
    if(this.method === 'update'){

        this.contactModal = angular.copy(this.edit.contact);
    }
    this.contact = this.contactModal;
  }


  save(){
    if(Object.keys(this.contact).filter(val => {return this.contact[val]!=='';}).length===0){
       this.message={ show: true, type: 'warning', text: 'Can\'t save empty Contact Record', expires: 3000};
    }
    else if(this.contact.number1 === '' && this.contact.number2 === '' && this.contact.number3 === ''){
       this.message={ show: true, type: 'warning', text: 'The Contact Record does not have any number', expires: 3000};
    }
    else{
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
    }
  }
}
ContactModalComponent.$inject = ['FieldMessages'];
angular.module('fakiyaMainApp')
  .component('al.lists.contactModal', {
    templateUrl: 'app/features/al/lists/edit/step3-list/contactModal/contactModal.html',
    controller: ContactModalComponent,
    require: {
      edit: '?^al.lists.edit.list',
    }

});

})();

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
  setMessage(message){
    this.message={ show: true, type: 'danger', text: message, expires: 3000};
    angular.element('.contact-model-form')[0].scrollTop = 0;
  }
  save(){
    if(Object.keys(this.contact).filter(val => {return this.contact[val]!=='';}).length===0){
      this.setMessage('Can\'t save empty Contact Record');
    }
    else if(this.contact.number1 === '' && this.contact.number2 === '' && this.contact.number3 === ''){
      this.setMessage('The Contact Record does not have any number'); 
    }
    else{
      this.convertFields();
      this.instance.close(angular.copy(this.contact));
    }
 }
  cancel(){
	this.instance.dismiss('cancel');
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

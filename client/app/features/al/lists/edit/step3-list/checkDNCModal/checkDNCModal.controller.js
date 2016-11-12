'use strict';
(function(){
let _, _phones, _registeredPhones, _DncService;
function _registerPhone(contact, key){
	if(contact[key] && contact[key].substr(0,3)!=='011' && !_registeredPhones[contact[key]]){
		_registeredPhones[contact[key]] = true;
		_phones.push(contact[key]);
    }
}
class CheckDNCModalComponent {
  constructor(lodash, DncService) {
    this.validating = false;
    _ = lodash;
    _DncService = DncService;
    this.errorId = false;
  }
  $onInit(){
  	this.loadPhones();
  }
  loadPhones(){
    this.instance = this.parent.dncModalInstance;
    _phones = [];
    _registeredPhones = [];
    //this.phones = this.parent.list.(contact => contact.number1).join(',');
    _.each(this.parent.list, contact => {
      _registerPhone(contact, 'number1');
      _registerPhone(contact, 'number2');
      _registerPhone(contact, 'number3');
    });
    this.phones = _phones.join(',');
    if(this.phones.length===0){
      this.instance.close([]);
    }
  }
  dismiss(){
  	this.instance.dismiss('dismiss');
  }
  changeText(){
    this.errorId = false;
  }
  validate(){
  	this.validating = true;
    this.message = { show: false };
  	return _DncService.getDNC(this.loginId, this.phones)
  	.then(response => {
  		this.instance.close(response.data);
  	}).catch(() => {
      this.validating = false;
      this.errorId = true;
    });
  }
}
CheckDNCModalComponent.$inject = ['lodash', 'DncService'];
angular.module('fakiyaMainApp')
  .component('checkDncModal', {
    templateUrl: 'app/features/al/lists/edit/step3-list/checkDNCModal/checkDNCModal.html',
    controller: CheckDNCModalComponent,
    require: {
      parent: '?^al.lists.edit.list',
    }
  });

})();

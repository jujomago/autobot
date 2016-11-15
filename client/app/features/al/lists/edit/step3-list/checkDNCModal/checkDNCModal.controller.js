'use strict';
(function(){
let _, _DncService;
class CheckDNCModalComponent {
  constructor(lodash, DncService) {
    this.validating = false;
    _ = lodash;
    _DncService = DncService;
    this.errorId = false;
  }
  $onInit(){
  	this.instance = this.parent.dncModalInstance;
    this.phones = this.parent.phones;
  }
  dismiss(){
  	this.instance.dismiss('dismiss');
  }
  changeText(){
    this.errorId = false;
  }
  validate(){
  	this.validating = true;
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

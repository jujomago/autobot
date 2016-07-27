'use strict';
(function(){
let _$modalInstance;
class ChangePasswordComponent {
  constructor() {
    this.message = {show: false};
    this.SubmitText ='Save';
  }
  $onInit(){
     if(this.create){
        this.instance = this.create.modalInstance;
     }else if(this.edit){
        this.instance = this.edit.modalInstance;
     }
  }
  save(){
    this.SubmitText = 'Saving...';
    if(this.password === this.confirm){
      this.instance.close(this.password);
    }
    else{
      this.SubmitText = 'Save';
      this.message = { show: true, type: 'danger', text: 'Passwords did not match', expires: 3000 };
    }
  }
  close(){
    this.instance.close(null);
  }
}
angular.module('fakiyaMainApp')
  .component('al.users.changePassword', {
    templateUrl: 'app/features/al/users/changePassword/changePassword.html',
    controller: ChangePasswordComponent,
    require: {
      edit: '?^al.users.edit',
      create: '?^al.users.create'
    }
    
  });

})();

'use strict';
(function(){
  const STRING_EMPTY = '';
class ChangePasswordComponent {
  constructor() {
    this.message = {show: false};
    this.password = STRING_EMPTY;
    this.confirm = STRING_EMPTY;
  }
  $onInit(){
     if(this.create){
        this.instance = this.create.modalInstance;
     }else if(this.edit){
        this.instance = this.edit.modalInstance;
        this.userName = this.edit.userInfo.generalInfo.userName;
     }
  }
  save(){
    if(this.password === this.confirm){
      if(this.userName !== this.password){
        this.instance.close(this.password);
      }
      else{
        this.message = { show: true, type: 'danger', text: 'Password cannot match customer name', expires: 3000 };
      }
    }
    else{
      this.message = { show: true, type: 'danger', text: 'Passwords should match', expires: 3000 };
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

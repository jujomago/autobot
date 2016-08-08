'use strict';

(function(){
class UpdateSkillComponent {
  constructor() {
    this.message = {show: false};
  }

  $onInit(){
    this.instance = this.edit.modalInstance;
    this.skillList = this.edit.skill;
  }

  save(){
    this.instance.close(this.skillList);
  }

  cancel(){
    this.instance.dismiss('cancel');
  }
}
angular.module('fakiyaMainApp')
  .component('al.users.updateSkill', {
    templateUrl: 'app/features/al/users/edit/skillUpdateModal/skillUpdateModal.html',
    controller: UpdateSkillComponent,
    require: {
      edit: '?^al.users.edit',
    }
    
});

})();
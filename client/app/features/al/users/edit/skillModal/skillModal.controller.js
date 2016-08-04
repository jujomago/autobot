'use strict';
(function(){
class AddSkillComponent {
  constructor() {
    this.message = {show: false};
  }

  $onInit(){
    this.instance = this.edit.modalInstance;
    this.skills = this.edit.storage.skills;
    this.level = 1;
    this.skill = (this.skills[0]) ? this.skills[0].name : '';
  }

  save(){
    let skillList = {skillName: '', level: ''};
    skillList.skillName = this.skill;
    skillList.level = this.level;
    this.instance.close(skillList);
  }

  cancel(){
    this.instance.dismiss('cancel');
  }
}
angular.module('fakiyaMainApp')
  .component('al.users.addSkill', {
    templateUrl: 'app/features/al/users/edit/skillModal/skillModal.html',
    controller: AddSkillComponent,
    require: {
      edit: '?^al.users.edit',
    }
    
});

})();
'use strict';
(function(){
class SkillModalComponent {
  constructor() {
    this.message = {show: false};
  }

  $onInit(){
    this.method = this.edit.methodSkills;
    this.instance = this.edit.modalInstance;
    if(this.method === 'create'){
      this.skills = this.edit.storage.skills;
      this.level = 1;
      this.skill = (this.skills[0]) ? this.skills[0].name : '';
    }else{
      this.skill = this.edit.skill.skillName;
      this.level = this.edit.skill.level;
    }
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
  .component('al.users.skillModal', {
    templateUrl: 'app/features/al/users/edit/skillModal/skillModal.html',
    controller: SkillModalComponent,
    require: {
      edit: '?^al.users.edit',
    }
    
});

})();
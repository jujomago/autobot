'use strict';
(function(){

class SkillsComponent {
  constructor($state) {
      console.log('Component SkillsComponent - al.skills');
      $state.go('skills.list');    
  }
}

SkillsComponent.$inject=['$state']; 
angular.module('fakiyaMainApp')

  .component('al.skills', {
    templateUrl: 'app/features/al/skills/skills.html',
    controller: SkillsComponent
  });

})();

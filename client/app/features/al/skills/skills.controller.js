'use strict';
(function(){

class SkillsComponent {
  constructor($state,$sessionStorage) {
      
      console.log('Component SkillsComponent - al.skills');
      
      if(!$sessionStorage.logged){
          $state.go('login');
      } 
  }
}

SkillsComponent.$inject=['$state','$sessionStorage']; 
angular.module('fakiyaMainApp')

  .component('al.skills', {
    templateUrl: 'app/features/al/skills/skills.html',
    controller: SkillsComponent
  });

})();

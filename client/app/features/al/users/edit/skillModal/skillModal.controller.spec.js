'use strict';

describe('Component: skillModalComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var _SkillModalComponent, _ModalManager, skills, skill, level;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController,ModalManager) {
    _ModalManager = ModalManager;
    skills = [
      {name: 'Sales'},
      {name: 'Marketing'}
    ];
    skill = 'Sales';
    level = 1;
    _SkillModalComponent = $componentController('al.users.skillModal', {
      skills: skills,
      skill: skill,
      level: 1
    });
  
  }));

  it('should return null if close modal', function () {
    let modalInstance = _ModalManager.open({
                          controllerAs: '$ctrl',
                          template: '<al.users.skill-modal></al.users.skill-modal>',
                        });
    _SkillModalComponent.instance = modalInstance;
    modalInstance.result
    .then(result => {
        expect(result).to.equal(null);
    });
    _SkillModalComponent.cancel();
  });

  it('should return on save', function () {
    let modalInstance = _ModalManager.open({
                          controllerAs: '$ctrl',
                          template: '<al.users.skill-modal></al.users.skill-modal>',
                        });
  _SkillModalComponent.skillList={skillName:'Test',leve:1};
   _SkillModalComponent.instance = modalInstance;
    modalInstance.result
    .then(result => {
        expect(result).to.equal(_SkillModalComponent.skillList);   
    });
    _SkillModalComponent.save();
  });
});

'use strict';

describe('Component: skillModalComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var _SkillModalComponent, _$uibModal, skills, skill, level;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $uibModal) {
    _$uibModal = $uibModal;
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
    let modalInstance = _$uibModal.open({
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

  it('should return a skill to be added', function () {
    let modalInstance = _$uibModal.open({
                          controllerAs: '$ctrl',
                          template: '<al.users.skill-modal></al.users.skill-modal>',
                        });
    _SkillModalComponent.instance = modalInstance;
    let skillList = {skillName: 'Sales', level: 1};
    modalInstance.result
    .then(result => {
        expect(result).to.eql(skillList);
    });
    _SkillModalComponent.save();
  });

  it('should return a skill to be updated', function () {
    let modalInstance = _$uibModal.open({
                          controllerAs: '$ctrl',
                          template: '<al.users.skill-modal></al.users.skill-modal>',
                        });
    _SkillModalComponent.instance = modalInstance;
    _SkillModalComponent.level = 3;
    let skillList = {skillName: 'Sales', level: 3};
    modalInstance.result
    .then(result => {
        expect(result).to.eql(skillList);
    });
    _SkillModalComponent.save();
  });
});

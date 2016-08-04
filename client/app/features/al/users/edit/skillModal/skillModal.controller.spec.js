'use strict';

describe('Component: addSkillComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var _AddSkillComponent, _$uibModal, skills, skillList;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $uibModal) {
    _$uibModal = $uibModal;
    skills = [
      {name: 'Sales'},
      {name: 'Marketing'}
    ];
    skillList = {level: 1, skillName: 'Sales', userName: 'daniel.c@autoboxcorp.com'};
    _AddSkillComponent = $componentController('al.users.addSkill', {
      skills: skills,
    });
  
  }));

  it('should return null if close modal', function () {
    let modalInstance = _$uibModal.open({
                          controllerAs: '$ctrl',
                          template: '<al.users.addSkill></al.users.addSkill>',
                        });
    _AddSkillComponent.instance = modalInstance;
    modalInstance.result
    .then(result => {
        expect(result).to.equal(null);
    });
    _AddSkillComponent.cancel();
  });

  it('should return a skill to be added', function () {
    let modalInstance = _$uibModal.open({
                          controllerAs: '$ctrl',
                          template: '<al.users.addSkill></al.users.addSkill>',
                        });
    _AddSkillComponent.instance = modalInstance;
    modalInstance.result
    .then(result => {
        expect(result).to.eql(skillList);
    });
    _AddSkillComponent.save();
  });
});

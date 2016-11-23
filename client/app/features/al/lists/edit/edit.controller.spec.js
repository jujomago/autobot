'use strict';

describe('Component:EditList', function () {
  let _$stateParams,
      EditComponent;

  beforeEach(module('fakiyaMainApp'));

  beforeEach(inject(function (
    $componentController,
    _$state_,
    _$stateParams_,
    _lodash_
  ) {

    _$stateParams = _$stateParams_;
    _$stateParams.name = 'List-test';
    _$stateParams.action = 'update';

    EditComponent = $componentController('al.lists.edit', {
      $state: _$state_,
      $stateParams: _$stateParams_,
      lodash: _lodash_
    });
  }));

  describe('#InitComponentEditList', () => {
    it('should set current step Setting when update is selected', () => {
      EditComponent.$onInit();

      expect(EditComponent.isUpdate).to.be.equal(true);
      expect(EditComponent.currentStep).to.deep.equal(EditComponent.STEPS.SETTING);
    });

    it('should set current step Upload when delete is selected', () => {
      EditComponent.isUpdate = false;
      EditComponent.$onInit();
      expect(EditComponent.currentStep).to.deep.equal(EditComponent.STEPS.UPLOAD);
    });
  });

  describe('#ActionsEditList', () => {
    it('should set next step', () => {
      expect(EditComponent.currentStep).to.deep.equal(EditComponent.STEPS.SETTING);
      EditComponent.handleNext();
      expect(EditComponent.currentStep).to.deep.equal(EditComponent.STEPS.MAPPING);
      EditComponent.handleNext();
      expect(EditComponent.currentStep).to.deep.equal(EditComponent.STEPS.UPLOAD);
    });

    it('should set previous step', () => {
      EditComponent.currentStep = EditComponent.STEPS.UPLOAD;
      EditComponent.handlePrevious();
      expect(EditComponent.currentStep).to.deep.equal(EditComponent.STEPS.MAPPING);
      EditComponent.handlePrevious();
      expect(EditComponent.currentStep).to.deep.equal(EditComponent.STEPS.SETTING);
    });

    it('should be true if is a first Step', () => {
      EditComponent.$onInit();
      expect(EditComponent.isFirstStep()).to.be.equal(true);
      EditComponent.handleNext();
      expect(EditComponent.isFirstStep()).to.be.equal(false);
    });

    it('should return current step key', () => {
      EditComponent.$onInit();
      EditComponent.handleNext();
      expect(EditComponent.getCurrentStep()).to.equal(EditComponent.STEPS.MAPPING.key);
    });
  });
});

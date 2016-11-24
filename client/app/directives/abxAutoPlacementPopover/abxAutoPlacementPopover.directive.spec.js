'use strict';

describe('Directive: abxAutoPlacementPopover', function () {

  // load the directive's module
  beforeEach(module('fakiyaMainApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<abx-auto-placement-popover></abx-auto-placement-popover>');
    element = $compile(element)(scope);
    expect(element.text()).to.equal('this is the abxAutoPlacementPopover directive');
  }));
});

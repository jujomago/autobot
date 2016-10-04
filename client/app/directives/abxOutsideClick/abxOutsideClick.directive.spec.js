'use strict';

describe('Directive:abxOutSideClick', function () {

  // load the directive's module
  beforeEach(module('fakiyaMainApp'));

  let element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should set model value to 1 if i click outside the element', inject(function ($compile) {
    scope.model=0;
    element = angular.element('<input type="text" abx-outside-click="model=1">');
    element = $compile(element)(scope);
    $(document).click();
    scope.$digest();
    scope.$apply();
    expect(scope.model).to.be.equal(1);
  }));
    it('should mantain model value in 0 if i click inside the element', inject(function ($compile) {
    scope.model=0;
    element = angular.element('<input id="test-input"  type="text" abx-outside-click="model=1">');
    element = $compile(element)(scope);
    element.click();
    scope.$digest();
    scope.$apply();
    expect(scope.model).to.be.equal(0);
  }));
});

'use strict';

describe('Directive: abxAutoFocus', function () {

  // load the directive's module
  beforeEach(module('fakiyaMainApp'));

  let element,
    scope;
  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should return focused element name', inject(function ($compile) {
    element = angular.element('<input name="focus">');
    element.appendTo(document.body);
    element.attr("abx-auto-focus", "true");
    element = $compile(element)(scope);
    scope.$apply();
    expect(window.document.activeElement.name).to.be.equal('focus');
    element.remove();
  }));
  it('should return undefined in active element element name', inject(function ($compile) {
    element = angular.element('<input name="focus" abx-auto-focus="false">');
    element = $compile(element)(scope);
    scope.$apply();
    expect(window.document.activeElement.name).to.be.equal(undefined);
  }));
});

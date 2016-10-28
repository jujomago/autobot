'use strict';

describe('Directive: abxMultiSelectInput', function () {

  // load the directive's module and view
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('app/directives/abxMultiSelectInput/abxMultiSelectInput.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<abx-multi-select-input></abx-multi-select-input>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the abxMultiSelectInput directive');
  }));
});

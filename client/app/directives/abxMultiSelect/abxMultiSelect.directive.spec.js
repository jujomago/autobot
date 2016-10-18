'use strict';

describe('Directive: abxMultiSelect', function () {

  // load the directive's module and view
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('app/directives/abxMultiSelect/abxMultiSelect.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<abx-multi-select></abx-multi-select>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the abxMultiSelect directive');
  }));
});

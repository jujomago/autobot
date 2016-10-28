'use strict';

describe('Directive: abxDatetimePickerInput', function () {

  // load the directive's module and view
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('app/directives/abxDatetimePickerInput/abxDatetimePickerInput.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<abx-datetime-picker-input></abx-datetime-picker-input>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the abxDatetimePickerInput directive');
  }));
});

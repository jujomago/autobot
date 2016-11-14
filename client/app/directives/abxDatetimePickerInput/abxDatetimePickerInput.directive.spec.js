'use strict';

describe('Directive: abxDatetimePickerInput', function () {

  // load the directive's module and view
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('app/directives/abxDatetimePickerInput/abxDatetimePickerInput.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should open date picker', inject(function ($compile) {
    element = angular.element('<abx-datetime-picker-input ng-model="model"></abx-datetime-picker-input>');
    element = $compile(element)(scope);
    scope.$apply();
    element.isolateScope().openDatePicker();
    expect(element.isolateScope().opened).to.equal(true);
  }));
});

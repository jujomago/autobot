'use strict';

describe('Directive:abxDatePickerInput', function () {

  // load the directive's module and view
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('app/directives/abxDatePickerInput/abxDatePickerInput.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should open date picker', inject(function ($compile) {
    element = angular.element('<abx-date-picker-input ng-model="model"></abx-date-picker-input>');
    element = $compile(element)(scope);
    scope.$apply();
    element.isolateScope().openDatePicker();
    expect(element.isolateScope().opened).to.equal(true);
  }));
});

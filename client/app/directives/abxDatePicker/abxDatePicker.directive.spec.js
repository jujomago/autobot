'use strict';

describe('Directive: abxDatePicker', function () {

  // load the directive's module and view
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('app/directives/abxDatePicker/abxDatePicker.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<abx-date-picker></abx-date-picker>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the abxDatePicker directive');
  }));
});

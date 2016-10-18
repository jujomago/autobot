'use strict';

describe('Directive: abxTimePicker', function () {

  // load the directive's module and view
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('app/directives/abxTimePicker/abxTimePicker.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<abx-time-picker></abx-time-picker>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the abxTimePicker directive');
  }));
});

'use strict';

describe('Directive: abxDatetimePicker', function () {

  // load the directive's module and view
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('app/directives/abxDatetimePicker/abxDatetimePicker.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<abx-datetime-picker></abx-datetime-picker>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).to.equal('this is the abxDatetimePicker directive');
  }));
});

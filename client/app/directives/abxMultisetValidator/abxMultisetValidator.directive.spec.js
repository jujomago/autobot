'use strict';

describe('Directive: MultisetValidator', function () {

  // load the directive's module
  beforeEach(module('fakiyaMainApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should show invalid model because is required', inject(function ($compile) {
    scope.restrictions = [{type: 'Required', value: ''}];
    scope.model = '';
    element = angular.element(
      '<form name="form">' +
      '<input ng-model="model" name="model" abx-multiset-validator="restrictions" />' +
      '</form>');
    element = $compile(element)(scope);
    scope.$apply();
    scope.model = [];
    scope.$digest();
    expect(scope.form.model.$valid).to.be.equal(false);
  }));
  it('should show valid model', inject(function ($compile) {
    scope.restrictions = [{type: 'Required', value: ''}];
    scope.model = '';
    element = angular.element(
      '<form name="form">' +
      '<input ng-model="model" name="model" abx-multiset-validator="restrictions" />' +
      '</form>');
    element = $compile(element)(scope);
    scope.$apply();
    scope.model = [{value: 'some value'}];
    scope.$digest();
    expect(scope.form.model.$valid).to.be.equal(true);
  }));
});

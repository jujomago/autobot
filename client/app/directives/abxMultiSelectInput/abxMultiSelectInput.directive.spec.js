'use strict';

describe('Directive: abxMultiSelectInput', function () {

  // load the directive's module and view
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('app/directives/abxMultiSelectInput/abxMultiSelectInput.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should model be an empty array', inject(function ($compile) {
    element = angular.element('<abx-multi-select-input ng-model="model"></abx-multi-select-input>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(scope.model).to.eql([]);
  }));
  it('should model contains an array of selected items', inject(function ($compile) {
    scope.options = [{value: 'a'}, {value: 'b'}, {value: 'c'}, {value: 'd'}];
    element = angular.element('<abx-multi-select-input ng-model="model" id="value" value="value" options="options"></abx-multi-select-input>');
    element = $compile(element)(scope);
    scope.$apply();
    element.isolateScope().toggleSelectItem(scope.options[3]);
    element.isolateScope().toggleSelectItem(scope.options[1]);
    expect(scope.model[0].value).to.equal('d');
    expect(scope.model[1].value).to.equal('b');
    element.isolateScope().toggleSelectItem(scope.options[3]);
    expect(scope.model[0].value).to.equal('b');
  }));
});

/*'use strict';

describe('Directive: abxNoSpecialCharacter', function () {

  beforeEach(module('fakiyaMainApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should allow numbers and letters', inject(function ($compile) {
    scope.testInput='';
    element = angular.element('<input type="text" abx-no-special-character="/^[a-zA-Z0-9\s]*$/" ng-model="testInput">');
    element = $compile(element)(scope);
    scope.$apply();
    element.isolateScope().ngModel='123456789abcadfew';
    scope.$digest();
    expect(element.isolateScope().ngModel).to.equal('123456789abcadfew');
  }));
  it('should not allow simbols or signs', inject(function ($compile) {
    scope.testInput='';
    element = angular.element('<input type="text" abx-no-special-character="/^[a-zA-Z0-9\s]*$/" ng-model="testInput">');
    element = $compile(element)(scope);
    scope.$apply();
    element.isolateScope().ngModel='-+
    scope.$digest();
    expect(element.isolateScope().ngModel).to.not.equal('');
  }));
  it('should allow uppercase letters', inject(function ($compile) {
    scope.testInput='';
    element = angular.element('<input type="text" abx-no-special-character="/^[a-zA-Z0-9\s]*$/" ng-model="testInput">');
    element = $compile(element)(scope);
    scope.$apply();
    element.isolateScope().ngModel='ABCDEFGHIJK';
    scope.$digest();
    expect(element.isolateScope().ngModel).to.equal('ABCDEFGHIJK');
  }));

});*/

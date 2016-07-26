'use strict';

describe('Directive: abxNumberUpdown', function () {

  // load the directive's module and view
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('app/directives/abxNumberUpdown/abxNumberUpdown.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));
  //default value: 0; default min-value: 0; default max-value: not defined
  describe('#scope',function(){
    it('should use bi directional ng-model', inject(function ($compile) {
      scope.model=0;
      element = angular.element('<abx-number-updown ng-model="model"></abx-number-updown>');
      element = $compile(element)(scope);
      scope.$apply();
      expect(element.isolateScope().ngModel).to.equal(0);
    }));
    it('should apply min value if a number was asigned', inject(function ($compile) {
      element.isolateScope().ngModel=5;
      element = angular.element('<abx-number-updown min-value=5></abx-number-updown>');
      element = $compile(element)(scope);
      scope.$apply();
      scope.$digest();
      element.isolateScope().ngModel=4;
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal(5);
    }));
    it('should apply min value if a number was not asigned to model', inject(function ($compile) {
      element = angular.element('<abx-number-updown min-value=2></abx-number-updown>');
      element = $compile(element)(scope);
      scope.$apply();
      scope.$digest();
      element.isolateScope().ngModel=1;
      scope.$digest();
      //the number asigned must be equal to min-value
      expect(element.isolateScope().ngModel).to.equal(2);
    }));
    it('should apply max value if a number was asigned', inject(function ($compile) {
      element = angular.element('<abx-number-updown max-value=5></abx-number-updown>');
      element = $compile(element)(scope);
      scope.$apply();
      element.isolateScope().ngModel=5;
      scope.$digest();
      element.isolateScope().ngModel=6;
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal(5);
    }));
    it('should apply max value if a number was not asigned to model', inject(function ($compile) {
      element = angular.element('<abx-number-updown max-value=2></abx-number-updown>');
      element = $compile(element)(scope);
      scope.$apply();
      scope.$digest();
      element.isolateScope().ngModel=3;
      scope.$digest();
      //the number asigned must be equal to default value
      expect(element.isolateScope().ngModel).to.equal(0);
    }));
    it('default min value should be zero', inject(function ($compile) {
      element = angular.element('<abx-number-updown></abx-number-updown>');
      element = $compile(element)(scope);
      scope.$apply();
      scope.$digest();
      element.isolateScope().ngModel=-1;
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal(0);
    }));
    it('input should not accept text, only numbers', inject(function ($compile) {
      element = angular.element('<abx-number-updown></abx-number-updown>');
      element = $compile(element)(scope);
      scope.$apply();
      scope.$digest();
      element.isolateScope().ngModel='some text that we can paste to the input';
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal(0);
    }));
    it('input should not accept text, only numbers, if we have a number in model', inject(function ($compile) {
      element = angular.element('<abx-number-updown></abx-number-updown>');
      element = $compile(element)(scope);
      scope.$apply();
      element.isolateScope().ngModel=4;
      scope.$digest();
      element.isolateScope().ngModel='some text that we can paste to the input';
      scope.$digest();
      //should take the current value
      expect(element.isolateScope().ngModel).to.equal(4);
    }));
    it('should increase the value in one', inject(function ($compile) {
      element = angular.element('<abx-number-updown></abx-number-updown>');
      element = $compile(element)(scope);
      scope.$apply();
      element.isolateScope().ngModel=4;
      scope.$digest();
      element.isolateScope().incrementValue();
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal(5);
    }));
    it('should increase the value in one if the number plus one not exceds the max limit', inject(function ($compile) {
      element = angular.element('<abx-number-updown max-value=10></abx-number-updown>');
      element = $compile(element)(scope);
      scope.$apply();
      element.isolateScope().ngModel=9;
      scope.$digest();
      element.isolateScope().incrementValue();
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal(10);
    }));
    it('should not increase the value if the number plus one exceds the max limit', inject(function ($compile) {
      element = angular.element('<abx-number-updown max-value=10></abx-number-updown>');
      element = $compile(element)(scope);
      scope.$apply();
      element.isolateScope().ngModel=10;
      scope.$digest();
      element.isolateScope().incrementValue();
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal(10);
    }));
    it('should decrease the value in one', inject(function ($compile) {
      element = angular.element('<abx-number-updown></abx-number-updown>');
      element = $compile(element)(scope);
      scope.$apply();
      element.isolateScope().ngModel=10;
      scope.$digest();
      element.isolateScope().decrementValue();
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal(9);
    }));
    it('should decrease the value in one if the number subtracted one is greater or equal than min limit', inject(function ($compile) {
      element = angular.element('<abx-number-updown min-value=10></abx-number-updown>');
      element = $compile(element)(scope);
      scope.$apply();
      element.isolateScope().ngModel=11;
      scope.$digest();
      element.isolateScope().decrementValue();
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal(10);
    }));
    it('should not decrease the value if the number subtracted one is less than min limit', inject(function ($compile) {
      element = angular.element('<abx-number-updown min-value=10></abx-number-updown>');
      element = $compile(element)(scope);
      scope.$apply();
      element.isolateScope().ngModel=10;
      scope.$digest();
      element.isolateScope().decrementValue();
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal(10);
    }));

    it('should decrease the value if max number is changed to less value', inject(function ($compile) {
      element = angular.element('<abx-number-updown max-value=10></abx-number-updown>');
      element = $compile(element)(scope);
      scope.$apply();
      element.isolateScope().ngModel=10;
      scope.$digest();
      element.isolateScope().maxValue=7;
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal(7);
    }));
  });

});

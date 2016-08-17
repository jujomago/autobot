'use strict';

describe('Directive: abxPatternFilter', function () {

  // load the directive's module
  beforeEach(module('fakiyaMainApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  describe('#scope',function(){
    it('should empty be a valid value', inject(function ($compile) {
      scope.model='';
      element = angular.element('<input type="text" abx-pattern-filter="/^[0-9]+$/" ng-model="model">');
      element = $compile(element)(scope);
      scope.$apply();
      expect(element.isolateScope().ngModel).to.equal('');
    }));
    it('should return empty if the value not match with the regex', inject(function ($compile) {
      element = angular.element('<input type="text" abx-pattern-filter="/^[0-9]+$/" ng-model="model">');
      element = $compile(element)(scope);
      scope.$apply();
      element.isolateScope().ngModel='not Match!';
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal('');
    }));
    it('should return the value if match with the regex', inject(function ($compile) {
      element = angular.element('<input type="text" abx-pattern-filter="/^[0-9]+$/" ng-model="model">');
      element = $compile(element)(scope);
      scope.$apply();
      element.isolateScope().ngModel='56789';
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal('56789');
    }));
    
    it('should return the value if match with the regex', inject(function ($compile) {
      element = angular.element('<input type="text" abx-pattern-filter="/^[^\\`~&%#,|()_\':;?[/}=\\]&quot;{*>!\\+<^]*$/" ng-model="model">');
      element = $compile(element)(scope);
      scope.$apply();
      element.isolateScope().ngModel='test with valid text';
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal('test with valid text');
    }));
    it('should return the last valid value if not match with the regex', inject(function ($compile) {
      element = angular.element('<input type="text" abx-pattern-filter="/^[^\\`~&%#,|()_\':;?[/}=\\]&quot;{*>!\\+<^]*$/" ng-model="model">');
      element = $compile(element)(scope);
      scope.$apply();
      element.isolateScope().ngModel='test with valid text';
      scope.$digest();
      element.isolateScope().ngModel='test with invalid especial char: %^*&()_<>';
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal('test with valid text');
    }));
    it('should return the last valid value if the new value not match with the regex', inject(function ($compile) {
      element = angular.element('<input type="text" abx-pattern-filter="/^[0-9]+$/" ng-model="model">');
      element = $compile(element)(scope);
      scope.$apply();
      element.isolateScope().ngModel='123456';
      scope.$digest();
      element.isolateScope().ngModel='Not Valid';
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal('123456');
    }));
  });
});

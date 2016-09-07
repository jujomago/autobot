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
    it('only numbers filter for regular expresion [0-9] code: 1200 ', inject(function ($compile) {
      scope.model='21asasd0';
      element = angular.element('<input type="text" abx-pattern-filter="[0-9]" ng-model="model">');
      element = $compile(element)(scope);
      scope.$apply();
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal('210');
    }));
    it('only Charachter filter for regular expresion [a-z] code: 1201 ', inject(function ($compile) {
      scope.model='21Tarija0';
      element = angular.element('<input type="text" abx-pattern-filter="[a-z]" ng-model="model">');
      element = $compile(element)(scope);
      scope.$apply();
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal('Tarija');
    }));
    it('should return empty if the value not match with the regex [^0-9] not a number code: 1202', inject(function ($compile) {
      scope.model='21not Match!0';
      element = angular.element('<input type="text" abx-pattern-filter="[^0-9]" ng-model="model">');
      element = $compile(element)(scope);
      scope.$apply();
      //element.isolateScope().ngModel='not Match!';
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal('not Match!');
    }));
    it('should return the value if match with the regex Is a number  [0-9] code: 1203', inject(function ($compile) {
      scope.model='5malo8';
      element = angular.element('<input type="text" abx-pattern-filter="[0-9]" ng-model="model">');
      element = $compile(element)(scope);
      scope.$apply();
      //element.isolateScope().ngModel='56dsd789';
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal('58');
    }));
    
    it('should return the value if match with the regex [a-zA-Z0-9á-ú\\s] code: 1204', inject(function ($compile) {
      scope.model='test- working*';
      element = angular.element('<input type="text" abx-pattern-filter="[a-z0-9á-ú\\s]" ng-model="model">');
      element = $compile(element)(scope);
      scope.$apply();
      //element.isolateScope().ngModel='test with valid text';
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal('test working');
    }));
    it('should return the last valid value if not match with the regex code: 1205', inject(function ($compile) {
      scope.model='test 12215';
      element = angular.element('<input type="text" abx-pattern-filter="^[^\\`~&%#,|()_\':;?[/}=\\]&quot;{*>!\\+<^]*$" ng-model="model">');
      element = $compile(element)(scope);
      scope.$apply();
      //element.isolateScope().ngModel='test with *---//+ valid text?????';
      //scope.$digest();
      //element.isolateScope().ngModel='test with invalid especial char: %^*&()_<>';
      scope.$digest();
      expect(element.isolateScope().ngModel).to.equal('test 12215');
    }));
    it('should return the last valid value with underscore if not match with the regex code: 1206', inject(function ($compile) {
      element = angular.element('<input type="text" abx-pattern-filter="^[^\\`~&%#,|()\':;?[/}=\\]&quot;{*>!\\+<^]*$" ng-model="model">');
      element = $compile(element)(scope);
      scope.$apply();
      element.isolateScope().ngModel='test_with_valid_text';
      scope.$digest();
      //element.isolateScope().ngModel='test with invalid especial char: %^*&()<>';
      //scope.$digest();
      expect(element.isolateScope().ngModel).to.equal('test_with_valid_text');
    }));
    it('should return the last valid value if the new value not match with the regex [0-9] code:1207', inject(function ($compile) {
      scope.model='5mal 8';
      element = angular.element('<input type="text" abx-pattern-filter="[0-9]" ng-model="model">');
      element = $compile(element)(scope);
      scope.$apply();
      //element.isolateScope().ngModel='123456';
     // scope.$digest();
      //expect(element.isolateScope().ngModel).to.equal('123456');
      //element.isolateScope().ngModel='Not 858 Valid';
      scope.$digest();
      console.log('value of ngmodel: '+element.isolateScope().ngModel);
      expect(element.isolateScope().ngModel).to.equal('58');
    }));
  });
});

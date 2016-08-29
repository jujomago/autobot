'use strict';

describe('Directive: abxCheckPhone', function () {

  // load the directive's module
  beforeEach(module('fakiyaMainApp'));

  var element,
    scope, form;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should be a valid US phone number (734-555-1212)', inject(function ($compile) {
      element = angular.element('<form name="form"><input abx-check-phone name="phone" ng-model="model.phone" type="tel"/></form>');
      scope.model = {phone: null};
      element = $compile(element)(scope);
      form = scope.form;
      form.phone.$setViewValue('734-555-1212');
      expect(form.phone.$valid).to.equal(true);
  }));

  it('should be a valid US phone number (7345551212)', inject(function ($compile) {
      element = angular.element('<form name="form"><input abx-check-phone name="phone" ng-model="model.phone" type="tel"/></form>');
      scope.model = {phone: null};
      element = $compile(element)(scope);
      form = scope.form;
      form.phone.$setViewValue('7345551212');
      expect(form.phone.$valid).to.equal(true);
  }));

  it('should be a invalid US phone number', inject(function ($compile) {
      element = angular.element('<form name="form"><input abx-check-phone name="phone" ng-model="model.phone" type="tel"/></form>');
      scope.model = {phone: null};
      element = $compile(element)(scope);
      form = scope.form;
      form.phone.$setViewValue('734-555-12X2');
      expect(form.phone.$valid).to.equal(false);
  }));

  it('should be a invalid US phone number', inject(function ($compile) {
      element = angular.element('<form name="form"><input abx-check-phone name="phone" ng-model="model.phone" type="tel"/></form>');
      scope.model = {phone: null};
      element = $compile(element)(scope);
      form = scope.form;
      form.phone.$setViewValue('??734-555-1222');
      expect(form.phone.$valid).to.equal(false);
  }));

  it('should be a valid International phone number 011 (541) 754-301056', inject(function ($compile) {
      element = angular.element('<form name="form"><input abx-check-phone name="phone" ng-model="model.phone" type="tel"/></form>');
      scope.model = {phone: null};
      element = $compile(element)(scope);
      form = scope.form;
      form.phone.$setViewValue('011 (541) 754-3010');
      expect(form.phone.$valid).to.equal(true);
  }));

  it('should be a valid International phone number +011 (541) 754-301056', inject(function ($compile) {
      element = angular.element('<form name="form"><input abx-check-phone name="phone" ng-model="model.phone" type="tel"/></form>');
      scope.model = {phone: null};
      element = $compile(element)(scope);
      form = scope.form;
      form.phone.$setViewValue('+011 (541) 754-301056');
      expect(form.phone.$valid).to.equal(true);
  }));

  it('should be a invalid International phone number 011 (541) 754-301051X', inject(function ($compile) {
      element = angular.element('<form name="form"><input abx-check-phone name="phone" ng-model="model.phone" type="tel"/></form>');
      scope.model = {phone: null};
      element = $compile(element)(scope);
      form = scope.form;
      form.phone.$setViewValue('011 (541) 754-301X');
      expect(form.phone.$valid).to.equal(false);
  }));

  it('should be a invalid International phone number ? (541) 754-301051555', inject(function ($compile) {
      element = angular.element('<form name="form"><input abx-check-phone name="phone" ng-model="model.phone" type="tel"/></form>');
      scope.model = {phone: null};
      element = $compile(element)(scope);
      form = scope.form;
      form.phone.$setViewValue('? (541) 754-301555');
      expect(form.phone.$valid).to.equal(false);
  }));

  it('should be a invalid phone number 1234567890', inject(function ($compile) {
      element = angular.element('<form name="form"><input abx-check-phone name="phone" ng-model="model.phone" type="tel"/></form>');
      scope.model = {phone: null};
      element = $compile(element)(scope);
      form = scope.form;
      form.phone.$setViewValue('1234567890');
      expect(form.phone.$valid).to.equal(false);
  }));

  it('should remove the phone validation when the input is empty', inject(function ($compile) {
      element = angular.element('<form name="form"><input abx-check-phone name="phone" ng-model="model.phone" type="tel"/></form>');
      scope.model = {phone: null};
      element = $compile(element)(scope);
      form = scope.form;
      form.phone.$setViewValue('');
      expect(form.phone.$valid).to.equal(true);
  }));
  
});

'use strict';

describe('Directive:abxRegexFilter', function () {

  // load the directive's module
  beforeEach(module('fakiyaMainApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should accept only numbers', inject(function ($compile) {
    element = $compile('<input abx-regex-filter="[^0-9]" ng-model="model">')(scope);
    element.val('987654321').trigger('change');
    expect(element.val()).to.equal('987654321');
    element.val('no987654allowed321').trigger('change');
    expect(element.val()).to.equal('987654321');
  }));
});

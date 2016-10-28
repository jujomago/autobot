'use strict';

describe('Directive: abxRegexFilter', function () {

  // load the directive's module
  beforeEach(module('fakiyaMainApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<abx-regex-filter></abx-regex-filter>');
    element = $compile(element)(scope);
    expect(element.text()).to.equal('this is the abxRegexFilter directive');
  }));
});

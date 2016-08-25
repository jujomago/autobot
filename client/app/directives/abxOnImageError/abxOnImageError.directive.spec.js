'use strict';

describe('Directive:abxOnImageError', function () {

  // load the directive's module
  beforeEach(module('fakiyaMainApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should change noError to false', inject(function ($compile) {
    scope.noError = true;
    element = angular.element('<input type="file" abx-on-image-error="noError">');
    element = $compile(element)(scope);
    element.trigger('error');
    expect(scope.noError).to.equal(false);
  }));
});

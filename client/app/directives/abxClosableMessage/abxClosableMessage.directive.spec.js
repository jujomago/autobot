'use strict';

describe('Directive:abxClosableMessage', function () {

  // load the directive's module and view
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('app/directives/abxClosableMessage/abxClosableMessage.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should close message', inject(function ($compile) {
    element = angular.element('<abx-closable-message message="{show: true}"></abx-closable-message>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.isolateScope().message.show).to.equal(true);
    element.isolateScope().close();
    expect(element.isolateScope().message.show).to.equal(false);
  }));
});

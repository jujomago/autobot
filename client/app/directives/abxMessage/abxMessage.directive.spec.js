'use strict';

describe('Directive: abxMessage', function () {

  // load the directive's module and view
  beforeEach(module('fakiyaMainApp'));
  beforeEach(module('app/directives/abxMessage/abxMessage.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<abx-message></abx-message>');
    element = $compile(element)(scope);
    scope.$apply();

//    expect(element.text()).to.equal('this is the abxMessage directive');

  }));
});

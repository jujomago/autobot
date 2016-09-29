'use strict';

describe('Directive: abxNoSpecialCharacter', function () {

  // load the directive's module
//  beforeEach(module('fakiyaMainApp.abxNoSpecialCharacter'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

/*  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<abx-no-special-character></abx-no-special-character>');
    element = $compile(element)(scope);
    expect(element.text()).to.equal('this is the abxNoSpecialCharacter directive');
  }));*/
});

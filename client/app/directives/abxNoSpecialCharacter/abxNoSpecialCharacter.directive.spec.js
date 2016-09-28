'use strict';

describe.only('Directive: abxNoSpecialCharacter', function () {

  // load the directive's module
  beforeEach(module('fakiyaMainApp'));

  let element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should restrict special chars on input', inject(function ($compile) {
    element = angular.element('<input class="search" abx-no-special-character="/^[a-zA-Z0-9\s]*$/" value="probando +- ando">');
    element = $compile(element)(scope);
    console.log('===== element val =====')
    console.log(element.val());
    //expect(element.text()).to.equal('this is the abxNoSpecialCharacter directive');
  }));
});

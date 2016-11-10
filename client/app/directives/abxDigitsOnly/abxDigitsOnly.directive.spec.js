'use strict';

describe('Directive: abxDigitsOnly', function () {

  // load the directive's module
  beforeEach(module('fakiyaMainApp'));
  var scope, input;

  beforeEach(inject(function ($compile,$rootScope) {
    scope = $rootScope.$new();
    input = $compile('<input ng-model="mymodel" type="text" ng-trim="false" abx-digits-only />')(scope);
  }));

  it('Only Digits admitted',function () {
    input.val('adfads').trigger('change');
    expect(input.val()).to.equal('');
    expect(input.val()).to.have.lengthOf(0);

    input.val('  ').trigger('change');     
    expect(input.val()).to.equal('');
    expect(input.val()).to.have.lengthOf(0);
    
    input.val('0056').trigger('change');
    expect(input.val()).to.equal('0056');
    expect(input.val()).to.have.lengthOf(4);

    input.val('23ff').trigger('change');
    expect(input.val()).to.equal('23');
    expect(input.val()).to.have.lengthOf(2);

    input.val('a88e').trigger('change');
    expect(input.val()).to.equal('88');
    expect(input.val()).to.have.lengthOf(2);

  });
});

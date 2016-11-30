'use strict';

describe('Directive:abxAutoPlacementPopover', function () {

  // load the directive's module
  beforeEach(module('fakiyaMainApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should placement be left top', inject(function ($compile) {
    element = angular.element('<div style="position: fixed; top:0;" abx-auto-placement-popover></div>');
    let body = angular.element(document).find('body');
    body.append(element);
    element = $compile(element)(scope);
    expect(element.attr('popover-placement')).to.equal('left-top');
  }));
  it('should placement be left bottom', inject(function ($compile) {
    element = angular.element('<div style="position: fixed; top:100px;" abx-auto-placement-popover></div>');
    let body = angular.element(document).find('body');
    body.append(element);
    element = $compile(element)(scope);
    expect(element.attr('popover-placement')).to.equal('left-bottom');
  }));
});

'use strict';

describe('Directive:abxDefaultImageSwitch', function () {

  // load the directive's module
  beforeEach(module('fakiyaMainApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<img abx-default-image-switch="data:image/gif;base64,R0lGODlhAQABAIAA" ng-src="">');
    element = $compile(element)(scope);
    element.trigger('error');
    expect(element.attr('src')).to.equal('data:image/gif;base64,R0lGODlhAQABAIAA');
  }));
});

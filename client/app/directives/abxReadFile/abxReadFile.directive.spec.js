'use strict';

describe('Directive: abxReadFile', function () {

  // load the directive's module
  beforeEach(module('fakiyaMainApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<input type="file" abx-read-file="csvModel">');
    element = $compile(element)(scope);
    element.trigger('change',{target:{files: [{name: 'a'}]}});
    //expect(scope.csvModel.data).to.equal('file content');
    //expect(scope.csvModel.size).to.equal('file size');
    //expect(scope.csvModel.type).to.equal('file type');
  }));
});

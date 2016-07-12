'use strict';

describe('Filter: removeUnderscore', function () {

  // load the filter's module
  beforeEach(module('fakiyaMainApp'));

  // initialize a new instance of the filter before each test
  var removeUnderscore;
  beforeEach(inject(function ($filter) {
    removeUnderscore = $filter('removeUnderscore');
  }));

  it('should return the input with underscores replaced by blank space', function () {
    var text = 'NOT_STARTING';
    expect(removeUnderscore(text)).to.equal('NOT STARTING');
  });

});

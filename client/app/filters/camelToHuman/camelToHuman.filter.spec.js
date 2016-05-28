'use strict';

describe('Filter: camelToHuman', function () {

  // load the filter's module
  beforeEach(module('fakiyaMainApp'));

  // initialize a new instance of the filter before each test
  var camelToHuman;
  beforeEach(inject(function ($filter) {
    camelToHuman = $filter('camelToHuman');
  }));

  it('should return the input in Human Readable Format "', function () {
    var text = 'thisShouldBeInHumanFormat';
    expect(camelToHuman(text)).to.equal('this Should Be In Human Format');
    
    text = 'anotherTextThatCouldBeLong';
    expect(camelToHuman(text)).to.equal('another Text That Could Be Long');
  });

});

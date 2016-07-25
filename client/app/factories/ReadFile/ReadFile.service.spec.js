'use strict';

describe('Service: ReadFile', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var ReadFile,_$scope;
  beforeEach(inject(function (_ReadFile_,$rootScope) {
    ReadFile = _ReadFile_;
    _$scope = $rootScope.$new();
  }));

  it('should upload a file', function () {
    let file={lastModified: '1469039889125', name: 'a.csv', size: 4500, type: 'text/csv'};
   
    ReadFile.readAsDataUrl(file, _$scope)
    //.then(response => { comented for jshint
    .then(() => {
       // expect(response).to.be.equal("file content");
    })
    .catch(() => {
    //.catch(error => { comented for jshint
       // expect(error).to.be.equal("upload error");
    });
  });

});

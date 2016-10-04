'use strict';

describe('Service: HandleError', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var HandleError;
  beforeEach(inject(function (_HandleError_) {
    HandleError = _HandleError_;
  }));

  it('should respond error message in catch', function () {
    new HandleError({data: {error: 'some error'}, status: 500}, {errorMessage: null, statusCode: 0})
    .catch(error =>{
      expect(error.errorMessage).to.equal('some error');
      expect(error.statusCode).to.equal(500);
    });
  });

  it('should respond error message when there is an error server', function () {
    new HandleError({data: {error: 'Unable to connect to the server. Please try again'}, status: -1}, {errorMessage: null, statusCode: 0})
    .catch(error =>{
      expect(error.errorMessage).to.equal('Unable to connect to the server. Please try again');
      expect(error.status).to.equal(-1);
    });
  });

});

'use strict';

describe('Service: ErrorHandlerInterceptor', function () {

	// load the service's module
	beforeEach(module('fakiyaMainApp'));

	// instantiate service
	var ErrorHandlerInterceptor;
	beforeEach(inject(function (_ErrorHandlerInterceptor_) {
		ErrorHandlerInterceptor = _ErrorHandlerInterceptor_;
	}));

	it('should do something', function () {
		expect(!!ErrorHandlerInterceptor).to.equal(true);
	});

});
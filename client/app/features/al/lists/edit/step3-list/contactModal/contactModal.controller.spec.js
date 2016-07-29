'use strict';

describe('Controller: ContactModalCtrl', function () {

	// load the controller's module
	beforeEach(module('fakiyaMainApp'));

  	let modalInstance = { close: function() {}, dismiss: function() {} };
	let fields = [];
	let ctrl;
	let contactModal = {number1: 9874563217};

	beforeEach(inject(function($controller) {
	  ctrl = $controller('ContactModalCtrl', {
	      $uibModalInstance: modalInstance, 
	      fields: fields,
	      contactModal: contactModal,
	  });
	}));

	it('#getValidation should return a form valid inputs', function () {
		let validation;
		let fields = [
		{
			displayAs: 'Short',
			isKey: true, 
			mapTo: 'None', 
			mappedIndex: 0, 
			mappedName: 'number1', 
			name: 'number1', 
			system: true,
			type: 'PHONE'
		},
		{
			displayAs: 'Short',
			isKey: false, 
			mapTo: 'None', 
			mappedIndex: 0, 
			mappedName: 'first_name', 
			name: 'first_name', 
			system: true,
			type: 'STRING'
		},
		{
			displayAs: 'Short',
			isKey: false, 
			mapTo: 'None', 
			mappedIndex: 0, 
			mappedName: 'email', 
			name: 'email', 
			system: true,
			type: 'EMAIL'
		}
		];
		validation = ctrl.getValidation(fields);
		expect(validation).to.deep.equal(
			[
				{'name': 'number1', 'type': 'tel', 'required': true, 'min-length': 10, 'max-lentgh': 20},
				{'name': 'first_name', 'type': 'text', 'required': false, 'min-length': 5, 'max-lentgh': 50},
				{'name': 'email', 'type': 'email', 'required': false, 'min-length': 5, 'max-lentgh': 50},
			]
		);
	});
});
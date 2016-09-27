'use strict';

describe('Component:contactModalComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var _ContactModalComponent, _$uibModal, manual, fields, method, contactModal, numbers, dates;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $uibModal) {
    _$uibModal = $uibModal;
    manual = true;
    fields = [
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
    method = 'create';
    contactModal = {
      'number1': '2025550180',
      'number2': '2025550181'
    };
    numbers = [];
    dates = [];
    _ContactModalComponent = $componentController('al.lists.contactModal', {
      fields: fields,
      manual: manual,
      method: method,
      contactModal: contactModal,
      contact: contactModal,
      numbers: numbers,
      dates: dates
    });

  }));

  it('#getValidation should return a form valid inputs (Manual)', function () {
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
    },
    {
      displayAs: 'Short',
      isKey: false,
      mapTo: 'None',
      mappedIndex: 0,
      mappedName: 'Balance',
      name: 'Balance',
      system: true,
      type: 'CURRENCY'
    }
    ];
    validation = _ContactModalComponent.getValidation(fields);
    _ContactModalComponent.method = 'create';
    expect(validation).to.eql(
      [
        {name: 'number1', type: 'tel'},
        {name: 'first_name', type: 'text', maxlength: 250},
        {name: 'email', type: 'email', maxlength: 250},
        {name: 'Balance', type: 'number', maxlength: 250}
      ]
    );
    expect(_ContactModalComponent.phoneRequired).to.equal(true);
  });

  it('#getValidation should return a form valid inputs (Mapping)', function () {
    let validation;
    _ContactModalComponent.manual = false;
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
    validation = _ContactModalComponent.getValidation(fields);
    expect(validation).to.eql(
      [
        {name: 'number1', type: 'tel'},
        {name: 'first_name', type: 'text', maxlength: 250},
        {name: 'email', type: 'email', maxlength: 250}
      ]
    );
  });

  it('should return null if close modal', function () {
    let modalInstance = _$uibModal.open({
                          controllerAs: '$ctrl',
                          template: '<al.lists.contact-modal></al.lists.contact-modal>',
                        });
    _ContactModalComponent.instance = modalInstance;
    modalInstance.result
    .then(result => {
        expect(result).to.equal(null);
    });
    _ContactModalComponent.cancel();
  });

  it('should return null when contact has a empty values', function () {
    let modalInstance = _$uibModal.open({
                          controllerAs: '$ctrl',
                          template: '<al.lists.contact-modal></al.lists.contact-modal>',
                        });

     let contact = {
      'number1': '2025550180',
      'number2': '2025550181'
    };
    _ContactModalComponent.contact=contact;
    _ContactModalComponent.instance = modalInstance;
    _ContactModalComponent.dates = [];


    modalInstance.result
    .then(result => {
          console.log('theresult');
           console.log(result);
         expect(result).to.equal( _ContactModalComponent.contact);
    });
    _ContactModalComponent.save();
  });

  it('should return a contact to be added', function () {
    let modalInstance = _$uibModal.open({
                          controllerAs: '$ctrl',
                          template: '<al.lists.contact-modal></al.lists.contact-modal>',
                        });
      _ContactModalComponent.contact = {
      'number1': '2025550180',
      'number2': '2025550181'
    };
    _ContactModalComponent.instance = modalInstance;
    _ContactModalComponent.dates = [];


    modalInstance.result
    .then(result => {
          console.log('theresult');
           console.log(result);
         expect(result).to.equal(null);
    });
    _ContactModalComponent.save();
  });
  
  it('should return an empty contact form to create a new contact', function () {
   let modalInstance = _$uibModal.open({
                         controllerAs: '$ctrl',
                         template: '<al.lists.contact-modal></al.lists.contact-modal>',
                       });
   expect(method).to.equal('create');
   _ContactModalComponent.contact = {};
   modalInstance.result
   .then(result => {
       expect(result).to.eql(_ContactModalComponent.contact);
     });
   });

   it('should return a contact to be updated', function () {
    let modalInstance = _$uibModal.open({
                          controllerAs: '$ctrl',
                          template: '<al.lists.contact-modal></al.lists.contact-modal>',
                        });
    _ContactModalComponent.instance = modalInstance;
    _ContactModalComponent.dates = [];
    _ContactModalComponent.contact = {number1: '2025550185', number2: '2025550186'};
    modalInstance.result
    .then(result => {
        expect(result).to.eql(_ContactModalComponent.contact);
    });
    _ContactModalComponent.save();
  });
});

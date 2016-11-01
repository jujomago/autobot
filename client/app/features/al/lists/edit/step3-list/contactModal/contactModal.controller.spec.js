'use strict';

describe('Component:contactModalComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  let ContactModalComponent, mockContact ={
    number1: '',
    number2: '',
    number3: '',
    string1: '',
    percent1: ''
  };

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController) {
    ContactModalComponent = $componentController('al.lists.contactModal');
  }));
  describe('#save', () => {

    it('Should not save an empty contact', () => {
      ContactModalComponent.contact = mockContact;
      ContactModalComponent.save();
      expect(ContactModalComponent.message).to.deep.equal({ show: true, type: 'warning', text: 'Can\'t save empty Contact Record', expires: 3000});
    });

    it('Should not save a contact without numbers', () => {
      ContactModalComponent.contact = mockContact;
      ContactModalComponent.contact.string1 = 'some value';
      ContactModalComponent.save();
      expect(ContactModalComponent.message).to.deep.equal({ show: true, type: 'warning', text: 'The Contact Record does not have any number', expires: 3000});
    });

  });
});

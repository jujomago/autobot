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
  let mockFields = [
  {
    name: 'number1',
    type: 'PHONE',
     mapTo: 'None'
   },
   {
    name: 'number2',
    type: 'PHONE',
     mapTo: 'None'
   },
   {
    name: 'number3',
    type: 'PHONE',
     mapTo: 'None'
   },
   {
    name: 'string1',
    type: 'STRING',
    mapTo: 'None'
   },
   {
    name: 'percent1',
    type: 'PERCENT',
    mapTo: 'None'
   }
   ];

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

    it('Should return contact', () => {
      ContactModalComponent.contactFields = mockFields;
      ContactModalComponent.contact = mockContact;
      ContactModalComponent.instance = {
        result: '',
        close: function(result){
          this.result = result;
        }
      };
      ContactModalComponent.contact.number1 = '(987)-654-3210';
      ContactModalComponent.contact.string1 = ''; 
      ContactModalComponent.save();
      expect(ContactModalComponent.instance.result).to.deep.equal({number1: '9876543210',number2: '',number3: '',string1: '',percent1: ''});
    });
  });
});

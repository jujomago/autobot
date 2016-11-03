'use strict';

describe('Service:FieldMessages', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var FieldMessages;
  beforeEach(inject(function (_FieldMessages_) {
    FieldMessages = _FieldMessages_;
  }));

  describe('#getTypeMessage', function () {
    it('should return message for phone', function () {
      let field = {type: 'PHONE', name: 'phone1'};
      expect(FieldMessages.getTypeMessage(field)).to.be.equal('Contact Field "phone1" has an invalid value. Number must either be 10 digits for dialing within North America, or begin with "011" for international number. International number length should be no more than 20 digits. Please correct it.');
    });
    it('should return message for number', function () {
      let field = {type: 'NUMBER', name: 'number1'};
      expect(FieldMessages.getTypeMessage(field)).to.be.equal('Contact Field "number1" has an invalid value. Invalid number. Please correct it.');
    });
    it('should return message for email', function () {
      let field = {type: 'EMAIL', name: 'email1'};
      expect(FieldMessages.getTypeMessage(field)).to.be.equal('Contact Field "email1" has an invalid value. Invalid email. Please correct it.');
    });
    it('should return message for url', function () {
      let field = {type: 'URL', name: 'url1'};
      expect(FieldMessages.getTypeMessage(field)).to.be.equal('Contact Field "url1" has an invalid value. Invalid URL. Please correct it.');
    });

  });
  describe('#getMinMessage', function () {
    it('should return message for number', function () {
      let field = {type: 'NUMBER', name: 'number1', minValue: 10};
      expect(FieldMessages.getMinMessage(field)).to.be.equal('Contact Field "number1" has an invalid value. Number cannot be less than 10. Please correct it.');
    });
    it('should return message for email', function () {
      let field = {type: 'EMAIL', name: 'email1', minValue: 10};
      expect(FieldMessages.getMinMessage(field)).to.be.equal('Contact Field "email1" has an invalid value. String length cannot be less than 10 characters. Please correct it.');
    });
    it('should return message for date', function () {
      let field = {type: 'DATE', name: 'date1', minValue: '2016-11-31'};
      expect(FieldMessages.getMinMessage(field)).to.be.equal('Contact Field "date1" has an invalid value. Date cannot be earlier than 2016-11-31. Please correct it.');
    });

  });
  describe('#getMaxMessage', function () {
    it('should return message for number', function () {
      let field = {type: 'NUMBER', name: 'number1', maxValue: 10};
      expect(FieldMessages.getMaxMessage(field)).to.be.equal('Contact Field "number1" has an invalid value. Number cannot be greater than 10. Please correct it.');
    });
    it('should return message for email', function () {
      let field = {type: 'EMAIL', name: 'email1', maxValue: 10};
      expect(FieldMessages.getMaxMessage(field)).to.be.equal('Contact Field "email1" has an invalid value. String length cannot be more than 10 characters. Please correct it.');
    });
    it('should return message for date', function () {
      let field = {type: 'DATE', name: 'date1', maxValue: '2016-11-31'};
      expect(FieldMessages.getMaxMessage(field)).to.be.equal('Contact Field "date1" has an invalid value. Date cannot be later than 2016-11-31. Please correct it.');
    });

  });

  describe('#getRequiredMessage', function () {
    it('should return message for all', function () {
      let field = {name: 'field1'};
      expect(FieldMessages.getRequiredMessage(field)).to.be.equal('Contact Field "field1" has an invalid value. Value cannot be empty. Please correct it.');
    });
  });

  describe('#getRegexMessage', function () {
    it('should return message for all', function () {
      let field = {name: 'field1', regex: 'a*b'};
      expect(FieldMessages.getRegexMessage(field)).to.be.equal('Contact Field "field1" has an invalid value. Value does not match the pattern: a*b Please correct it.');
    });
  });

  describe('#getPrecisionMessage', function () {
    it('should return message for all', function () {
      let field = {name: 'field1', precision: 10};
      expect(FieldMessages.getPrecisionMessage(field)).to.be.equal('Contact Field "field1" has an invalid value. Limit for digits before decimal point (10) has been reached. Please correct it.');
    });
  });

  describe('#getScaleMessage', function () {
    it('should return message for all', function () {
      let field = {name: 'field1', scale: 10};
      expect(FieldMessages.getScaleMessage(field)).to.be.equal('Contact Field "field1" has an invalid value. Limit for digits after decimal point (10) has been reached. Please correct it.');
    });
  });

});

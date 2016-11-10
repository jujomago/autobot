'use strict';

describe('Service:FieldFormatter', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service
  var FieldFormatter;
  beforeEach(inject(function (_FieldFormatter_) {
    FieldFormatter = _FieldFormatter_;
  }));

  describe('#formatField', function () {
    it('should return currency multiset', function () {
      let field = {name: 'field1', realType: 'CURRENCY', type: 'MULTISET', currencyType: '$'};
      expect(FieldFormatter.formatField(field, [{value: '1'},{value: '2'},{value: '3'}])).to.be.equal('$1;$2;$3');
    });
    it('should return percent multiset', function () {
      let field = {name: 'field1', realType: 'PERCENT', type: 'MULTISET'};
      expect(FieldFormatter.formatField(field, [{value: '1'},{value: '2'},{value: '3'}])).to.be.equal('1%;2%;3%');
    });
    it('should return currency set', function () {
      let field = {name: 'field1', realType: 'CURRENCY', type: 'SET', currencyType: '$'};
      expect(FieldFormatter.formatField(field, {value: '1'})).to.be.equal('$1');
    });
    it('should return percent set', function () {
      let field = {name: 'field1', realType: 'PERCENT', type: 'SET'};
      expect(FieldFormatter.formatField(field, {value: '1'})).to.be.equal('1%');
    });
    it('should return currency format', function () {
      let field = {name: 'field1', type: 'CURRENCY', currencyType: '$'};
      expect(FieldFormatter.formatField(field, '1')).to.be.equal('$1');
    });
    it('should return percent format', function () {
      let field = {name: 'field1', type: 'PERCENT'};
      expect(FieldFormatter.formatField(field, '1')).to.be.equal('1%');
    });
    it('should return date format', function () {
      let field = {name: 'field1', type: 'DATE', dateFormat: 'yyyy'};
      let value = new Date('2016-11-01');
      expect(FieldFormatter.formatField(field, value)).to.be.equal('2016 PDT');
    });
    it('should return date time format', function () {
      let field = {name: 'field1', type: 'DATE_TIME', dateFormat: 'yyyy'};
      let date = new Date('2016-11-01');
      expect(FieldFormatter.formatField(field, {date: date, time: '09:34'})).to.be.equal('2016 09:34 PDT');
    });
  });

  describe('#removeExtraChars', function () {
    it('should return number format', function () {
      let field = {name: 'field1', type: 'NUMBER'};
      expect(FieldFormatter.removeExtraChars(field, '2.')).to.be.equal('2');
    });
    it('should return phone format', function () {
      let field = {name: 'field1', type: 'PHONE'};
      expect(FieldFormatter.removeExtraChars(field, '(987)-654-3210')).to.be.equal('9876543210');
    });
    it('should trim start and end spaces', function () {
      let field = {name: 'field1', type: 'STRING'};
      expect(FieldFormatter.removeExtraChars(field, '     test      ')).to.be.equal('test');
    });

  });

});

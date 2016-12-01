'use strict';

describe('Component:HomeComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  let HomeComponent, _$httpBackend, _endPointUrl;


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $httpBackend, appConfig) {
    HomeComponent = $componentController('rqa');
    _$httpBackend = $httpBackend;
    if(appConfig.apiUri){
        _endPointUrl=appConfig.apiUri+'/f9/reports';
    }
  }));

  it('should get filters in object', function () {
    HomeComponent.usedFilters = HomeComponent.notUsedFilters;
     this.notUsedFilters = [{key: 'CUSTOMER NAME', value: ''}, {key: 'DNIS', value: ''}, {key: 'AGENT NAME', value: ''}, {key: 'CAMPAIGN', value: ''}, {key: 'DISPOSITION', value: ''}];
    expect(HomeComponent.getFilters()).to.deep.equal({'CUSTOMER NAME': '', 'DNIS': '', 'AGENT NAME': '', 'CAMPAIGN': '', 'DISPOSITION': ''});
  });
  it('should close all popups', function () {
    HomeComponent.openedPopups.key=true;
    HomeComponent.closeAllPopups();
   expect(HomeComponent.openedPopups).to.deep.equal({key: false, default: false, date: false});
  });
  it('should remove all filters', function () {
    HomeComponent.removeAllFilters();
    expect(HomeComponent.notUsedFilters).to.deep.equal([{key: 'CUSTOMER NAME', value: ''}, {key: 'DNIS', value: ''}, {key: 'AGENT NAME', value: ''}, {key: 'CAMPAIGN', value: ''}, {key: 'DISPOSITION', value: ''}]);
    expect(HomeComponent.usedFilters).to.deep.equal([]);
  });
  describe('#applyDate', function () {
    it('should not do any action (return null)', function () {
      HomeComponent.selectedDate.key = 'key1';
      HomeComponent.tmpSelectedDate.key = 'key1';
      expect(HomeComponent.applyDate(false)).to.equal(null);
    });
    it('should return a call list', function () {
      HomeComponent.tmpSelectedDate = HomeComponent.dates[0];
      let mockFunction = function(){
        return {startDate: {toISOString: () => '2016-04-23T21:00:00.000-07:00'}, endDate: {toISOString: () =>'2016-04-25T21:00:00.000-07:00'}};
      };
      HomeComponent.tmpSelectedDate.function = mockFunction;
      _$httpBackend.whenGET(_endPointUrl+'/calllogs?startDate=2016-04-23T21:00:00.000-07:00&endDate=2016-04-25T21:00:00.000-07:00').respond(200,{return: 'ABC-123-DEF-456'});
      _$httpBackend.whenGET(_endPointUrl+'/ABC-123-DEF-456?timeout=500').respond(200,false);
      _$httpBackend.whenGET(_endPointUrl+'/calllogs/ABC-123-DEF-456').respond(200,{return: [{'CALL ID': '123456','AGENT': 'Juan Perez','DISPOSITION': 'NONE'}, {'CALL ID': '123789','AGENT': 'Pedro Garcia','DISPOSITION': 'HOLD'}]});
      let promise = HomeComponent.applyDate(false);
      expect(HomeComponent.isLoading).to.equal(true);
      promise.then(()=>{
        expect(HomeComponent.calls).to.deep.equal([{'CALL ID': '123456','AGENT': 'Juan Perez','DISPOSITION': 'NONE'}, {'CALL ID': '123789','AGENT': 'Pedro Garcia','DISPOSITION': 'HOLD'}]);
        expect(HomeComponent.isLoading).to.equal(false);
        expect(HomeComponent.message).to.deep.equal({show: false});
      });
      _$httpBackend.flush(); 
    });
    it('should return a internal server error in first call', function () {
      HomeComponent.tmpSelectedDate = HomeComponent.dates[0];
      let mockFunction = function(){
        return {startDate: {toISOString: () => '2016-04-23T21:00:00.000-07:00'}, endDate: {toISOString: () =>'2016-04-25T21:00:00.000-07:00'}};
      };
      HomeComponent.tmpSelectedDate.function = mockFunction;
      _$httpBackend.whenGET(_endPointUrl+'/calllogs?startDate=2016-04-23T21:00:00.000-07:00&endDate=2016-04-25T21:00:00.000-07:00').respond(500,{error: 'Internal Server Error'});
     let promise = HomeComponent.applyDate(false);
      expect(HomeComponent.isLoading).to.equal(true);
      promise.then(()=>{
        expect(HomeComponent.calls).to.deep.equal([]);
        expect(HomeComponent.isLoading).to.equal(false);
        expect(HomeComponent.message).to.deep.equal({show: true, text: 'Internal Server Error'});
      });
      _$httpBackend.flush(); 
    });
    it('should return a internal server error in second call', function () {
      HomeComponent.tmpSelectedDate = HomeComponent.dates[0];
      let mockFunction = function(){
        return {startDate: {toISOString: () => '2016-04-23T21:00:00.000-07:00'}, endDate: {toISOString: () =>'2016-04-25T21:00:00.000-07:00'}};
      };
      HomeComponent.tmpSelectedDate.function = mockFunction;
        _$httpBackend.whenGET(_endPointUrl+'/calllogs?startDate=2016-04-23T21:00:00.000-07:00&endDate=2016-04-25T21:00:00.000-07:00').respond(200,{return: 'ABC-123-DEF-456'});
      _$httpBackend.whenGET(_endPointUrl+'/ABC-123-DEF-456?timeout=500').respond(500,{error: 'Internal Server Error'});
     let promise = HomeComponent.applyDate(false);
      expect(HomeComponent.isLoading).to.equal(true);
      promise.then(()=>{
        expect(HomeComponent.calls).to.deep.equal([]);
        expect(HomeComponent.isLoading).to.equal(false);
        expect(HomeComponent.message).to.deep.equal({show: true, text: 'Internal Server Error'});
      });
      _$httpBackend.flush(); 
    });
    it('should return a internal server error in third call', function () {
      HomeComponent.tmpSelectedDate = HomeComponent.dates[0];
      let mockFunction = function(){
        return {startDate: {toISOString: () => '2016-04-23T21:00:00.000-07:00'}, endDate: {toISOString: () =>'2016-04-25T21:00:00.000-07:00'}};
      };
      HomeComponent.tmpSelectedDate.function = mockFunction;
       _$httpBackend.whenGET(_endPointUrl+'/calllogs?startDate=2016-04-23T21:00:00.000-07:00&endDate=2016-04-25T21:00:00.000-07:00').respond(200,{return: 'ABC-123-DEF-456'});
      _$httpBackend.whenGET(_endPointUrl+'/ABC-123-DEF-456?timeout=500').respond(200,false);
      _$httpBackend.whenGET(_endPointUrl+'/calllogs/ABC-123-DEF-456').respond(500,{error: 'Internal Server Error'});
     let promise = HomeComponent.applyDate(false);
      expect(HomeComponent.isLoading).to.equal(true);
      promise.then(()=>{
        expect(HomeComponent.calls).to.deep.equal([]);
        expect(HomeComponent.isLoading).to.equal(false);
        expect(HomeComponent.message).to.deep.equal({show: true, text: 'Internal Server Error'});
      });
      _$httpBackend.flush(); 
    });
  });
});

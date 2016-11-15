'use strict';

describe('Component:CheckDNCModalComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  let CheckDNCModalComponent;
  let _$httpBackend, _endPointUrl;
  // Initialize the controller
  beforeEach(inject(function ($componentController, $httpBackend, appConfig) {
    CheckDNCModalComponent = $componentController('checkDncModal');
    _$httpBackend = $httpBackend;
    if(appConfig.apiUri){
        _endPointUrl=appConfig.apiUri+'/dnc/scrubs';
    }
  }));
  describe('#validate', () => {

    it('should return numbers with status', () => {
      _$httpBackend.whenGET(_endPointUrl+'/ABC123?phonelist=9876543210,9876543211').respond(200,[{phone: '9876543210', status: 'P'}, {phone: '9876543211', status: 'C'}]);
      CheckDNCModalComponent.instance = {
        close: function(params){
          this.params = params;
        } 
      };
     let promise = CheckDNCModalComponent.validate();
     expect(CheckDNCModalComponent.validating).to.be.equal(true);
     promise.then(()=>{
        expect(CheckDNCModalComponent.instance.params).to.be.deep.equal([{phone: '9876543210', status: 'P'}, {phone: '9876543211', status: 'C'}]);
     });
    });
    it('should return error', () => {
       _$httpBackend.whenGET(_endPointUrl+'/ABC123?phonelist=9876543210,9876543211').respond(500, {error: 'Internal Server Error'});
      let promise = CheckDNCModalComponent.validate();
     expect(CheckDNCModalComponent.validating).to.be.equal(true);
     promise.then(()=>{
        expect(CheckDNCModalComponent.validating).to.be.equal(false);
        expect(CheckDNCModalComponent.errorId).to.be.equal(true);
     });
    });

  });

  /*describe('#loadPhones', () => {

    it('should return numbers separated by comma', () => {
      CheckDNCModalComponent.parent = {};
      CheckDNCModalComponent.parent.list=[{number1: '9876543219',number2: '9876543219',number3: '9876543210' }, {number1: '9876543211',number2: '',number3: '' }]
      CheckDNCModalComponent.loadPhones();
      expect(CheckDNCModalComponent.phones).to.equal('9876543219,9876543210,9876543211');
    });
    it('should return empty', () => {
      CheckDNCModalComponent.parent = {};
      CheckDNCModalComponent.parent.list=[{number1: '0019876543219',number2: '',number3: '' }, {number1: '0019876543211',number2: '',number3: '' }]
      CheckDNCModalComponent.loadPhones();
      expect(CheckDNCModalComponent.phones).to.equal('');
    });

  });*/
});

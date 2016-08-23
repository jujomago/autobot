'use strict';

describe('Component:DispositionCreateComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var CreateComponent, scope, httpBackend;
  var state, dispositionsService, endPointUrl;
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope, $httpBackend, $state, $stateParams, _DispositionsService_, appConfig) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    state = $state;
    dispositionsService = _DispositionsService_;
    if (appConfig.apiUri) {
      endPointUrl = appConfig.apiUri + '/f9/dispositions';
    }


    CreateComponent = $componentController('al.dispositions.create', {
      $scope: scope,
      $stateParams: { message: null },
      $state: state,
      DispositionsService: dispositionsService,
      redial: {useTimer: false, validAttempts: true, timer: {minutes: 1, days: 0, hours: 0}, allowChangeTimer: false},
      notDial: {useTimer: false, timer: {minutes: 1, days: 0, hours: 0}, allowChangeTimer: false}
    });

    httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);

  }));
  describe('#timeField', () => {
    it('if Hours and Days are equal to zero, min of minutes should be one', function () {
      CreateComponent.redial.timer={minutes: 1, days: 0, hours: 0};
      expect(CreateComponent.minOfMinutes(CreateComponent.redial.timer)).to.equal(1);
    });
    it('if Hours or Days are diferent to zero, min of minutes should be zero', function () {
      CreateComponent.redial.timer={minutes: 1, days: 1, hours: 0};
      expect(CreateComponent.minOfMinutes(CreateComponent.redial.timer)).to.equal(0);
      CreateComponent.redial.timer={minutes: 1, days: 0, hours: 1};
      expect(CreateComponent.minOfMinutes(CreateComponent.redial.timer)).to.equal(0);
      CreateComponent.redial.timer={minutes: 1, days: 1, hours: 1};
      expect(CreateComponent.minOfMinutes(CreateComponent.redial.timer)).to.equal(0);
    });
    it('if Minutes and Days are equal to zero, min of hours should be one', function () {
      CreateComponent.redial.timer={minutes: 0, days: 0, hours: 1};
      expect(CreateComponent.minOfHours(CreateComponent.redial.timer)).to.equal(1);
    });
    it('if Minutes or Days are diferent to zero, min of hours should be zero', function () {
      CreateComponent.redial.timer={minutes: 0, days: 1, hours: 1};
      expect(CreateComponent.minOfHours(CreateComponent.redial.timer)).to.equal(0);
      CreateComponent.redial.timer={minutes: 1, days: 0, hours: 1};
      expect(CreateComponent.minOfHours(CreateComponent.redial.timer)).to.equal(0);
      CreateComponent.redial.timer={minutes: 1, days: 1, hours: 1};
      expect(CreateComponent.minOfHours(CreateComponent.redial.timer)).to.equal(0);
    });
    it('if Minutes and Hours are equal to zero, min of days should be one', function () {
      CreateComponent.redial.timer={minutes: 0, days: 1, hours: 0};
      expect(CreateComponent.minOfDays(CreateComponent.redial.timer)).to.equal(1);
    });
    it('if Minutes or Hours are diferent to zero, min of days should be zero', function () {
      CreateComponent.redial.timer={minutes: 0, days: 1, hours: 1};
      expect(CreateComponent.minOfDays(CreateComponent.redial.timer)).to.equal(0);
      CreateComponent.redial.timer={minutes: 1, days: 1, hours: 0};
      expect(CreateComponent.minOfDays(CreateComponent.redial.timer)).to.equal(0);
      CreateComponent.redial.timer={minutes: 1, days: 1, hours: 1};
      expect(CreateComponent.minOfDays(CreateComponent.redial.timer)).to.equal(0);
    });
  });
  describe('#save', () => {
    it('=> should return Status 201, created OK"', () => {
     httpBackend.whenPOST(endPointUrl).respond(201,null);
     let saveDisposition=CreateComponent.save();
     expect(CreateComponent.SubmitText).to.equal('Saving...'); 
     saveDisposition
     .then(response=>{
         expect(response.statusCode).to.equal(201);
         expect(response.data).to.equal(null);
         expect(response.errorMessage).to.equal(null);
         expect(CreateComponent.message.text).to.equal('Disposition Created SuccessFully');
      });
      httpBackend.flush();
    });
    it('=> should return Status 500, created error', () => {
        httpBackend.whenPOST(endPointUrl).respond(500,{
            error: 'Error message'
        });
       CreateComponent.save()
        .then(response=>{       
           expect(response.statusCode).to.equal(500);
           expect(response.data).to.equal(null);
           expect(response.errorMessage).to.not.equal(null);   
           expect(CreateComponent.SubmitText).to.equal('Save');
           expect(CreateComponent.message.text).to.equal('Error message');
        });
        httpBackend.flush();
    });    
  });
});

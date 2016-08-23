'use strict';

describe('Component:DispositionEditComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var EditComponent, scope, httpBackend;
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
    EditComponent = $componentController('al.dispositions.edit', {
      $scope: scope,
      $stateParams: { message: null },
      $state: state,
      DispositionsService: dispositionsService,
      redial: {useTimer: false, validAttempts: true, timer: {minutes: 1, days: 0, hours: 0}, allowChangeTimer: false},
      notDial: {useTimer: false, timer: {minutes: 1, days: 0, hours: 0}, allowChangeTimer: false}
    });

    httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
  }));
  describe('#save', () => {
    it('=> should return Status 200, updated OK"', () => {
     EditComponent.nameDisposition = 'oldName';
     httpBackend.whenPUT(endPointUrl+'/oldName').respond(200,null);
     let saveDisposition=EditComponent.save();
     expect(EditComponent.SubmitText).to.equal('Saving...'); 
     saveDisposition
     .then(response=>{
         expect(response.statusCode).to.equal(200);
         expect(response.data).to.equal(null);
         expect(response.errorMessage).to.equal(null);
         expect(EditComponent.message.text).to.equal('Disposition Updated SuccessFully');
      });
      httpBackend.flush();
    });
    it('=> should return Status 500, error in update', () => {
        EditComponent.nameDisposition = 'oldName';
        httpBackend.whenPUT(endPointUrl+'/oldName').respond(500,{
            error: 'Error message'
        });
       EditComponent.save()
        .then(response=>{           
           expect(response.statusCode).to.equal(500);
           expect(response.data).to.equal(null);
           expect(response.errorMessage).to.not.equal(null);   
           expect(EditComponent.SubmitText).to.equal('Save');
           expect(EditComponent.message.text).to.equal('Error message');
        });
        httpBackend.flush();
    });    
  });
  describe('#timeField',() => {
    it('if Hours or Minutes are diferent to zero, max of days should be 59', function () {
      EditComponent.redial.timer={minutes: 0, days: 0, hours: 1};
      expect(EditComponent.maxOfDays(EditComponent.redial.timer)).to.equal(59);
      EditComponent.redial.timer={minutes: 1, days: 0, hours: 0};
      expect(EditComponent.maxOfDays(EditComponent.redial.timer)).to.equal(59);
    });
    it('if Hours and Minutes are equal to zero, max of days should be 60', function () {
      EditComponent.redial.timer={minutes: 0, days: 0, hours: 0};
      expect(EditComponent.maxOfDays(EditComponent.redial.timer)).to.equal(60);
    });
  });
});
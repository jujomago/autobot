'use strict';

describe('Skill Controller: CreateController', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var ctrl, scope, state, httpBackend,endPointUrl,skillService;
  state='home';

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope, $httpBackend, $state, appConfig,  _SkillsService_) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    state = $state;
    skillService = _SkillsService_;

    if (appConfig.apiUri) {
      endPointUrl = appConfig.apiUri + '/f9/admin/skills';
    }

    ctrl = $componentController('al.skills.create', {
      $scope: scope,
      $state: state,
      SkillService: skillService
    });

     httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
     httpBackend.whenPOST(appConfig.apiUri+'/f9/admin/lists').respond(200);

  }));

  afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
  });


    describe('#save', function() {

        it('=> should save a skill successfully', function () {

            httpBackend.whenPOST(endPointUrl).respond({
                return: [{ 'description': '', 'id': '266184', 'messageOfTheDay': '', 'name': 'Sales', 'routeVoiceMails': false },
                    { 'description': '', 'id': '266185', 'messageOfTheDay': '', 'name': 'CustomerService', 'routeVoiceMails': false },
                    { 'description': '', 'id': '266186', 'messageOfTheDay': '', 'name': 'Marketing', 'routeVoiceMails': true }]
            });

            expect(ctrl.showSuccessMessage).to.equal(false);

            let promiseSave=ctrl.save();
            expect(ctrl.SubmitText).to.equal('Saving...');
            promiseSave.then(()=>{
                expect(ctrl.SubmitText).to.equal('Saved');
                expect(ctrl.showSuccessMessage).to.equal(true);
            });
            httpBackend.flush();
        });


        it('=> when cant save a skill, error 500', function () {

            httpBackend.whenPOST(endPointUrl).respond(500,'Some error from Server');

            expect(ctrl.showSuccessMessage).to.equal(false);

            let promiseSave=ctrl.save();
            expect(ctrl.SubmitText).to.equal('Saving...');
            promiseSave.then(r=>{
                expect(ctrl.SubmitText).to.equal('Save');
                expect(r.data).to.equal(null);
                expect(r.errorMessage).to.equal('Some error from Server');
                expect(ctrl.message).to.eql({show:true,type:'danger',text: r.errorMessage});
            });
            httpBackend.flush();
        });



    });

});

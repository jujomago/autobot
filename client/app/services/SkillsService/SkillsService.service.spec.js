'use strict';

describe('Service: SkillsService', function () {

    // load the service's module
    beforeEach(module('fakiyaMainApp'));

    // instantiate service
    var SkillsService, httpBackend;
    var endPointUrl;

    beforeEach(inject(function (_SkillsService_, $httpBackend, appConfig) {
        SkillsService = _SkillsService_;
        httpBackend = $httpBackend;
        if(appConfig.apiUri){
            endPointUrl=appConfig.apiUri+'/f9/skills';
        }        
    }));

    afterEach(function () {
        //httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('should return skills', function () {
        httpBackend.whenGET(endPointUrl).respond({
            return: [{ 'description': '', 'id': '266184', 'messageOfTheDay': '', 'name': 'Sales', 'routeVoiceMails': false },
                { 'description': '', 'id': '266185', 'messageOfTheDay': '', 'name': 'CustomerService', 'routeVoiceMails': false },
                { 'description': '', 'id': '266186', 'messageOfTheDay': '', 'name': 'Marketing', 'routeVoiceMails': true }]
        });

        SkillsService.getSkills().then(skills => {
            expect(null).to.not.equal(skills);
            expect(undefined).to.not.equal(skills);
            expect(undefined).to.not.equal(skills.data);
            expect(skills.data.length).to.equal(3);
            expect(skills.statusCode).to.equal(200);
            expect(skills.errorMessage.length).to.equal(0);
        });
        httpBackend.flush();
    });

});

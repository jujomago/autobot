'use strict';

describe('#SkillsService', function () {

    // load the service's module
    beforeEach(module('fakiyaMainApp'));

    // instantiate service
    var SkillsService, httpBackend;
    var endPointUrl;

    beforeEach(inject(function (_SkillsService_, $httpBackend, appConfig) {
        SkillsService = _SkillsService_;
        httpBackend = $httpBackend;
        if(appConfig.apiUri){
            endPointUrl=appConfig.apiUri+'/f9/admin/skills';
        }        
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('#getSklls',function(){
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

        it('when skill could not be getted, status different from 200', function () {
            httpBackend.whenGET(endPointUrl).respond(500,'Some error message from the server');
            SkillsService.getSkills()
            .then(null).catch(response=>{
                expect(response.errorMessage).to.equal('Some error message from the server');
                expect(response.data).to.equal(null);
                expect(response.statusCode).to.equal(500);
            });

            httpBackend.flush();
        });
    });
    describe('#getSkillsInfo',function(){
        it('should return skillsInfo', function () {
            httpBackend.whenGET(endPointUrl+'/skillsInfo').respond({  
                return: [                  
                  {
                      skill:{ 'description': '', 'id': '266184', 'messageOfTheDay': '', 'name': 'Sales', 'routeVoiceMails': false },
                      users:[
                          {'id':'266254','level':1,'skillName':'Sales','userName':'bruedi@enterprise9.com'},
                          {'id':'266254','level':1,'skillName':'Sales','userName':'amauro@enterprise9.com'},
                          {'id':'266254','level':1,'skillName':'Sales','userName':'Enterprise'}
                      ]
                  },
                  {
                      skill:{ 'description': '', 'id': '266255', 'messageOfTheDay': '', 'name': 'Support', 'routeVoiceMails': false },
                      users:[
                          {'id':'266255','level':1,'skillName':'Support','userName':'bruedi@enterprise9.com'},
                          {'id':'266255','level':1,'skillName':'Support','userName':'pruedi@enterprise9.com'}                       
                      ] 
                  }                  
                ]});

            SkillsService.getSkillsInfo().then(response => {
                expect(response.statusCode).to.equal(200);
                expect(response.errorMessage).to.equal('');
                expect(response.data).to.have.lengthOf(2);
                expect(response.data[0]).to.have.property('users');
                expect(response.data[0]).to.have.property('skill');
             
            });
           httpBackend.flush();
        });
        it('when status code error, different from 200', function () {
            httpBackend.whenGET(endPointUrl+'/skillsInfo').respond(401,'Some error message from the server');
            SkillsService.getSkillsInfo().then(null)
            .catch(response=>{
                expect(response.errorMessage).to.equal('Some error message from the server');
                expect(response.data).to.equal(null);
                expect(response.statusCode).to.equal(401);
            });
           httpBackend.flush();
        });
    });
    describe('#getSkill',function(){
        it('should return skill', function () {
            let nameSkill='testNameSkill';
            httpBackend.whenGET(endPointUrl+'/'+nameSkill).respond({  
                return:{
                    skill:{ 'description': '', 'id': '266184', 'name': 'testNameSkill', 'routeVoiceMails': false }
                }                  
                });

            SkillsService.getSkill(nameSkill).then(response => {          
                expect(response.statusCode).to.equal(200);
                expect(response.errorMessage).to.equal('');          
                expect(response.data).to.have.property('skill');     
                expect(response.data).to.have.deep.property('skill.name',nameSkill);          
            });

           httpBackend.flush();
        });
    });
    describe('#createSkill',function(){
        it('should return skill created with ID', function () {
            let testSkillObject={
                name:'testNameSkill',
                description:'description',
                messageOfTheDay:'someMessage',
                routeVoiceMails:true    
            };

            httpBackend.whenPOST(endPointUrl,testSkillObject).respond({  
                return:{
                    skill:{
                        id:22323,
                        name:'testNameSkill',
                        description:'description',
                        messageOfTheDay:'someMessage',
                        routeVoiceMails:true    
                    }
                }                  
            });

            SkillsService.createSkill(testSkillObject)
            .then(response => {          
                expect(response.statusCode).to.equal(200);
                expect(response.errorMessage).to.equal('');    
                expect(response.data).to.have.property('skill');
                expect(response.data).to.have.deep.property('skill.id');              
            });

           httpBackend.flush();
        });
        it('when cant create a skill, status different from 200', function () {
            let testSkillObject={
                name:'testNameSkill',
                description:'description',
                messageOfTheDay:'someMessage',
                routeVoiceMails:true    
            };

            httpBackend.whenPOST(endPointUrl,testSkillObject).respond(404,'Endpoint not found');

            SkillsService.createSkill(testSkillObject)
            .then(null)
            .catch(response => {          
                expect(response.statusCode).to.equal(404);
                expect(response.errorMessage).to.equal('Endpoint not found');
                expect(response.data).to.equal(null);                           
            });

           httpBackend.flush();
        });
    });
    describe('#updateSkill',function(){
        it('should return a updated skill', function () {
            let testSkillObject={
                name:'testNameSkill',
                description:'description',
                messageOfTheDay:'someMessage',
                routeVoiceMails:true    
            };

            httpBackend.whenPUT(endPointUrl,testSkillObject).respond({  
                return:{
                    skill:{
                        id:22323,
                        name:'testNameSkill',
                        description:'description',
                        messageOfTheDay:'someMessage',
                        routeVoiceMails:true    
                    }
                }                  
            });

            SkillsService.updateSkill(testSkillObject)
            .then(response => {          
                expect(response.statusCode).to.equal(200);
                expect(response.errorMessage).to.equal('');    
                expect(response.data).to.have.property('skill');
                expect(response.data).to.have.deep.property('skill.id');              
            });

           httpBackend.flush();
        });
        it('when cant update a skill, status different from 200', function () {
            let testSkillObject={
                name:'testNameSkill',
                description:'description',
                messageOfTheDay:'someMessage',
                routeVoiceMails:true    
            };

            httpBackend.whenPUT(endPointUrl,testSkillObject).respond(501,'Some error');

            SkillsService.updateSkill(testSkillObject)
            .then(null)
            .catch(response => {          
                expect(response.statusCode).to.equal(501);
                expect(response.errorMessage).to.equal('Some error');
                expect(response.data).to.equal(null);                           
            });

           httpBackend.flush();
        });
    });
    describe('#deleteSkill',function(){
        it('when delete a skill is succesfull', function () {
            let skillObj={name:'testSkillName'};

            httpBackend.whenDELETE(endPointUrl+'/'+skillObj.name).respond(204);

            SkillsService.deleteSkill(skillObj)
            .then(response => {          
                expect(response.statusCode).to.equal(204);
                expect(response.errorMessage).to.equal('');
                console.log(response);
                expect(response.data).to.equal(null);  
                        
            });

           httpBackend.flush();
        });
      
        it('when delete is wrong, status other than 204', function () {
            let skillObj={name:'testSkillName'};

            httpBackend.whenDELETE(endPointUrl+'/'+skillObj.name).respond(501,'Some error');

            SkillsService.deleteSkill(skillObj)
            .then(null)
            .catch(response => {          
                expect(response.statusCode).to.equal(501);
                expect(response.errorMessage).to.equal('Some error');
                expect(response.data).to.equal(null);                           
            });

           httpBackend.flush();
        });
    });

});


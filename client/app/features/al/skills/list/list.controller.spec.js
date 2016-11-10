'use strict';

describe('Component: al.skills.list', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var ListComponent, scope, httpBackend;
  var state, timeout, skillService,sandbox,window,endPointUrl;

  var mockSkillData = {
    'return': [
      { 'description': '', 'id': '266184', 'messageOfTheDay': '', 'name': 'Sales', 'routeVoiceMails': false },
      { 'description': '', 'id': '266185', 'messageOfTheDay': '', 'name': 'CustomerService', 'routeVoiceMails': false },
      { 'description': '', 'id': '266186', 'messageOfTheDay': '', 'name': 'Marketing', 'routeVoiceMails': true },
      { 'description': '', 'id': '6544', 'messageOfTheDay': '', 'name': 'AnotherSkill', 'routeVoiceMails': false },
      { 'description': '', 'id': '6773', 'messageOfTheDay': '', 'name': 'Another S', 'routeVoiceMails': true }]
  };


  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope, $httpBackend, $state, $stateParams, $timeout, $window, ConfirmAsync, _SkillsService_,appConfig) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    state = $state;
    timeout = $timeout;
    skillService = _SkillsService_;
    window=$window;
    
    sandbox = sinon.sandbox.create();
    
    if(appConfig.apiUri){
        endPointUrl=appConfig.apiUri+'/f9/skills';
    }
         

    ListComponent = $componentController('al.skills.list', {
      $scope: scope,
      $stateParams: { message:null},
      $state: state,
      $timeout: timeout,
      SkillService: skillService
    });

    httpBackend.whenGET(url=>(url.indexOf('.html') !== -1)).respond(200);


  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingRequest();
     sandbox.restore();
  });
  
  
  
   describe('#deleteSkill',()=>{  
 
     it('skill deleted should return 204 statusCode',()=>{
       
        httpBackend.whenDELETE(endPointUrl+'/Demo2').respond(204,null);  
       
        sandbox.stub(window, 'confirm').returns(true);

        let item={skill:{name:'Demo2'}};
                                   
        ListComponent.deleteSkill(item,5)
        .then(response=>{   
            expect(ListComponent.toggleSkillRow).to.equal(-1);            
            expect(response.statusCode).to.equal(204);
            expect(response.data).to.equal(null);
 
        });
        
       expect(window.confirm.calledOnce).to.equal(true);
        
        httpBackend.flush();
     });   

      
     it('skill cant be deleted, returned error 500',()=>{
       
        httpBackend.whenDELETE(endPointUrl+'/Demo2').respond(500,'Some error from server');  
       
        sandbox.stub(window, 'confirm').returns(true);

        let item={skill:{name:'Demo2'}};
                                   
        ListComponent.deleteSkill(item,5)
        .then(response=>{   
            expect(ListComponent.toggleSkillRow).to.equal(-1);            
            expect(response.statusCode).to.equal(500);
            expect(response.data).to.equal(null);
            expect(response.errorMessage).to.equal('Some error from server');
 
        });
        
       expect(window.confirm.calledOnce).to.equal(true);
        
        httpBackend.flush();
     });        
  
  });
  
  

  describe('#getSkills', () => {

    it('Skill List Returned', () => {
      httpBackend.whenGET(endPointUrl+'/skillsInfo').respond(mockSkillData);
      
      expect(ListComponent.message.show).to.equal(false);
      expect(ListComponent.skills).to.have.lengthOf(0);
      
      var getSkills = ListComponent.getSkills();

     
      getSkills.then(_skills => {       
            expect(_skills).to.be.an.instanceOf(Array);
            expect(_skills).to.have.lengthOf(5);
            expect(ListComponent.totalItems).to.not.equal(0);
      });

      httpBackend.flush();
    });

    it('Skill List cant be returned by error server', () => {
      httpBackend.whenGET(endPointUrl+'/skillsInfo').respond(500,'Some error from Server');
      
      expect(ListComponent.message.show).to.equal(false);
      expect(ListComponent.skills).to.have.lengthOf(0);
      
      var getSkills = ListComponent.getSkills();
     
      getSkills.then(_skills => {     
            expect(ListComponent.skills).to.have.lengthOf(0);     
            expect(_skills.statusCode).to.equal(500);  
            expect(_skills.errorMessage).to.equal('Some error from Server');
            expect(_skills.data).to.equal(null);  
            expect(ListComponent.message).to.eql({ show: true, type: 'danger', text: _skills.errorMessage });
      });

      httpBackend.flush();
    });



  });

    

  describe('#sortColumn', () => {

    it('param columnName not send, should return false', () => {
      expect (false).to.equal (ListComponent.sortColumn(''));
    });

    it('param columnName send, should return true', () => {
      ListComponent.reverse = true;
      ListComponent.skills = [
        {skill:
          {name: 'some text to search'}
        }, 
        {skill:
          {name: 'another text out of search'}
        }, 
        {skill:
          {name: 'some text to search'}
        }];
      let expectedArray = [
        {skill:
          {name: 'another text out of search'}
        },
        {skill:
          {name: 'some text to search'}
        }, 
        {skill:
          {name: 'some text to search'}
        }];
      expect(ListComponent.sortColumn('skill.name')).to.equal (true);
      expect(JSON.stringify(expectedArray)).to.equal(JSON.stringify(ListComponent.skills));
    });

  });

  describe('#filteringBySearch', () => {

    it('Should return true, when searching something', () => {
      ListComponent.search.skill.name='some text to search';
      ListComponent.skills = [
        {skill:
          {name: 'some text to search'}
        }, 
        {skill:
          {name: 'another text out of search'}
        }, 
        {skill:
          {name: 'some text to search'}
        }];
      expect(ListComponent.filteringBySearch()).to.equal (true);
      expect(ListComponent.beginNext).to.equal(0);
      expect(ListComponent.currentPage).to.equal(1);
    });

    it('Should return false, when input search is empty', () => {
        ListComponent.search.skill.name='';
        expect(ListComponent.filteringBySearch()).to.equal (false);       
    });

  });




});

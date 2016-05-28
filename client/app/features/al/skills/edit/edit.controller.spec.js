'use strict';

describe('Component: al.skills.edit', function() {

    // load the controller's module
    beforeEach(module('fakiyaMainApp'));

    var EditComponent, scope, httpBackend;
    var state, timeout, skillService, userService, endPointUrl;

    // Initialize the controller and a mock scope
    beforeEach(inject(function($componentController, $rootScope, $httpBackend, $state, $timeout, _SkillsService_, _UsersService_, appConfig) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        state = $state;
        timeout = $timeout;
        skillService = _SkillsService_;
        userService = _UsersService_;
        
        if(appConfig.apiUri){
             endPointUrl=appConfig.apiUri+'/f9/users';
        }    
        
        EditComponent = $componentController('al.skills.edit', {
            $scope: scope,
            $stateParams: { name: 'xxxy' },
            $state: state,
            $timeout: timeout,
            SkillService: skillService,
            UserService: userService
        });
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
    });


    describe('#showUserInfo',()=>{
            it('=> should return a valid user', function() {
                 httpBackend.whenGET(endPointUrl+'/enrique').respond({
                    return:[
                        {'active':true,
                        'canChangePassword':false,
                        'EMail':'enrique@ortuno.net',
                        'extension':2907,
                        'firstName':'One person more',
                        'fullName':'Supervisor East',
                        'IEXScheduled':false,
                        'id':'2381456',
                        'lastName':'East',
                        'mustChangePassword':false,
                        'startDate':'2016-01-11T06:00:00.000Z',
                        'userName':'Sup_East'}]});
                        
                EditComponent.showUserInfo ('enrique',1).then (r=>{
                        expect (EditComponent.toggleUsernameLink).to.equal (1);
                        //console.log (EditComponent.DetailUser);
                        expect (r.EMail).to.equal('enrique@ortuno.net');
                });
              httpBackend.flush();
        });        
    });
    
    describe('#addUsertoSkill',()=>{
        
           it('=> should return true when added',()=>{
               
                EditComponent.selectedSkill.id=3;
                EditComponent.selectedSkill.name='Marketing';
                               
                httpBackend.whenPOST(endPointUrl+'/skills/add',{
                    id:EditComponent.selectedSkill.id,
                    level:1,
                    skillName:EditComponent.selectedSkill.name,
                    userName:'testName'}
                ).respond(null);
               
                                                             
               let addUsertoSkillPromise=EditComponent.addUsertoSkill({userName:'testName'},10);     
                 
                  expect(EditComponent.toggleUserItem).to.have.property('item',10);
                    
                 addUsertoSkillPromise.then(response=>{
                       
                       expect(true).to.equal(response); 
                       expect(EditComponent.toggleUserItem.item).to.equal(-1);
                       expect(EditComponent.message).to.eql({show:true,type:'success',text:'User Added Sucessfully'});          
                       
                 });
                   
                httpBackend.flush();  
                    
                    
           });
    });
    
        describe('#deleteUserfromSkill',()=>{
        
           it('=> should return object when delete',()=>{
               
                EditComponent.selectedSkill.name='Marketing';
                             
                               
                httpBackend.whenPOST(endPointUrl+'/skills/delete',{
                    skillName:EditComponent.selectedSkill.name,
                    userName:'testName'}
                ).respond(204,'');
               
               httpBackend.expectGET(endPointUrl).respond({});
                                                             
               let deleteUserfromSkillPromise=EditComponent.deleteUserfromSkill({userName:'testName'},8);     
                 
               expect(EditComponent.toggleUserNameItem).to.equal(8);
                  
                    
               deleteUserfromSkillPromise.then(response=>{
                       
    
                       expect(response.statusCode).to.equal(204);
                       expect(EditComponent.toggleUserNameItem).to.equal(-1);                 
                       expect(EditComponent.showPanelInfo).to.equal(false);
                       
    
                       expect(EditComponent.message).to.eql({show:true,type:'success',text:'User Removed Sucessfully'});          
                       
               });
                   
              httpBackend.flush();                
                    
           });
    });
    
    
  
});

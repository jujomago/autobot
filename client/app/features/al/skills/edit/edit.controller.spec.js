'use strict';

describe('Component: al.skills.edit', function () {

    // load the controller's module
    beforeEach(module('fakiyaMainApp'));

    var EditComponent, scope, httpBackend;
    var state, timeout, skillService, userService, endPointUrl;

    // Initialize the controller and a mock scope
    beforeEach(inject(function ($componentController, $rootScope, $httpBackend, $state, $timeout, _SkillsService_, _UsersService_, appConfig) {
        scope = $rootScope.$new();
        httpBackend = $httpBackend;
        state = $state;
        timeout = $timeout;
        skillService = _SkillsService_;
        userService = _UsersService_;

        if (appConfig.apiUri) {
            endPointUrl = appConfig.apiUri + '/f9/users';
        }

        EditComponent = $componentController('al.skills.edit', {
            $scope: scope,
            $stateParams: { name: 'xxxy' },
            $state: state,
            $timeout: timeout,
            SkillService: skillService,
            UserService: userService
        });

        httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingRequest();
    });


    describe('#showUserInfo', () => {
        it('=> should return a valid user', function () {
            httpBackend.whenGET(endPointUrl + '/enrique').respond({
                return: [
                    {
                        'active': true,
                        'canChangePassword': false,
                        'EMail': 'enrique@ortuno.net',
                        'extension': 2907,
                        'firstName': 'One person more',
                        'fullName': 'Supervisor East',
                        'IEXScheduled': false,
                        'id': '2381456',
                        'lastName': 'East',
                        'mustChangePassword': false,
                        'startDate': '2016-01-11T06:00:00.000Z',
                        'userName': 'Sup_East'
                    }]
            });

            EditComponent.showUserInfo('enrique', 1).then(r => {
                expect(EditComponent.toggleUsernameLink).to.equal(1);
                expect(r.EMail).to.equal('enrique@ortuno.net');
            });
            httpBackend.flush();
        });
        it('=> cant return UserInfo,error 500', function () {
            httpBackend.whenGET(endPointUrl + '/enrique').respond(500,'Some error from Server');

            EditComponent.showUserInfo('enrique', 1).then(r => {
                expect(EditComponent.toggleUsernameLink).to.equal(1);
                //console.log (EditComponent.DetailUser);
                expect(r.data).to.equal(null);
                expect(r.errorMessage).to.equal('Some error from Server');
                expect(EditComponent.message).to.eql({show:true,type:'danger',text: r.errorMessage});
            });
            httpBackend.flush();
        });
    });

    describe('#addUsertoSkill', () => {

        it('=> should return true when added', () => {
            EditComponent.selectedSkill.id = 3;
            EditComponent.selectedSkill.name = 'Marketing';

            httpBackend.whenPOST(endPointUrl + '/testName/skills', {
                id: EditComponent.selectedSkill.id,
                level: 1,
                skillName: EditComponent.selectedSkill.name,
                userName: 'testName'
            }
            ).respond(201);

            let addUsertoSkillPromise = EditComponent.addUsertoSkill({ userName: 'testName' }, 10);

            expect(EditComponent.toggleUserItem).to.have.property('item', 10);

            addUsertoSkillPromise.then(response => {
                expect(true).to.equal(response);
                expect(EditComponent.toggleUserItem.item).to.equal(-1);

                expect(EditComponent.message).to.eql({ show: true, type: 'success', text: 'User Added Successfully', expires: 2000 });

            });

            httpBackend.flush();
        });

        it('=> should return message when status error occurs ', () => {
            EditComponent.selectedSkill.id = 3;
            EditComponent.selectedSkill.name = 'Marketing';

            httpBackend.whenPOST(endPointUrl + '/testName/skills', {
                id: EditComponent.selectedSkill.id,
                level: 1,
                skillName: EditComponent.selectedSkill.name,
                userName: 'testName'            }
            ).respond(301,{
                error: 'Server Error'
            });

            let addUsertoSkillPromise = EditComponent.addUsertoSkill({ userName: 'testName' }, 10);

            expect(EditComponent.toggleUserItem).to.have.property('item', 10);

            addUsertoSkillPromise.then(() => {
                expect(EditComponent.message.show).to.equal(true);
                expect(EditComponent.message.type).to.equal('danger');
                expect(EditComponent.message.text).to.equal('Server Error');
            });

            httpBackend.flush();
        });


        it('=> should return false when status 200 and data is not null ', () => {
            EditComponent.selectedSkill.id = 3;
            EditComponent.selectedSkill.name = 'Marketing';

            httpBackend.whenPOST(endPointUrl + '/testName/skills', {
                id: EditComponent.selectedSkill.id,
                level: 1,
                skillName: EditComponent.selectedSkill.name,
                userName: 'testName'            }
            ).respond(200,'some data');

            let addUsertoSkillPromise = EditComponent.addUsertoSkill({ userName: 'testName' }, 7);

            expect(EditComponent.toggleUserItem).to.have.property('item', 7);

            addUsertoSkillPromise.then(response => {
                expect(false).to.equal(response);
                expect(EditComponent.toggleUserItem.item).to.equal(7);
                expect(EditComponent.message.show).to.equal(false);
            });

            httpBackend.flush();
        });
    });


        describe('#deleteUserfromSkill',()=>{

            it('=> should return object when delete',()=>{

                    EditComponent.selectedSkill.name='Marketing';


                httpBackend.whenDELETE(endPointUrl+'/testName/skills').respond(204,'');


                    httpBackend.expectGET(endPointUrl).respond({});


                let deleteUserfromSkillPromise=EditComponent.deleteUserfromSkill({userName:'testName'},8);

                expect(EditComponent.toggleUserNameItem).to.equal(8);


                deleteUserfromSkillPromise.then(response=>{
                        expect(response.statusCode).to.equal(204);
                        expect(EditComponent.toggleUserNameItem).to.equal(-1);
                        expect(EditComponent.showPanelInfo).to.equal(false);
                        expect(EditComponent.message).to.eql({show:true,type:'success',text:'User Removed Successfully',expires:2000});        
                });
                    
                httpBackend.flush();                
                        
            });
            it('=> Cant delete a User from Skill, error 500',()=>{
               
               EditComponent.selectedSkill.name='Marketing';
            
               httpBackend.whenDELETE(endPointUrl+'/testName/skills').respond(500,'Some error from Server');
                
              let deleteUserfromSkillPromise=EditComponent.deleteUserfromSkill({userName:'testName'},8);     
                    
                expect(EditComponent.toggleUserNameItem).to.equal(8);                    
                        
                deleteUserfromSkillPromise.then(response=>{    
                        expect(response.statusCode).to.equal(500);
                        expect(EditComponent.showPanelInfo).to.equal(false);
                        expect(response.errorMessage).to.equal('Some error from Server');
                        expect(EditComponent.message).to.eql({show:true,type:'danger',text:response.errorMessage});
                });

                httpBackend.flush();

            });
      });


    describe('#listUsers',()=>{
          it('should list users ',()=>{
            expect(EditComponent.filteredUsers).to.have.lengthOf(0);
            

           httpBackend.whenGET(endPointUrl).respond(200,{
            return: [
                    {
                    EMail : 'pruedi@five9.com',
                    IEXScheduled : false,
                    active : true,
                    canChangePassword : false,
                    extension : 0,
                    firstName : '',
                    fullName : 'Enterprise9', 
                    id : '1580174', 
                    lastName : 'Enterprise9', 
                    mustChangePassword : false, 
                    osLogin : '', 
                    userName : 'Enterprise9'
                    },
                    {
                    EMail:'bruedi@enterprise9.com',
                    IEXScheduled:false,
                    active:true,
                    canChangePassword:true,
                    extension: 1,
                    firstName : 'Britt',
                    fullName : 'Britt Ruedi',
                    id : '2239008',
                    lastName : 'Ruedi',
                    mustChangePassword : false,
                    startDate : '2015-03-17T07:00:00.000Z',
                    userName : 'bruedi@enterprise9.com'
                    }
            ]            
           });

            EditComponent.listUsers()
            .then(response => {         
                expect(response.statusCode).to.equal(200);
                expect(response.errorMessage).to.equal('');
                expect(response.data).to.be.an.instanceOf(Array);
                expect(response.data).to.have.lengthOf(2);
                expect(EditComponent.userslist).to.equal(response.data);
          });

            httpBackend.flush();
          });

          it('shoul not list users, error 500 ',()=>{
            expect(EditComponent.filteredUsers).to.have.lengthOf(0);            

           httpBackend.whenGET(endPointUrl).respond(500,'Some error from server');

            EditComponent.listUsers()
            .then(response => {
                expect(response.statusCode).to.equal(500);               
                expect(response.errorMessage).to.equal('Some error from server');
                expect(EditComponent.message).to.eql({show:true,type:'danger',text: response.errorMessage});
          });

            httpBackend.flush();
          });



      });


      describe('#filterUsersBounded',()=>{
        
          it('Should not filter nothing if there is no users selected',()=>{
            
            let rawUserList=[
                    {
                    EMail : 'pruedi@five9.com',
                    IEXScheduled : false,
                    active : true,
                    canChangePassword : false,
                    extension : 0,
                    firstName : '',
                    fullName : 'Enterprise9', 
                    id : '1580174', 
                    lastName : 'Enterprise9', 
                    mustChangePassword : false, 
                    osLogin : '', 
                    userName : 'Enterprise9'
                    },
                    {
                    EMail:'bruedi@enterprise9.com',
                    IEXScheduled:false,
                    active:true,
                    canChangePassword:true,
                    extension: 1,
                    firstName : 'Britt',
                    fullName : 'Britt Ruedi',
                    id : '2239008',
                    lastName : 'Ruedi',
                    mustChangePassword : false,
                    startDate : '2015-03-17T07:00:00.000Z',
                    userName : 'bruedi@enterprise9.com'
                    }
            ];
            EditComponent.UsersNamesSkills=[];
            EditComponent.filterUsersBounded(rawUserList);
            expect(EditComponent.filteredUsers).to.eql(rawUserList);
            
          });
      });
});

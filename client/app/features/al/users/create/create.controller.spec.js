'use strict';

describe('Component: al.users.create', function() {

    // load the controller's module
    beforeEach(module('fakiyaMainApp'));

    var CreateComponent, scope;
    var state, sessionStorage, userService, endPointUrl;
    var q, httpBackend;

    // Initialize the controller and a mock scope

    beforeEach(inject(function($componentController, $rootScope, $state, $sessionStorage, $q, $httpBackend, _UsersService_,appConfig) {
        scope = $rootScope.$new();
        state = $state;
        sessionStorage = $sessionStorage;
        userService = _UsersService_;
        q = $q;
        httpBackend = $httpBackend;
        
        
        if(appConfig.apiUri){
             endPointUrl=appConfig.apiUri+'/f9/users';
        }
     

        CreateComponent = $componentController('al.users.create', {
            $scope: scope,
            $state: state,
            $sessionStorage: sessionStorage,
            $q: q,
            UserService: userService
        });

         httpBackend.whenGET(url=>(url.indexOf('.html') !== -1)).respond(200);
         httpBackend.whenGET(appConfig.apiUri+'/f9/lists/%$&unexisting_list)(*&^%^').respond(200);
  
    }));

    afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('#addRol', () => {

        it('Check Rol to Add is Real', () => {
            // roles just could be ['Agent', 'Supervisor', 'Admin','Reporting'];
            expect(CreateComponent.addRol('SomeRol'), 'The Rol "SomeRol" does not exist').to.equal(false);
            expect(CreateComponent.addRol('Reporting')).to.equal(true);
            expect(CreateComponent.userRoles).to.have.lengthOf(2);
        });


        it('check duplicated Rols', () => {
            expect(true).to.equal(CreateComponent.addRol('Reporting'));
            expect(false, 'Duplicated Value "Reporting" should be false').to.equal(CreateComponent.addRol('Reporting'));
            expect(true).to.equal(CreateComponent.addRol('Supervisor'));
            expect(false, 'Duplicated Value "Supervisor" should be false').to.equal(CreateComponent.addRol('Supervisor'));
            expect(CreateComponent.userRoles).to.have.lengthOf(3);
        });

    });


    describe('#deleteSelectedRol', () => {

        it('check Rol (Index) to Delete is Real', () => {

            CreateComponent.addRol('Supervisor');
            CreateComponent.addRol('Agent');
            
            expect(CreateComponent.userRoles).to.have.lengthOf(2);


            // userRolSelectedIndex is the index of the UI List, the secondd list 'ASSIGNED ROLES'
            CreateComponent.userRolSelectedIndex = 5;
            expect(false).to.equal(CreateComponent.deleteSelectedRol());

            CreateComponent.userRolSelectedIndex = 1;
            expect(true).to.equal(CreateComponent.deleteSelectedRol());

            expect(CreateComponent.userRoles).to.have.lengthOf(1);
            CreateComponent.userRolSelectedIndex = -1;
            expect(false).to.equal(CreateComponent.deleteSelectedRol());
            expect(CreateComponent.userRoles).to.have.lengthOf(1);

            CreateComponent.userRolSelectedIndex = 25;
            expect(false).to.equal(CreateComponent.deleteSelectedRol());
            expect(CreateComponent.userRoles).to.have.lengthOf(1);
        });

    });


    describe('#getPermissions', () => {

        it('Check Rol does not exists ', () => {
            expect(false).to.equal(CreateComponent.getPermissions('UnexistentRol'));
            expect(true).to.equal(CreateComponent.getPermissions('Agent'));
        });

        it('Check Role data loaded', () => {
            httpBackend.whenGET('/assets/al/json/roles.json').respond({
                'admin': {
                    'permissions': [
                        { 'type': 'ReceiveTransfer', 'value': false },
                        { 'type': 'MakeRecordings', 'value': false },
                        { 'type': 'CreateChatSessions', 'value': false }
                    ]
                },
                'agent': {
                    'alwaysRecorded': false,
                    'attachVmToEmail': false,
                    'sendEmailOnVm': false,
                    'permissions': [
                        { 'type': 'ReceiveTransfer', 'value': false },
                        { 'type': 'MakeRecordings', 'value': false },
                        { 'type': 'CreateChatSessions', 'value': false }
                    ]
                },
                'reporting': {
                    'permissions': [
                        { 'type': 'CanAccessRecordingsColumn', 'value': true },
                        { 'type': 'CanViewCannedReports', 'value': false }
                    ]
                },
                'supervisor': {
                    'permissions': [
                        { 'type': 'CampaignManagementStop', 'value': false },
                        { 'type': 'CampaignManagementStart', 'value': false }
                    ]
                }

            });


            // using chai as promised        
            let onInitPromise = CreateComponent.$onInit();

            //check predefined roles
            expect(onInitPromise).to.eventually.have.property('admin');
            expect(onInitPromise).to.eventually.have.property('agent');
            expect(onInitPromise).to.eventually.have.property('reporting');
            expect(onInitPromise).to.eventually.have.property('supervisor');

            expect(onInitPromise).to.eventually.have.deep.property('agent.attachVmToEmail');

            expect(onInitPromise).to.eventually.have.deep.property('admin.permissions').that.is.an('array').to.have.length.above(0);
            expect(onInitPromise).to.eventually.have.deep.property('supervisor.permissions').that.is.an('array').to.have.length.above(0);
            expect(onInitPromise).to.eventually.have.deep.property('agent.permissions').that.is.an('array').to.have.length.above(0);
            expect(onInitPromise).to.eventually.have.deep.property('reporting.permissions').that.is.an('array').to.have.length.above(0);

            httpBackend.flush();



        });

    });


    describe('#save', () => {

        it('check save user without rol selected', () => {
            CreateComponent.userRoles = [];     
            
            CreateComponent.save().then(r => {
                expect(r, 'you must select at least rol to save').to.equal(null);
            });

        });


        it('#save with good data', () => {

            CreateComponent.allRoles = ['admin', 'reporting']; // roles unselected in UI   
            CreateComponent.userRoles = ['agent', 'supervisor'];  // roles selected in UI, to atatch newUser

            CreateComponent.newUser = {
                active: true,
                canChangePassword: true,
                EMail: 'pflores@flores.com',
                extension: 2323,
                firstName: 'Pedro 2',
                fullName: 'Pedro 2 Flores 2',
                lastName: 'Flores 2',
                mustChangePassword: false,
                userName: 'pflores3'
            };

            CreateComponent.storage.rolesPermissions = {
                'agent': {
                    'alwaysRecorded': false,
                    'attachVmToEmail': false,
                    'sendEmailOnVm': false,
                    'permissions': [
                        { 'type': 'ReceiveTransfer', 'value': false },
                        { 'type': 'MakeRecordings', 'value': false },
                        { 'type': 'CreateChatSessions', 'value': false }
                    ]
                },
                'supervisor': {
                    'permissions': [
                        { 'type': 'CampaignManagementStop', 'value': false },
                        { 'type': 'CampaignManagementStart', 'value': false }
                    ]
                }
            };


            httpBackend.whenPOST(endPointUrl, {
                userInfo: {
                    generalInfo: CreateComponent.newUser,
                    roles: CreateComponent.storage.rolesPermissions
                }
            }).respond({
                return:
                {
                    generalInfo:
                    {
                        active: true,
                        canChangePassword: true,
                        EMail: 'pflores@flores.com',
                        extension: 2323,
                        firstName: 'Pedro 2',
                        fullName: 'Pedro 2 Flores 2',
                        IEXScheduled: false,
                        id: '2433507',
                        lastName: 'Flores 2',
                        mustChangePassword: false,
                        startDate: 'Tue Apr 26 2016 16:47:35 GMT-0400 (BOT)',
                        userName: 'pflores3'
                    },
                    roles: {
                        supervisor:
                        {
                            permissions:
                            [
                                { type: 'ReceiveTransfer', value: false },
                                { type: 'MakeRecordings', value: false },
                                { type: 'CreateChatSessions', value: false },
                                { type: 'SendMessages', value: false }
                            ]
                        },
                        agent:
                        {
                            alwaysRecorded: false,
                            attachVmToEmail: false,
                            sendEmailOnVm: false,
                            permissions: [
                                { type: 'ReceiveTransfer', value: false },
                                { type: 'MakeRecordings', value: false },
                                { type: 'CreateChatSessions', value: false },
                                { type: 'SendMessages', value: false },
                                { type: 'MakeTransferToSkills', value: false },
                                { type: 'MakeTransferToAgents', value: false },
                                { type: 'TrainingMode', value: false },
                                { type: 'CreateConferenceWithSkills', value: false }
                            ]
                        }
                    }

                }
            });


            expect(CreateComponent.showWarningRolMessage).to.equal(false);
            expect(CreateComponent.SubmitText).to.equal('Save');

            let savePromise = CreateComponent.save();

            expect(CreateComponent.SubmitText).to.equal('Saving...');

            savePromise.then(r => {

                expect(r).to.have.deep.property('generalInfo');
                expect(r).to.have.deep.property('roles');

                expect(r).to.have.deep.property('generalInfo.id');
                expect(r).to.have.deep.property('generalInfo.IEXScheduled');

                // response just should include the roles whe sended in the request
                expect(r).to.have.deep.property('roles.agent');
                expect(r).to.have.deep.property('roles.supervisor');

                expect(r).to.not.have.deep.property('roles.admin');
                expect(r).to.not.have.deep.property('roles.reporting');

                expect(Object.keys(CreateComponent.newUser)).to.have.lengthOf(0);                              

            });

            httpBackend.flush();
        });

        it('#save that produces error', () => {

            CreateComponent.allRoles = ['admin', 'reporting', 'agent']; // roles unselected in UI   
            CreateComponent.userRoles = ['supervisor'];  // roles selected in UI, to atatch newUser

            CreateComponent.newUser = {
                active: true,
                canChangePassword: false,
                EMail: 'pflores@flores.com',
                extension: 2323,
                firstName: 'Pedro 2',
                fullName: 'Pedro 2 Flores 2',
                lastName: 'Flores 2',
                mustChangePassword: false,
                userName: 'flo'
            };

            CreateComponent.storage.rolesPermissions = {
                'supervisor': {
                    'permissions': [
                        { 'type': 'CampaignManagementStop', 'value': false },
                        { 'type': 'CampaignManagementStart', 'value': false }
                    ]
                }
            };

            httpBackend.whenPOST(endPointUrl, {
                userInfo: {
                    generalInfo: CreateComponent.newUser,
                    roles: CreateComponent.storage.rolesPermissions
                }
            }).respond({
                response: { statusCode: 500 },
                body: 'the error message...'
            }
                );

            expect(CreateComponent.showWarningRolMessage).to.equal(false);
            expect(CreateComponent.SubmitText).to.equal('Save');


            let savePromise = CreateComponent.save();

            expect(CreateComponent.SubmitText).to.equal('Saving...');

            savePromise.then(r => {
                expect(r).to.equal(null);
                expect(CreateComponent.SubmitText).to.equal('Save');
                expect(CreateComponent.message.show).to.equal(true);
                expect(CreateComponent.message.text).to.not.equal('');
            });
            httpBackend.flush();

        });



    });


});

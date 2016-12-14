'use strict';

describe('Service: UsersService', function () {

    // load the service's module
    beforeEach(module('fakiyaMainApp'));

    // instantiate service
    var UsersService, httpBackend;
    var endPointUrl;


    beforeEach(inject(function (_UsersService_, $httpBackend, appConfig) {
        UsersService = _UsersService_;
        httpBackend = $httpBackend;
        if(appConfig.apiUri){
             endPointUrl=appConfig.apiUri+'/f9/admin/users';
        }
    }));

    afterEach(function () {
        httpBackend.verifyNoOutstandingRequest();
    });

    describe('#getUsers', () => {
        it('should return users', function () {
            httpBackend.whenGET(endPointUrl).respond({
                return: [{ 'test': '', 'test2': '266184', 'messageOfTheDay': '', 'name': 'Sales', 'routeVoiceMails': false },
                    { 'test': '', 'id': 'test2', 'messageOfTheDay': '', 'name': 'CustomerService', 'routeVoiceMails': false },
                    { 'test': '', 'id': 'test2', 'messageOfTheDay': '', 'name': 'Marketing', 'routeVoiceMails': true },
                    { 'test': '', 'id': 'test2', 'messageOfTheDay': '', 'name': 'Marketing', 'routeVoiceMails': true }]
            });


            UsersService.getUsers().then(users => {
                expect(null).to.not.equal(users);
                expect(undefined).to.not.equal(users);
                users.should.not.be.instanceOf(String);
                expect(undefined).to.not.equal(users.data);
                expect(4).to.equal(users.data.length);
                expect(200).to.equal(users.statusCode);
                expect(0).to.equal(users.errorMessage.length);
            });
            httpBackend.flush();
        });
    });

    describe('#getUser', () => {
        it('should return a User', function () {
            let username='nelson2@autoboxcorp.com';
            httpBackend.whenGET(endPointUrl+'/'+username).respond(200,{
                return: [
                    {
                    'active': true,
                    'canChangePassword': true,
                    'EMail': 'nelson2@autoboxcorp.com',
                    'extension': 10,
                    'firstName': 'Nelson',
                    'fullName': 'Nelson Araoz',
                    'IEXScheduled': false,
                    'id': '2546070',
                    'lastName': 'Araoz',
                    'mustChangePassword': false,
                    'startDate': '2016-10-17T07:00:00.000Z',
                    'userName': 'nelson2@autoboxcorp.com'
                    }
                ]
            });


            UsersService.getUser(username).then(response => {
                expect(response.userName).to.equal(username);
                expect(response).to.have.property('EMail');
                expect(response).to.have.property('id');
                expect(response).to.have.property('fullName');              
            });
            httpBackend.flush();
        });

        it('should return an error', function () {
            let username='nelson2@autoboxcorp.com';
            httpBackend.whenGET(endPointUrl+'/'+username).respond(500,'some error from server');


            UsersService.getUser(username)
            .then(null)
            .catch(error=>{                
                expect(error.data).to.equal(null);
                expect(error.statusCode).to.equal(500);
                expect(error.errorMessage).to.equal('some error from server');
            });
            httpBackend.flush();
        });
    });


    describe('#createUser', () => {
        it('should create a new User', function () {
            let userInfo={
                generalInfo:{
                    EMail : 'jalguien@ada.com',
                    active : true,
                    canChangePassword : true,
                    extension : '2346',
                    firstName : 'Test User',
                    lastName : 'ffff',
                    mustChangePassword : true,
                    password : '555666',
                    serName : 'testuser889'
                },
                roles:{
                    agent:{
                        permissions:[
                            {type : 'ReceiveTransfer', value : false},
                            {type : 'MakeTransferToSkills', value : false}
                        ]
                    }
                }
            };

            httpBackend.whenPOST(endPointUrl,userInfo).respond(201,{
                return: userInfo
            });

            UsersService.createUser(userInfo)
            .then(response => {
                expect(response.errorMessage).to.equal('');
                expect(response.data).to.have.property('generalInfo');
                expect(response.data).to.have.property('roles');
                expect(response.data.generalInfo).to.have.property('EMail');
                expect(response.data.generalInfo).to.have.property('firstName');
                expect(response.data.generalInfo).to.have.property('active');              
            });
            httpBackend.flush();
        });

       it('should return an error when create User', function () {

              let userInfo={
                generalInfo:{
                    EMail : 'jalguien@ada.com',
                    active : true,
                    canChangePassword : true,
                    extension : '2346',
                    firstName : 'Test User',
                    lastName : 'ffff',
                    mustChangePassword : true,
                    password : '555666',
                    userName : 'testuser889'
                },
                roles:{
                    agent:{
                        permissions:[
                            {type : 'ReceiveTransfer', value : false},
                            {type : 'MakeTransferToSkills', value : false}
                        ]
                    }
                }
            };

            httpBackend.whenPOST(endPointUrl,userInfo).respond(500,'javax.ejb.CreateException: The name testuser is already in use, please choose something else.');
            UsersService.createUser(userInfo)
            .then(null)
            .catch(error=>{                
                expect(error.data).to.equal(null);
                expect(error.statusCode).to.equal(500);
                expect(error.errorMessage).to.equal('javax.ejb.CreateException: The name testuser is already in use, please choose something else.');
            });
            httpBackend.flush();
        });
    });

    describe('#updateUser', () => {
        it('should upate a User', function () {
            let userInfo={
                userGeneralInfo:{
                    EMail : 'jalguien@ada.com',
                    active : true,
                    canChangePassword : true,
                    extension : '2346',
                    firstName : 'Test User',
                    lastName : 'ffff',
                    mustChangePassword : true,
                    password : '555666',
                    userName : 'testuser889'
                },
                rolesToSet:{
                    agent:{
                        permissions:[
                            {type : 'ReceiveTransfer', value : false},
                            {type : 'MakeTransferToSkills', value : false}
                        ]
                    }
                }
            };

            httpBackend.whenPUT(endPointUrl+'/'+userInfo.userGeneralInfo.userName,userInfo).respond(200,{
                return: {
                    generalInfo:{
                        EMail : 'jalguien@ada.com',
                        active : true,
                        canChangePassword : true,
                        extension : '2346',
                        firstName : 'Test User',
                        lastName : 'ffff',
                        mustChangePassword : true,
                        password : '555666',
                        userName : 'testuser889'
                    },
                    roles:{
                        agent:{
                            permissions:[
                                {type : 'ReceiveTransfer', value : false},
                                {type : 'MakeTransferToSkills', value : false}
                            ]
                        }
                    }
                }
            });

            UsersService.updateUser(userInfo)
            .then(response => {             
                expect(response.errorMessage).to.equal('');
                expect(response.data).to.have.property('generalInfo');
                expect(response.data).to.have.property('roles');
                expect(response.data.generalInfo).to.have.property('EMail');
                expect(response.data.generalInfo).to.have.property('firstName');
                expect(response.data.generalInfo).to.have.property('active');         
            });
            httpBackend.flush();
        });
    });

     describe('#getPermissions', () => {
        it('should return all persmissions', function () {
            httpBackend.whenGET('/assets/al/json/roles.json').respond(200,{
                reporting:{
                    permissions:[
                            {type : 'ReceiveTransfer', value : false},
                            {type : 'MakeTransferToSkills', value : false}
                    ]
                },
                agent:{
                    permissions:[
                        {type : 'ReceiveTransfer', value : false},
                        {type : 'MakeTransferToSkills', value : false}
                    ]
                },
                supervisor:{
                    permissions:[
                        {type : 'ReceiveTransfer', value : false},
                        {type : 'MakeTransferToSkills', value : false}
                    ]
                },
                admin:{
                    permissions:[
                        {type : 'ReceiveTransfer', value : false},
                        {type : 'MakeTransferToSkills', value : false}
                    ]
                }
            });
            UsersService.getPermissions()
            .then(response => {           
                expect(response).to.have.property('reporting');
                expect(response).to.have.property('admin');
                expect(response).to.have.property('reporting');
                expect(response).to.have.property('admin');
                expect(response).to.have.deep.property('reporting.permissions');
                expect(response).to.have.deep.property('admin.permissions');
                expect(response).to.have.deep.property('reporting.permissions');
                expect(response).to.have.deep.property('admin.permissions');
            });
            httpBackend.flush();
        });
    });

    describe('#getUserDetail', () => {
        it('should return user detail', function () {
            httpBackend.whenGET(endPointUrl + '/detail/josue@autoboxcorp.com').respond({
                'return': [
                    {
                        'agentGroups': [
                            'Eastern Region',
                            'All'
                        ],
                        'generalInfo': {
                            'active': true,
                            'canChangePassword': true,
                            'EMail': 'josue@autoboxcorp.com',
                            'extension': 49,
                            'firstName': 'Josue',
                            'fullName': 'Josue M',
                            'IEXScheduled': false,
                            'id': '2435880',
                            'lastName': 'M',
                            'mustChangePassword': true,
                            'startDate': '2016-04-29T05:00:00.000Z',
                            'userName': 'josue@autoboxcorp.com'
                        },
                        'roles': {
                            'admin': {
                                'permissions': [
                                    {
                                        type: 'ManageCampaignsReset',
                                        value: true
                                    },
                                    {
                                        type: 'EditDispositions',
                                        value: true
                                    }
                                ]
                            },
                            'agent': {
                                'alwaysRecorded': false,
                                'attachVmToEmail': false,
                                'permissions': [
                                    {
                                        type: 'ReceiveTransfer',
                                        value: true
                                    },
                                    {
                                        type: 'MakeRecordings',
                                        value: true
                                    }
                                ],
                                'sendEmailOnVm': false
                            }
                        }
                    }
                ]
            });


            UsersService.getUserDetail('josue@autoboxcorp.com').then(userInfo => {
                expect(null).to.not.equal(userInfo);
                expect(userInfo).to.have.property('generalInfo');
                expect(userInfo).to.have.property('roles');
                expect(userInfo).to.have.deep.property('generalInfo.userName');
            });
            httpBackend.flush();
        });

        it('should return null, user not found', function () {

            httpBackend.whenGET(endPointUrl + '/detail/josue2@autoboxcorp.com').respond(null);

            UsersService.getUserDetail('josue2@autoboxcorp.com').then(userInfo => {
                expect(null).to.equal(userInfo);
            });
            httpBackend.flush();
        });
    });

    describe('#addSkilltoUser', () => {
        it('should add a user to skill correctly', function () {
            let requestData={
                id:3,
                level: 1,
                skillName: 'Marketing',
                userName: 'josue2@autoboxcorp.com'  
            };

            httpBackend.whenPOST(endPointUrl + '/josue2@autoboxcorp.com/skills').respond(201);

            UsersService.addSkilltoUser(requestData).then(response => {
                expect(response.data).to.equal(null);
                expect(response.statusCode).to.equal(201);

            });
            httpBackend.flush();
        });
    });


     describe('#deleteUser', () => {
        it('should delete user correctly', function () {
            httpBackend.whenDELETE(endPointUrl + '/josue2@autoboxcorp.com').respond(204,null);
            UsersService.deleteUser('josue2@autoboxcorp.com').then(response => {
                expect(response.data).to.equal(null);
                expect(response.statusCode).to.equal(204);

            });
            httpBackend.flush();
        });
    });

    describe('Skills on users', ()=>{
        it('#addSkilltoUser', function(){
            httpBackend.whenPOST(endPointUrl+'/daniel.c@autoboxcorp.com/skills', {
                userName: 'daniel.c@autoboxcorp.com',
                skillName: 'Marketing',
                level: 1
            }).respond(200, null);

            UsersService.addSkilltoUser({
              userName: 'daniel.c@autoboxcorp.com',
              skillName: 'Marketing',
              level: 1
            }).then(r=>{
              expect(r.statusCode).to.equal(200);
              expect(r.data).to.equal(null);
            });
            httpBackend.flush();
        });

        it('#deleteSkillfromUser', function(){
              let headerRequiredForDelete={'Content-Type':'application/json;charset=utf-8','Accept':'application/json, text/plain, */*','appName':''};
    
             httpBackend.when('DELETE',endPointUrl+'/daniel.c@autoboxcorp.com/skills', {
                userName: 'daniel.c@autoboxcorp.com',
                skillName: 'Marketing',
                level: 1
            },headerRequiredForDelete).respond(204, null);

            UsersService.deleteSkillfromUser({
              userName: 'daniel.c@autoboxcorp.com',
              skillName: 'Marketing',
              level: 1
            }).then(r=>{
              expect(r.statusCode).to.equal(204);
              expect(r.data).to.equal(null);
            });
            httpBackend.flush();
        });
        
        it('#updateSkillfromUser', function(){
           httpBackend.whenPUT(endPointUrl+'/daniel.c@autoboxcorp.com/skills', {
                userName: 'daniel.c@autoboxcorp.com',
                skillName: 'Marketing',
                level: 3
            }).respond(200, null);

            UsersService.updateSkillfromUser({
              userName: 'daniel.c@autoboxcorp.com',
              skillName: 'Marketing',
              level: 3
            }).then(r=>{
              expect(r.statusCode).to.equal(200);
              expect(r.data).to.equal(null);
            });
            httpBackend.flush(); 
        });
    });
});

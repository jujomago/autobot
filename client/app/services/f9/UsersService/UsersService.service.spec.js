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
             endPointUrl=appConfig.apiUri+'/f9/users';
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
});

'use strict';

describe('Component: al.users.edit', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var EditComponent, scope, _$httpBackend;
  var _SkillsService, _UsersService, endPointUrl, _ConfirmAsync, sandbox;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope, $httpBackend, $window, appConfig, UsersService, SkillsService, ConfirmAsync) {
    scope = $rootScope.$new();

    _ConfirmAsync = ConfirmAsync;
    _SkillsService = SkillsService;
    _UsersService = UsersService;
    _$httpBackend = $httpBackend;

    sandbox = sinon.sandbox.create();

    if(appConfig.apiUri){
      endPointUrl=appConfig.apiUri+'/f9';
    }

    EditComponent = $componentController('al.users.edit', {
      $scope: scope,
      _SkillsService: _SkillsService,
      _UsersService: _UsersService
    });

    _$httpBackend.whenGET(url=>(url.indexOf('.html') !== -1)).respond(200);
  }));

  afterEach(function() {
    _$httpBackend.verifyNoOutstandingRequest();
    sandbox.restore();
  });


   describe('#Check contructor Vars', () => {

        it('Check initialization of variables', () => {
       
            expect(EditComponent.message).to.eql({show:false});
            expect(EditComponent.rolSelectedPermissions).to.have.lengthOf(0);
            expect(EditComponent.allRoles).to.eql( ['admin', 'agent', 'reporting', 'supervisor']);
        });
   });

   describe('User', ()=>{

      it('=>#update user with empty roles', function(){
        EditComponent.userRoles = [];
        EditComponent.update();
        expect(EditComponent.showWarningRolMessage).to.equal(true);
      });

      it('=>#getUserDetail', function(){
        _$httpBackend.whenGET(endPointUrl+'/users/detail/'+'daniel.c@autoboxcorp.com').respond({
              return:[{
                  'generalInfo': {
                    'active': true,
                    'canChangePassword': true,
                    'EMail': 'daniel.c@autoboxcorp.com',
                    'extension': 8765,
                    'firstName': 'Daniel',
                    'fullName': 'Daniel Candia',
                    'IEXScheduled': false,
                    'id': '2489186',
                    'lastName': 'Candia',
                    'mustChangePassword': false,
                    'startDate': '2016-07-26T05:00:00.000Z',
                    'userName': 'daniel.c@autoboxcorp.com'
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
                  },
                    'skills': [
                      {
                        'id': '266184',
                        'level': 2,
                        'skillName': 'Sales',
                        'userName': 'daniel.c@autoboxcorp.com'
                      },
                      {
                        'id': '266185',
                        'level': 2,
                        'skillName': 'CustomerService',
                        'userName': 'daniel.c@autoboxcorp.com'
                      },
                      {
                        'id': '266196',
                        'level': 1,
                        'skillName': 'Authority',
                        'userName': 'daniel.c@autoboxcorp.com'
                      }
                    ]
                 }
                ]
              });
          let userName = 'daniel.c@autoboxcorp.com';
          EditComponent.getUserDetail(userName).then(userInfo => {
                expect(null).to.not.equal(userInfo);
                expect(userInfo).to.have.property('generalInfo');
                expect(userInfo).to.have.property('roles');
                expect(userInfo).to.have.deep.property('generalInfo.userName');
                expect(userInfo).to.have.property('skills');
          });
        _$httpBackend.flush();  
      });
   });

   describe('User Skills',()=>{

      it('=>getAllSkills should return a lists of skills', function(){
        _$httpBackend.whenGET(endPointUrl+'/skills').respond({
              return:[
                  {
                  'description': '',
                  'id': '266184',
                  'messageOfTheDay': '',
                  'name': 'Sales',
                  'routeVoiceMails': false
                  },
                  {
                  'description': '',
                  'id': '266185',
                  'messageOfTheDay': '',
                  'name': 'CustomerService',
                  'routeVoiceMails': false
                  }
                ]
              });
          EditComponent.getAllSkills().then(r=>{
              expect(r).to.not.equal(null);
          });
        _$httpBackend.flush();  
      });

      it('=>#getUserDetailSkill should return a user detailed data', function() {
           _$httpBackend.whenGET(endPointUrl+'/users/detail/'+'daniel.c@autoboxcorp.com').respond({
              return:[
                  {generalInfo: {
                    active: true,
                    canChangePassword: false,
                    EMail: 'daniel.c@autoboxcorp.com',
                    extension: 8765,
                    firstName: 'Daniel',
                    fullName: 'Daniel Candia',
                    IEXScheduled: false,
                    id: '2489186',
                    lastName: 'Candia',
                    mustChangePassword: false,
                    startDate: '2016-07-26T05:00:00.000Z',
                    userName: 'daniel.c@autoboxcorp.com'
                  }}]
              });
          EditComponent.userInfo = {skills: []};
          EditComponent.getUserDetailSkill('daniel.c@autoboxcorp.com').then(r=>{
              expect(EditComponent.found).to.equal(true);
              expect(r.generalInfo.userName).to.equal('daniel.c@autoboxcorp.com');
          });
        _$httpBackend.flush();
      });

      it('=>#addSkillToUser adds a skill to user', function() {
          _$httpBackend.whenPOST(endPointUrl + '/users/skills/add', {
            userName: 'daniel.c@autoboxcorp.com',
            skillName: 'Marketing',
            level: 1
          }).respond(null);
          EditComponent.addSkillToUser({
              userName: 'daniel.c@autoboxcorp.com',
              skillName: 'Marketing',
              level: 1
           }).then(r=>{
              expect(r.statusCode).to.equal(200);
              expect(r.data).to.equal(null);
          });
        _$httpBackend.flush();
      });

      it('=>#addSkillToUser returns a error 500', function() {
          _$httpBackend.whenPOST(endPointUrl + '/users/skills/add').respond(500,{
                statusCode: 500,
                from: 'error from controller endpoint',
                body: '<faultstring>Value 0 of "UserSkill.level" is out of range [1 - 10]</faultstring>'
            }
          );
          EditComponent.addSkillToUser({userName: ''}).then(r=>{
              let textError = 'Value 0 of "UserSkill.level" is out of range [1 - 10]';
              expect(r.data.statusCode).to.equal(500);
              expect(EditComponent.message).to.eql({ show: true, type: 'warning', text: textError, expires: 5000});
          });
        _$httpBackend.flush();
      });

      it('=>#deleteSkillFromUser delete should return 204 statusCode', function() {
          EditComponent.userSkills = [{
            id: '266184', 
            level: 1,
            skillName: 'Sales', 
            userName: 'daniel.c@autoboxcorp.com'
          }];

          _$httpBackend.whenPOST(endPointUrl + '/users/skills/delete').respond(204, null);

          sandbox.stub(window, 'confirm').returns(true);
          
          EditComponent.deleteSkillFromUser({
            id: '266184', 
            level: 1,
            skillName: 'Sales', 
            userName: 'daniel.c@autoboxcorp.com'
          }, 1).then(r=>{
              expect(r.statusCode).to.equal(204);
              expect(r.data).to.equal(null);
              expect(EditComponent.toggleSkillRow).to.equal(-1);
              expect(EditComponent.message).to.eql({ show: true, type: 'success', text: 'Skill Deleted', expires:3000 });          
          });
        expect(window.confirm.calledOnce).to.equal(true);
        _$httpBackend.flush();
      });


      it('=>#deleteSkillFromUser delete should return 500 statusCode', function() {
          EditComponent.userSkills = [{
            id: '266184', 
            level: 1,
            skillName: 'Sales',
            userName: 'daniel.c@autoboxcorp.com'
          }];

          _$httpBackend.whenPOST(endPointUrl + '/users/skills/delete').respond(500,{
                statusCode: 500,
                from: 'error from controller endpoint',
                body: '<faultstring>Skill "null" doesn&apos;t exist.</faultstring>'
            });

          sandbox.stub(window, 'confirm').returns(true);
          
          EditComponent.deleteSkillFromUser({
            id: '266184', 
            level: 1,
            userName: 'daniel.c@autoboxcorp.com'
          }, 1).then(r=>{
              expect(r.data.statusCode).to.equal(500);
          });
        expect(window.confirm.calledOnce).to.equal(true);
        _$httpBackend.flush();
      });


  });

});
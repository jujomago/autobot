'use strict';

describe('Component: al.campaigns.edit.autodial', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var AutodialComponent, scope ,endPointUrl , httpBackend;
  let mockState;
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope,  $httpBackend, appConfig) {
    scope = $rootScope.$new();
      httpBackend = $httpBackend;

    if(appConfig.apiUri){
       endPointUrl=appConfig.apiUri+'/f9/campaigns';
    }
    mockState = {
        go: function(state, params){
          this.state = state;
          this.params = params;
        }
      };
    AutodialComponent = $componentController('al.campaigns.edit.autodial', {
      $scope: scope,
      $state: mockState
    });



httpBackend.whenGET(url=>(url.indexOf('.html') !== -1)).respond(200);

  }));

  afterEach(function() {
     httpBackend.verifyNoOutstandingRequest();
  });

  describe('#getIVRScripts', () => {
    it('=> should return array of ivrscripts', () => {
      httpBackend.whenGET(endPointUrl+'/ivrscripts').respond({
        return: [
          {
            'description': 'Main Script',
            'name': 'Main Script',
            'xmlDefinition': '...'
          },
          {
            'description': 'Option 2',
            'name': 'Main.MakeMoney',
            'xmlDefinition': '...'
          },
          {
            'description': 'Option 1',
            'name': 'Main.WhoTo',
            'xmlDefinition': '...'
          }]
      });

      AutodialComponent.getIVRScripts()
        .then(response => {
          expect(response).to.be.property('statusCode');
          expect(response.statusCode).to.equal(200);
          expect(response.data).to.be.an.instanceof(Array);
          expect(response.data).to.be.have.lengthOf(3);
          expect(response.data[0]).to.have.deep.property('name');
          expect(response.data[1]).to.have.deep.property('xmlDefinition');
        });
      httpBackend.flush();
    });

    it('=> should return error with statusCode 401', () => {
      httpBackend.whenGET(endPointUrl+'/ivrscripts').respond(401, {
        statusCode: 401,
        from: 'error from controller endpoint',
        body: 'the explicit error'
      });

        AutodialComponent.getIVRScripts()
        .then(response => {
            expect(response).to.be.property('statusCode');
            expect(response.statusCode).to.not.equal(200);
            expect(response.statusCode).to.equal(401);
            expect(response.data).to.equal(null);
            expect(response.errorMessage).to.not.equal(null);
            expect(AutodialComponent.message).to.eql({ show: true, type: 'danger', text: response.errorMessage });
        });

      httpBackend.flush();
    });

  });


    describe('#getCampaign', () => {
        it('=> should return data of campaign', () => {
             httpBackend.whenGET(endPointUrl+'/autodial/AutoDailer').respond(200,{
                      'return': {
                        'description': '',
                        'mode': 'BASIC',
                        'name': 'AutoDailer',
                        'state': 'NOT_RUNNING',
                        'trainingMode': false,
                        'type': 'AUTODIAL',
                        'autoRecord': false,
                        'callWrapup': {
                          'enabled': false
                        },
                        'ftpHost': '',
                        'ftpPassword': '',
                        'ftpUser': '',
                        'recordingNameAsSid': false,
                        'useFtp': false,
                        'analyzeLevel': 45,
                        'CRMRedialTimeout': {
                          'days': 0,
                          'hours': 0,
                          'minutes': 10,
                          'seconds': 0
                        },
                        'dialingByStateRules': false,
                        'dnisAsAni': false,
                        'enableListDialingRatios': false,
                        'listDialingMode': 'LIST_PENETRATION',
                        'noOutOfNumbersAlert': false,
                        'defaultIvrSchedule': {
                          'chatEnabled': false,
                          'scriptName': 'AutoDialer Flow',
                          'visualModeEnabled': false
                        },
                        'dialIfAgentsAvailable': false,
                        'maxNumOfLines': 1
                      }
         });

             AutodialComponent.getCampaign('autodial','AutoDailer')
            .then(response => {
                 expect(response.statusCode).to.equal(200);
                 expect(response.data).to.not.equal(null);
                 expect(response.data).to.have.property('name','AutoDailer');
                 expect(response.errorMessage).to.equal(null);
                 expect(AutodialComponent.found).to.equal(true);
                 expect(AutodialComponent.campaign).to.not.equal(null);
             });

             httpBackend.flush();
        });
    });



  describe('#update', () => {
        it('=> update status 200', () => {
            AutodialComponent.campaign = {
              autoRecord:true,
              description:'campaign test',
              dnisAsAni:true,
              noOutOfNumbersAlert:true,
              name:'Test',
              ivrscript:{
                  name: 'Main.Oracle'
              }
            };

             httpBackend.whenPUT(endPointUrl+'/autodial/Test', AutodialComponent.campaign)
            .respond(200,null);

             AutodialComponent.update()
            .then(() => {
                 expect(AutodialComponent.campaign.defaultIvrSchedule.scriptName).to.equal('Main.Oracle');
                 expect(mockState.state).to.equal('ap.al.campaigns');
                 expect(mockState.params.message.show).to.equal(true);
                 expect(mockState.params.message.type).to.equal('success');
                 expect(mockState.params.message.text).to.equal('Campaign Updated Successfully');
             });

             httpBackend.flush();
        });

        it('=> update return error', () => {
            AutodialComponent.campaign = {
              autoRecord:true,
              description:'campaign test',
              dnisAsAni:true,
              noOutOfNumbersAlert:true,
              name:'Test',
              ivrscript:{
                  name: 'Main.Oracle'
              }
            };

             httpBackend.whenPUT(endPointUrl+'/autodial/Test', AutodialComponent.campaign)
            .respond(500,{
                        from: 'Error from Campaign Controller EndPoint',
                        body: 'some error message',
                        statusCode: 500
                    }
            );

             AutodialComponent.update()
            .then(response => {
                 expect(response.statusCode).to.equal(500);
                 expect(response.data).to.equal(null);
                 expect(response.errorMessage).to.not.equal(null);
                 expect(AutodialComponent.message).to.eql({ show: true, type: 'danger', text: response.errorMessage });
                 expect(AutodialComponent.SubmitText).to.equal('Save');
             });

             httpBackend.flush();
        });
    });


      describe('#getLists', () => {
        it('=> should return array of lists', () => {
             httpBackend.whenGET(endPointUrl+'/lists').respond(200,{
                  return: [
                        {'name': 'Five9Outbound', 'size': 14 },
                        {'name': 'ListSync','size': 3 },
                        {'name': 'SRT List','size': 10 },
                        {'name': 'AgentList','size': 6}
                     ]
             });

             AutodialComponent.getLists()
            .then(response => {
                 expect(response.statusCode).to.equal(200);
                 expect(response.data).to.not.equal(null);
                 expect(response.errorMessage).to.equal(null);
                 expect(AutodialComponent.listsAvailable).to.have.lengthOf(4);

             });

             httpBackend.flush();
        });


    });
    describe('#removeList', () => {
        it('=> should return status 200, removed list OK', () => {

            AutodialComponent.campaign={
                name:'SomeCampaignName'
            };
            let listItem={name:'AgentList',size:2};

            httpBackend.whenDELETE(endPointUrl+'/lists/SomeCampaignName').respond(200,'');

             AutodialComponent.removeList(listItem)
            .then(response => {
                 expect(response.statusCode).to.equal(200);
                 expect(response.data).to.equal(null);
                 expect(response.errorMessage).to.equal(null);

             });

             httpBackend.flush();
        });
    });
    describe('#addList', () => {
       it('=> should return status 200, added list OK', () => {

            AutodialComponent.campaign={
                name:'SomeCampaignName'
            };
            let listItem={name:'AgentList'};
            httpBackend.whenPOST(endPointUrl+'/lists').respond(200,'');

             AutodialComponent.addList(listItem)
            .then(response => {
                 expect(response.statusCode).to.equal(200);
                 expect(response.data).to.equal(null);
                 expect(response.errorMessage).to.equal(null);
                 expect(AutodialComponent.message).to.eql({ show: true, type: 'success', text: 'List Added Successfully', expires:1500});
             });

             httpBackend.flush();
        });
    });

      describe('#getAttachedLists', () => {
         it('=> should return list of attached', () => {
             httpBackend.whenGET(endPointUrl+'/attached/lists/test7outAutoxob').respond(200,{
                                return: [
                                    {
                                    'campaignName': 'test7outAutoxob',
                                    'dialingPriority': 1,
                                    'listName': 'SMS_Queue',
                                    'priority': 1
                                    },
                                    {
                                    'campaignName': 'test7outAutoxob',
                                    'dialingPriority': 1,
                                    'listName': 'SRT List',
                                    'priority': 2
                                    }
                                ]
                        });
             httpBackend.expectGET(endPointUrl+'/lists').respond(200, {
                     return: [
                        {'name': 'Five9Outbound', 'size': 14 },
                        {'name': 'ListSync','size': 3 }
                     ]
             });


             AutodialComponent.getAttachedLists('test7outAutoxob')
            .then(response => {
                 expect(response.statusCode).to.equal(200);
                 expect(response.data).to.not.equal(null);
                 expect(response.errorMessage).to.equal(null);
                 expect(AutodialComponent.listsAssigned).to.have.lengthOf(2);

             });

             httpBackend.flush();
        });
    });


});

'use strict';

describe('Component: al.campaigns.edit.outbound', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var OutboundComponent, scope, endPointUrl , httpBackend;
  let mockState;
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope, $httpBackend, appConfig) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;

    if(appConfig.apiUri){
       endPointUrl=appConfig.apiUri+'/f9/admin/campaigns';
    }
    mockState = {
        go: function(state, params){
          this.state = state;
          this.params = params;
        }
      };
    OutboundComponent = $componentController('al.campaigns.edit.outbound', {
      $scope: scope,
      $state: mockState
    });
    httpBackend.whenGET(url=>(url.indexOf('.html') !== -1)).respond(200);

  }));

  afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
  });


   describe('#update', () => {

        it('=> update status 200', () => {
            OutboundComponent.campaign = {
                name:'Test',
                description:'Some description',
                trainingMode:false,
                autoRecord:true,
                noOutOfNumbersAlert:false,
                maxQueueTime:{
                  minutes:10,
                  seconds:20
                }
            };

             httpBackend.whenPUT(endPointUrl+'/outbound/Test', OutboundComponent.campaign)
            .respond(200,'null');

             OutboundComponent.update()
            .then(() => {
                 expect(mockState.state).to.equal('ap.al.campaigns');
                 expect(mockState.params.message.show).to.equal(true);
                 expect(mockState.params.message.type).to.equal('success');
                 expect(mockState.params.message.text).to.equal('Campaign Updated Successfully');
             });

             httpBackend.flush();
        });

        it('=> update return error', () => {
            OutboundComponent.campaign = {
                name:'Test',
                description:'Some description',
                trainingMode:false,
                autoRecord:true,
                noOutOfNumbersAlert:false,
                maxQueueTime:{
                  minutes:10,
                  seconds:20
                }
            };

             httpBackend.whenPUT(endPointUrl+'/outbound/Test', OutboundComponent.campaign)
            .respond(500,{
                        from: 'Error from Campaign Controller EndPoint',
                        body: 'some error message',
                        statusCode: 500
                    }
            );

             OutboundComponent.update()
            .then(response => {
                 expect(response.statusCode).to.equal(500);
                 expect(response.data).to.equal(null);
                 expect(response.errorMessage).to.not.equal(null);
                 expect(OutboundComponent.message).to.eql({ show: true, type: 'danger', text: response.errorMessage });
             });

             httpBackend.flush();
        });
    });

       describe('#getCampaign', () => {

        it('=> should return data of campaign', () => {
             httpBackend.whenGET(endPointUrl+'/outbound/BlueRubyOutbound').respond(200,{
                                return: {
                                    'description': '',
                                    'mode': 'BASIC',
                                    'name': 'BlueRubyOutbound',
                                    'state': 'RUNNING',
                                    'trainingMode': true,
                                    'type': 'OUTBOUND',
                                    'autoRecord': true,
                                    'noOutOfNumbersAlert': true,
                                    'maxQueueTime': {
                                        'days': 0,
                                        'hours': 0,
                                        'minutes': 0,
                                        'seconds': 1
                                    }
                                }
                        });

             OutboundComponent.getCampaign('outbound','BlueRubyOutbound')
            .then(response => {
                 expect(response.statusCode).to.equal(200);
                 expect(response.data).to.not.equal(null);
                 expect(response.data).to.have.property('name','BlueRubyOutbound');
                 expect(response.data).to.have.property('maxQueueTime');
                 expect(response.errorMessage).to.equal(null);
                 expect(OutboundComponent.found).to.equal(true);
                 expect(OutboundComponent.campaign).to.not.equal(null);
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


             OutboundComponent.getAttachedLists('test7outAutoxob')
            .then(response => {
                 expect(response.statusCode).to.equal(200);
                 expect(response.data).to.not.equal(null);
                 expect(response.errorMessage).to.equal(null);
                 expect(OutboundComponent.listsAssigned).to.have.lengthOf(2);

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

             OutboundComponent.getLists()
            .then(response => {
                 expect(response.statusCode).to.equal(200);
                 expect(response.data).to.not.equal(null);
                 expect(response.errorMessage).to.equal(null);
                 expect(OutboundComponent.listsAvailable).to.have.lengthOf(4);

             });

             httpBackend.flush();
        });


    });
    describe('#removeList', () => {
        it('=> should return status 200, removed list OK', () => {

            OutboundComponent.campaign={
                name:'SomeCampaignName'
            };
            let listItem={name:'AgentList',size:2};

            httpBackend.whenDELETE(endPointUrl+'/lists/SomeCampaignName').respond(200,'');

             OutboundComponent.removeList(listItem)
            .then(response => {
                 expect(response.statusCode).to.equal(200);
                 expect(response.data).to.equal(null);
                 expect(response.errorMessage).to.equal(null);
                 expect(OutboundComponent.message).to.eql({ show: true, type: 'success', text: 'List Removed Successfully', expires:1500});

             });

             httpBackend.flush();
        });
    });
    describe('#addList', () => {
       it('=> should return status 200, added list OK', () => {

            OutboundComponent.campaign={
                name:'SomeCampaignName'
            };
            let listItem={name:'AgentList'};
            httpBackend.whenPOST(endPointUrl+'/lists').respond(200,'');

             OutboundComponent.addList(listItem)
            .then(response => {
                 expect(response.statusCode).to.equal(200);
                 expect(response.data).to.equal(null);
                 expect(response.errorMessage).to.equal(null);

             });

             httpBackend.flush();
        });
    });


});

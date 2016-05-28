'use strict';

describe('Component: al.campaigns.edit.outbound', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var OutboundComponent, scope, endPointUrl , httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope, $httpBackend, appConfig) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    
    if(appConfig.apiUri){
       endPointUrl=appConfig.apiUri+'/f9/campaigns';
    }          
    OutboundComponent = $componentController('al.campaigns.edit.outbound', {
      $scope: scope
    });
  
  }));
  
  afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
  });


   describe('#update', () => {

        it('=> update status 200', () => {
            OutboundComponent.campaign = {
                name:'Name of Camapaign',
                description:'Some description',
                trainingMode:false,
                autoRecord:true,
                noOutOfNumbersAlert:false,
                maxQueueTime:{
                  minutes:10,
                  seconds:20
                }
            };
            
             httpBackend.whenPUT(endPointUrl+'/outbound', OutboundComponent.campaign)
            .respond(200,'null');

             OutboundComponent.update()
            .then(response => {
                 expect(response.statusCode).to.equal(200);
                 expect(response.data).to.equal(null);
                 expect(response.error).to.equal(null);
             });

             httpBackend.flush();
        });
        
        it('=> update return error', () => {
            OutboundComponent.campaign = {
                name:'Name of Camapai5gn',
                description:'Some description',
                trainingMode:false,
                autoRecord:true,
                noOutOfNumbersAlert:false,
                maxQueueTime:{
                  minutes:10,
                  seconds:20
                }
            };
            
             httpBackend.whenPUT(endPointUrl+'/outbound', OutboundComponent.campaign)
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
                 expect(response.error).to.not.equal(null);
             });

             httpBackend.flush();
        });        
    });
    
       describe('#getCampaign', () => {

        it('=> should return data of campaign', () => {            
             httpBackend.whenGET(endPointUrl+'/show/outbound/BlueRubyOutbound').respond(200,{
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
                 expect(response.error).to.equal(null);
                 expect(OutboundComponent.found).to.equal(true);
                 expect(OutboundComponent.campaign).to.not.equal(null);
             });

             httpBackend.flush();
        });        
      
    });  

});

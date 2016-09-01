'use strict';

describe('Component: al.campaigns.edit.inbound', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var InboundComponent, scope ,endPointUrl , httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope, $httpBackend, appConfig) {
    scope = $rootScope.$new();
    httpBackend = $httpBackend;
    
    if(appConfig.apiUri){
       endPointUrl=appConfig.apiUri+'/f9/campaigns';
    } 
    InboundComponent = $componentController('al.campaigns.edit.inbound', {
      $scope: scope
    });

             
    httpBackend.whenGET(url=>(url.indexOf('.html') !== -1)).respond(200);

  }));
  afterEach(function() {
        httpBackend.verifyNoOutstandingRequest();
  });

    describe('#getCampaign', () => {
        it('=> should return data of campaign', () => {            
             httpBackend.whenGET(endPointUrl+'/inbound/BlueRubyDemo').respond(200,{
                                return: {
                                    'description': '',
                                    'mode': 'BASIC',
                                    'name': 'BlueRubyDemo',
                                    'state': 'RUNNING',
                                    'trainingMode': true,
                                    'type': 'INBOUND',
                                    'autoRecord': true,                             
                                    'noOutOfNumbersAlert': true                                              
                                }
                        });

             InboundComponent.getCampaign('inbound','BlueRubyDemo')
            .then(response => {
                 expect(response.statusCode).to.equal(200);
                 expect(response.data).to.not.equal(null);
                 expect(response.data).to.have.property('name','BlueRubyDemo');
                 expect(response.errorMessage).to.equal(null);
                 expect(InboundComponent.found).to.equal(true);
                 expect(InboundComponent.campaign).to.not.equal(null);
             });

             httpBackend.flush();
        });   
    });  
    
    
    
  describe('#getIVRScripts', () => {
    it('=> should return array of ivrscripts', () => {
      console.log ('The endPointUrl IS '+endPointUrl);
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

      InboundComponent.getIVRScripts()
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

        InboundComponent.getIVRScripts()
        .then(response => {
            expect(response).to.be.property('statusCode');
            expect(response.statusCode).to.not.equal(200);
            expect(response.statusCode).to.equal(401);
            expect(response.data).to.equal(null);
            expect(response.errorMessage).to.not.equal(null);
            expect(InboundComponent.message).to.eql({ show: true, type: 'danger', text: response.errorMessage });
         });
      httpBackend.flush();
    });

  });

  describe('#getAttachedDnis', () => {
         it('=> should return attached dnis numbers', () => {            
             httpBackend.whenGET(endPointUrl+'/attached/dnis/TestInboundCampaignAutobox').respond(200,{
                                return: [
                                  '9253574077',
                                  '9252935004',
                                  '9252935010'
                                ]
                        });
             httpBackend.expectGET(endPointUrl+'/dnis').respond(200, {
                   return: [
                      '9253574016', '9253574078', '9252935008', '9252935009',  '9253574236',
                      '9255298354','9255298355', '9255298356', '9255298361', '9255298362',
                      '9255298363', '9255298364', '9255298365', '9255298367', '9255298368'
                  ]
             });                                         

             InboundComponent.getAttachedDnis('TestInboundCampaignAutobox')
            .then(response => {
                 expect(response.statusCode).to.equal(200);
                 expect(response.data).to.not.equal(null); 
                 expect(response.errorMessage).to.equal(null);
                 expect(InboundComponent.dnisAssigned).to.have.lengthOf(3);  
                 
             });

             httpBackend.flush();
        });   
  });
  
    describe('#getDnis', () => {
         it('=> should return array of dnis numbers', () => {            
             httpBackend.whenGET(endPointUrl+'/dnis').respond(200,{
                                return: [
                                 '9253574016', '9253574078', '9252935008', '9252935009',  '9253574236',
                                '9255298354','9255298355', '9255298356', '9255298361', '9255298362'                         
                                ]
                        });                                      

            InboundComponent.getDnis()
            .then(response => {
                 expect(response.statusCode).to.equal(200);
                 expect(response.data).to.not.equal(null); 
                 expect(response.errorMessage).to.equal(null);
                 expect(InboundComponent.dnisAvailable).to.have.lengthOf(10);  
                 
             });

             httpBackend.flush();
        });   
  });
  



  describe('#update', () => {

        it('=> update status 200', () => {
           
            InboundComponent.campaign = {
              autoRecord:true,
              description:'campaign test',
              ivrscript:{                
                  name: 'Main.Oracle'
              },
              maxNumOfLines:23,
              name:'Test'
            };
            
             httpBackend.whenPUT(endPointUrl+'/inbound/Test', InboundComponent.campaign)
            .respond(200,null);

             InboundComponent.update()
            .then(response => {
                 expect(InboundComponent.campaign.defaultIvrSchedule.scriptName).to.equal('Main.Oracle');
                 expect(response.statusCode).to.equal(200);
                 expect(response.data).to.equal(null);
                 expect(response.errorMessage).to.equal(null);             
             });

             httpBackend.flush();
        });
       
        it('=> update return error', () => {
          
             InboundComponent.campaign = {
              autoRecord:true,
              description:'campaign test',
              ivrscript:{                
                  name: 'Main.Oracle'
              },
              maxNumOfLines:23,
              name:'Test'
            };
            
             httpBackend.whenPUT(endPointUrl+'/inbound/Test', InboundComponent.campaign)
            .respond(500,{
                        from: 'Error from Campaign Controller EndPoint',
                        body: 'some error message',
                        statusCode: 500
                    }
            );

             InboundComponent.update()
            .then(response => {
                 expect(response.statusCode).to.equal(500);
                 expect(response.data).to.equal(null);
                 expect(response.errorMessage).to.not.equal(null);
                 expect(InboundComponent.message).to.eql({ show: true, type: 'danger', text: response.errorMessage, expires:3000 });
                 expect(InboundComponent.SubmitText).to.equal('Save');
             });

             httpBackend.flush();
        });        
    });  
    
    
    describe('#removeDni', () => {
        it('=> should return status 200, removed dni OK', () => {  
           
            InboundComponent.campaign={
                name:'SomeCampaignName'
            };
            InboundComponent.dnisAssigned=[55554444,55235555,222222];
           
            expect(InboundComponent.dnisAssigned).to.include(55554444);
            expect(InboundComponent.dnisAvailable).to.not.include(55554444);
            
            httpBackend.whenDELETE(endPointUrl+'/dnis/SomeCampaignName').respond(200,'');             
          
             InboundComponent.removeDni(55554444)
            .then(response => {
                 expect(response.statusCode).to.equal(200);
                 expect(response.data).to.equal(null); 
                 expect(response.errorMessage).to.equal(null);        
                 expect(InboundComponent.dnisAssigned).to.not.include(55554444);
                 expect(InboundComponent.dnisAvailable).to.include(55554444);           
             });
             httpBackend.flush();
        });
    });
    
    describe('#addDnis', () => {
       it('=> should return status 200, added dni OK', () => {  
           
            InboundComponent.campaign={
                name:'SomeCampaignName'
            };
           
            InboundComponent.dnisAvailable=[55554444,43434343,222222];
            
           
            expect(InboundComponent.dnisAvailable).to.include(43434343);
            expect(InboundComponent.dnisAssigned).to.not.include(43434343);
            

            httpBackend.whenPOST(endPointUrl+'/dnis').respond(200,'');             
          
             InboundComponent.addDnis(43434343)
            .then(response => {
                 expect(response.statusCode).to.equal(200);
                 expect(response.data).to.equal(null); 
                 expect(response.errorMessage).to.equal(null);     
                 expect(InboundComponent.dnisAvailable).to.not.include(43434343);
                 expect(InboundComponent.dnisAssigned).to.include(43434343);      
                 
             });

             httpBackend.flush();
        }); 
    });   

});

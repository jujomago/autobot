'use strict';

describe('Service: CampaignService', function () {

  // load the service's module
  beforeEach(module('fakiyaMainApp'));

  // instantiate service

  var CampaignService, httpBackend, endPointUrl;

  beforeEach(inject(function (_CampaignService_, $httpBackend, appConfig) {
    CampaignService = _CampaignService_;
    httpBackend = $httpBackend;

    if(appConfig.apiUri){
        endPointUrl=appConfig.apiUri+'/f9/campaigns';
    }

  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingRequest();
  });



  describe('#getCampagins', () => {
    it('=> should return array of campaigns', () => {
      console.log ('The endPointUrl IS '+endPointUrl);
      httpBackend.when('GET', endPointUrl).respond({
        return: [
          {
            'description': '',
            'mode': 'BASIC',
            'name': 'BlueRubyOutbound',
            'state': 'RUNNING',
            'trainingMode': true,
            'type': 'OUTBOUND'
          },
          {
            'description': 'Inbound Demo Flow with AS Scripting and Recording',
            'mode': 'ADVANCED',
            'name': 'BlueRubyService',
            'profileName': 'Authority',
            'state': 'RUNNING',
            'trainingMode': false,
            'type': 'INBOUND'
          },
          {
            'description': '925-293-5000',
            'mode': 'BASIC',
            'name': 'BlueRubyDemo',
            'state': 'RUNNING',
            'trainingMode': false,
            'type': 'INBOUND'
          }]
      });

      CampaignService.getCampaigns()
        .then(response => {
          expect(response).to.be.property('statusCode');
          expect(response.statusCode).to.equal(200);
          expect(response.data).to.be.an.instanceof(Array);
          expect(response.data).to.be.have.lengthOf(3);
          expect(response.data[0]).to.have.deep.property('name');
          expect(response.data[1]).to.have.deep.property('type');


        });
      httpBackend.flush();
    });

    it('=> should return error with statusCode 401', () => {
      httpBackend.whenGET(endPointUrl).respond(401, {
        statusCode: 401,
        from: 'error from controller endpoint',
        body: 'the explicit error'
      });

      CampaignService.getCampaigns()
        .then(response => {
          expect(response).to.be.property('statusCode');
          expect(response.statusCode).to.not.equal(200);
          expect(response.statusCode).to.equal(401);
          expect(response.data).to.equal(null);
          expect(response.error).to.not.equal(null);

        });
      httpBackend.flush();
    });

  });


  describe('#getIVRScripts', () => {
    it('=> should return array of ivrscripts', () => {
      console.log ('The endPointUrl IS '+endPointUrl);
      httpBackend.when('GET', endPointUrl+'/ivrscripts').respond({
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

      CampaignService.getIVRScripts()
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

      CampaignService.getIVRScripts()
        .then(response => {
          expect(response).to.be.property('statusCode');
          expect(response.statusCode).to.not.equal(200);
          expect(response.statusCode).to.equal(401);
          expect(response.data).to.equal(null);
          expect(response.error).to.not.equal(null);

        });
      httpBackend.flush();
    });
  });
  
  describe('#createCampaign', () => {

    it('=> should return error statusCode 201, Created Ok', () => {
      
      let newCampaign = {
        autoRecord:true,
        description:'campaign test',
        dnisAsAni:true,
        noOutOfNumbersAlert:true,
        name:'Campaign Test',
        ivrscript:{                
            name: 'Main.Oracle'
        }             
      };

      httpBackend.whenPOST(endPointUrl).respond(201, null);

      CampaignService.createCampaign(newCampaign)
        .then(response => {  
          expect(response).to.be.property('statusCode');
          expect(response.statusCode).to.equal(201);
          expect(response.data).to.equal(null);
          expect(response.error).to.equal(null);
        });

      httpBackend.flush();
    });

  });

  describe('#updateOutBoundCampaign', () => {

    it('=> should return error statusCode 200, Updated Ok', () => {
      
      let Campaign = {
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

      httpBackend.whenPUT(endPointUrl+'/outbound').respond(200, null);

      CampaignService.updateOutBoundCampaign(Campaign)
        .then(response => {  
          expect(response).to.be.property('statusCode');
          expect(response.statusCode).to.equal(200);
          expect(response.data).to.equal(null);
          expect(response.error).to.equal(null);
        });

      httpBackend.flush();
    });

  });

  describe('#updateAutoDialCampaign', () => {

    it('=> should return error statusCode 200, Updated Ok', () => {
      
      let Campaign = {
          autoRecord:true,
          description:'campaign test',
          dnisAsAni:true,
          noOutOfNumbersAlert:true,
          name:'Campaign Test',
          ivrscript:{                
              name: 'Main.Oracle'
          }               
      };

      httpBackend.whenPUT(endPointUrl+'/autodial').respond(200, null);

      CampaignService.updateAutoDialCampaign(Campaign)
        .then(response => {  
          expect(response).to.be.property('statusCode');
          expect(response.statusCode).to.equal(200);
          expect(response.data).to.equal(null);
          expect(response.error).to.equal(null);
        });

      httpBackend.flush();
    });

  });
  
  describe('#updateInBoundCampaign', () => {

    it('=> should return error statusCode 200, Updated Ok', () => {
      
      let Campaign = {
          autoRecord:true,
          description:'campaign test',
          ivrscript:{                
              name: 'Main.Oracle'
          },
          maxNumOfLines:23,
          name:'Campaign Test'
      };

      httpBackend.whenPUT(endPointUrl+'/inbound').respond(200, null);

      CampaignService.updateInBoundCampaign(Campaign)
        .then(response => {  
          expect(response).to.be.property('statusCode');
          expect(response.statusCode).to.equal(200);
          expect(response.data).to.equal(null);
          expect(response.error).to.equal(null);
        });

      httpBackend.flush();
    });

  });  
  


  describe('#deleteCampaign', () => {

    it('=> should return error statusCode 204, Delete Ok', () => {
      httpBackend.whenDELETE(endPointUrl + '/BlueRubyDemo').respond(204, null);

      CampaignService.deleteCampaign('BlueRubyDemo')
        .then(response => {
          expect(response).to.be.property('statusCode');
          expect(response.statusCode).to.equal(204);
          expect(response.data).to.equal(null);
        });

      httpBackend.flush();
    });


    it('=> should return error statusCode not equal 204, Delete Wrong', () => {
      httpBackend.whenDELETE(endPointUrl + '/BlueRubyDemo').respond(501, {
        statusCode: 501,
        from: 'error from controller endpoint',
        body: 'the explicit error'
      });

      CampaignService.deleteCampaign('BlueRubyDemo')
        .then(response => {
          expect(response).to.be.property('statusCode');
          expect(response.statusCode).to.not.equal(204);
          expect(response.statusCode).to.equal(501);
          expect(response.data).to.equal(null);
          expect(response.error).to.not.equal(null);
        });

      httpBackend.flush();
    });
  });
  

  
  
});

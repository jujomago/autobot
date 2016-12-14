'use strict';

describe('Component: CreateComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var CreateComponent, scope;
  var endPointUrl,httpBackend;

    /*  beforeEach(module(function($urlRouterProvider) {
        $urlRouterProvider.deferIntercept();
      }));*/

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope, $httpBackend, appConfig) {
    scope = $rootScope.$new();
      httpBackend = $httpBackend;

    if(appConfig.apiUri){
        endPointUrl=appConfig.apiUri+'/f9/admin/campaigns';
    }


    CreateComponent = $componentController('al.campaigns.create', {
      $scope: scope
    });

    httpBackend.whenGET(url=>(url.indexOf('.html') !== -1)).respond(200);
    httpBackend.whenGET(appConfig.apiUri+'/f9/admin/lists/%$&unexisting_list)(*&^%^').respond(200);

  }));
   afterEach(function () {
    httpBackend.verifyNoOutstandingRequest();
  });

    describe('#checkRadio', () => {

         it('=> radio different from outbound, return String "loadingIVR"', () => {


            CreateComponent.newCampaign={
              name:'TestNameCampaign',
              description:'Description for the campaign',
              type:'inbound'
            };
            CreateComponent.ivrScripts=[];
            CreateComponent.loadingIVR=false;

           expect(CreateComponent.checkRadio()).to.equal('loadingIVR');
        });
        it('=> radio different from outbound, IVR LOADED, should return String "loadedIVR"', () => {

            CreateComponent.newCampaign={
              name:'TestNameCampaign',
              description:'Description for the campaign',
              type:'autodial'
            };
            CreateComponent.ivrScripts=[{name:'ivrname',script:{}}];
            CreateComponent.loadingIVR=false;

           expect(CreateComponent.checkRadio()).to.equal('loadedIVR');
        });

        it('=> radio equal to outbound, nothint to load, null return', () => {

            CreateComponent.newCampaign={
              name:'TestNameCampaign',
              description:'Description for the campaign',
              type:'outbound'
            };


           expect(CreateComponent.checkRadio()).to.equal(null);
        });


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


         CreateComponent.getIVRScripts()
         .then(response=>{


            expect(response).to.have.property('statusCode');
            expect(response.statusCode).to.equal(200);
            expect(response.data).to.be.an.instanceof(Array);
            expect(response.data).to.have.lengthOf(3);
            expect(response.data[0]).to.have.deep.property('name');
            expect(response.data[1]).to.have.deep.property('xmlDefinition');

           });
           httpBackend.flush();

        });
    });

    describe('#save', () => {

         it('=> should return Status 201, created OK"', () => {
            httpBackend.whenPOST(endPointUrl+'/outbound').respond(201,null);

            CreateComponent.newCampaign={
              name:'TestNameCampaign',
              description:'Description for the campaign',
              type:'outbound'
            };


            let proms=CreateComponent.save();
           expect(CreateComponent.SubmitText).to.equal('Saving...');
           proms.then(response=>{
               expect(CreateComponent.newCampaign.defaultIvrSchedule).to.equal(undefined);
               expect(response.statusCode).to.equal(201);
               expect(response.data).to.equal(null);
               expect(response.errorMessage).to.equal(null);
            });
            httpBackend.flush();
        });
        it('=> should return Status 201, created OK with ivrscript', () => {
            httpBackend.whenPOST(endPointUrl+'/inbound').respond(201,null);

            CreateComponent.newCampaign={
              name:'TestNameCampaign',
              description:'Description for the campaign',
              type:'inbound',
              ivrscript: {name: 'test'}
            };


            let proms=CreateComponent.save();
           expect(CreateComponent.SubmitText).to.equal('Saving...');
           proms.then(response=>{
               expect(CreateComponent.newCampaign.defaultIvrSchedule.scriptName).to.equal('test');
               expect(response.statusCode).to.equal(201);
               expect(response.data).to.equal(null);
               expect(response.errorMessage).to.equal(null);
            });
            httpBackend.flush();
        });

        it('=> should return Status 500, created error', () => {
            httpBackend.whenPOST(endPointUrl+'/outbound').respond(500,{
                error: 'the explicit first error'
            });

            CreateComponent.newCampaign={
              name:'', // this parameter will throw the error, name must not be empty
              description:'Description for the campaign',
              type:'outbound'
            };

           CreateComponent.save()
            .then(response=>{
               expect(response.statusCode).to.equal(500);
               expect(response.data).to.equal(null);
               expect(response.errorMessage).to.not.equal(null);
               expect(CreateComponent.SubmitText).to.equal('Save');
            });
            httpBackend.flush();
        });

    });

});

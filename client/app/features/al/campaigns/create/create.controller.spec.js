'use strict';

describe('Component: CreateComponent', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var CreateComponent, scope;
  var endPointUrl,httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope, $httpBackend, appConfig) {
    scope = $rootScope.$new();
      httpBackend = $httpBackend;
    
    if(appConfig.apiUri){
        endPointUrl=appConfig.apiUri+'/f9/campaigns';
    }
     
    
    CreateComponent = $componentController('al.campaigns.create', {
      $scope: scope
    });
  }));
   afterEach(function () {
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
});

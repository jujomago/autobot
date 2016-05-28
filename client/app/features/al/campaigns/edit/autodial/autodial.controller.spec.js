'use strict';

describe('Component: al.campaigns.edit.autodial', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var AutodialComponent, scope ,endPointUrl , httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope,  $httpBackend, appConfig) {
    scope = $rootScope.$new();
      httpBackend = $httpBackend;
    
    if(appConfig.apiUri){
       endPointUrl=appConfig.apiUri+'/f9/campaigns';
    } 
    
    AutodialComponent = $componentController('al.campaigns.edit.autodial', {
      $scope: scope
    });
  }));
 
  afterEach(function() {
     httpBackend.verifyNoOutstandingRequest();
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
            expect(response.error).to.not.equal(null);
            expect(AutodialComponent.message).to.eql({ show: true, type: 'danger', text: response.error.body });
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
              name:'Campaign Test',
              ivrscript:{                
                  name: 'Main.Oracle'
              }             
            };
            
             httpBackend.whenPUT(endPointUrl+'/autodial', AutodialComponent.campaign)
            .respond(200,null);

             AutodialComponent.update()
            .then(response => {
                 expect(response.statusCode).to.equal(200);
                 expect(response.data).to.equal(null);
                 expect(response.error).to.equal(null);             
             });

             httpBackend.flush();
        });
       
        it('=> update return error', () => {
           
           
            AutodialComponent.campaign = {
              autoRecord:true,
              description:'campaign test',
              dnisAsAni:true,
              noOutOfNumbersAlert:true,
              name:'Campaign Test',
              ivrscript:{                
                  name: 'Main.Oracle'
              }             
            };
            
             httpBackend.whenPUT(endPointUrl+'/autodial', AutodialComponent.campaign)
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
                 expect(response.error).to.not.equal(null);
                 expect(AutodialComponent.message).to.eql({ show: true, type: 'danger', text: response.error.body });
                 expect(AutodialComponent.SubmitText).to.equal('Save');
             });

             httpBackend.flush();
        });        
    });  
    
  
  
  
  

});

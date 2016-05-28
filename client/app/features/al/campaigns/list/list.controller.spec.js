'use strict';


describe('Component: al.campaigns.list', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var ListComponent, scope;
  var timeout, campaignService, confirmAsync;
  var httpBackend, sandbox, window, endPointUrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope, $stateParams, $timeout, $window, $httpBackend, ConfirmAsync, CampaignService,appConfig) {
    scope = $rootScope.$new();
    timeout = $timeout;
    campaignService = CampaignService;
    confirmAsync = ConfirmAsync;
    httpBackend = $httpBackend;
    window = $window;

    if(appConfig.apiUri){
          endPointUrl=appConfig.apiUri+'/f9/campaigns';
    }


    sandbox = sinon.sandbox.create();

    ListComponent = $componentController('al.campaigns.list', {
      $scope: scope,
      $stateParams: { message: null },
      $timeout: timeout,
      ConfirmAsync: confirmAsync,
      CampaignService: campaignService
    });
  }));

  afterEach(function () {
    httpBackend.verifyNoOutstandingRequest();
    sandbox.restore();
  });

  describe('#getCampaigns', () => {

    it('should return list array of campaigns', function () {
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
          }
        ]
      });

      ListComponent.getCampaigns()
        .then(response => {
          expect(response.data).to.not.equal(null);
          expect(response.error).to.equal(null);
          expect(response.statusCode).to.equal(200);
          expect(ListComponent.campaigns).to.have.lengthOf(2);
          expect(ListComponent.campaigns).to.be.instanceof(Array);

        });

      httpBackend.flush();
    });

    it('should return some statusCode error diferent from 200', function () {
      httpBackend.whenGET(endPointUrl).respond(401, {
        from: 'Error from Campaign Controller EndPoint',
        body: 'some error message',
        statusCode: 401
      });

      ListComponent.getCampaigns()
        .then(response => {
          expect(response).to.equal(null);
          expect(ListComponent.message.show).to.equal(true);
          expect(ListComponent.message.type).to.equal('danger');
          expect(ListComponent.message).to.not.equal('');
        });

      httpBackend.flush();
    });



  });
  describe('#deleteCamapain', () => {
    it('user cancel promt message, should return false', function () {

      httpBackend.whenDELETE(endPointUrl+'/somecampaign').respond(204, null);

      ListComponent.deleteCampaign({ name: 'somecampaign' }, 8)
        .then(response => {
          expect(response).to.equal(false);
        });


    });


    it('user accepts promt message, should return true', function () {

      httpBackend.whenDELETE(endPointUrl+'/somecampaign').respond(204, null);

      sandbox.stub(window, 'confirm').returns(true);

      ListComponent.deleteCampaign({ name: 'somecampaign' }, 8)
        .then(response => {
          expect(response).to.equal(true);
        });

      expect(window.confirm.calledOnce).to.equal(true);

      httpBackend.flush();
    });


  });

});

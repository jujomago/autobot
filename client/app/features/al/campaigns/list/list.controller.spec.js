'use strict';


describe('Component: al.campaigns.list', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));

  var ListComponent, scope;
  var timeout, campaignService, confirmAsync;
  var httpBackend, sandbox, window, endPointUrl;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope, $stateParams, $timeout, $window, $httpBackend, ConfirmAsync, CampaignService, appConfig) {
    scope = $rootScope.$new();
    timeout = $timeout;
    campaignService = CampaignService;
    confirmAsync = ConfirmAsync;
    httpBackend = $httpBackend;
    window = $window;

    if (appConfig.apiUri) {
      endPointUrl = appConfig.apiUri + '/f9/admin/campaigns';
    }


    sandbox = sinon.sandbox.create();

    ListComponent = $componentController('al.campaigns.list', {
      $scope: scope,
      $stateParams: { message: null },
      $timeout: timeout,
      ConfirmAsync: confirmAsync,
      CampaignService: campaignService
    });

    httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);

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
          expect(response.errorMessage).to.equal(null);
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
          //expect(response).to.equal(null);
          expect(ListComponent.message.show).to.equal(true);
          expect(ListComponent.message.type).to.equal('danger');
          expect(response.statusCode).to.not.equal(200);
          expect(response.statusCode).to.equal(401);
          expect(response.data).to.equal(null);
          expect(response.errorMessage).to.not.equal(null);
        });

      httpBackend.flush();
    });



  });
  describe('#deleteCamapain', () => {
    it('user cancel promt message, should return null', function () {

      httpBackend.whenDELETE(endPointUrl + '/somecampaign').respond(204, null);

      ListComponent.deleteCampaign({ name: 'somecampaign' }, 8)
        .then(response => {
          expect(response).to.equal(null);
        });


    });


    it('user accepts promt message, should return true', function () {

      httpBackend.whenDELETE(endPointUrl + '/somecampaign').respond(204, null);

      sandbox.stub(window, 'confirm').returns(true);

      ListComponent.deleteCampaign({ name: 'somecampaign' }, 8)
        .then(() => {
          expect(ListComponent.toggleCampaignRow).to.equal(null);
          expect(ListComponent.message.show).to.equal(true);
          expect(ListComponent.message.type).to.equal('success');
          expect(ListComponent.message.text).to.equal('Campaign Deleted Successfully');
        });

      expect(window.confirm.calledOnce).to.equal(true);

      httpBackend.flush();
    });


  });

  describe('#verifyDependencies', () => {
    it('Get attached DNIS, should return null, campaign inexistent', function () {

      httpBackend.whenGET(endPointUrl + '/attached/dnis/SomeCampaignName').respond(200, null);

      let item = { name: 'SomeCampaignName', type: 'INBOUND' };
      ListComponent.verifyDependendies(item)
        .then(response => {
          expect(response.statusCode).to.equal(200);
          expect(response.data).to.equal(null);
          expect(response.errorMessage).to.not.equal(null);
        });

    });

    it('Get attached Lists, should return null, campaign inexistent', function () {

      httpBackend.whenGET(endPointUrl + '/attached/lists/SomeCampaignName').respond(200, null);

      let item = { name: 'SomeCampaignName', type: 'AUTODIAL' };
      ListComponent.verifyDependendies(item)
        .then(response => {
          expect(response.statusCode).to.equal(200);
          expect(response.data).to.equal(null);
          expect(response.errorMessage).to.not.equal(null);
        });

    });
  });



  describe('#updateState', () => {


    beforeEach(inject(function () {
        httpBackend.whenGET(endPointUrl+'/attached/lists/SomeCampaignName').respond(200);

    }));

    it('Stopping RUNNING state', function () {
      let item = { name: 'SomeCampaignName', state: 'RUNNING' };

      httpBackend.whenPUT(endPointUrl + '/stop/SomeCampaignName').respond(200, null);

      let promise = ListComponent.updateState(item, 8) ;
      expect(item.statusBtnText).to.equal('Stopping');
      promise
        .then(response => {
          expect(response.statusCode).to.equal(200);
          expect(item.state).to.equal('NOT_RUNNING');
          expect(item.statusBtnText).to.equal('Start');
          expect(ListComponent.toggleStatusRow).to.equal(-1);
          expect(ListComponent.message).to.eql({show:true,type:'success',text:'Stopped Successfully',expires:2000});
        });
        httpBackend.flush();

    });

    it('Starting NOT_RUNNING state', function () {
      let item = { name: 'SomeCampaignName', state: 'NOT_RUNNING' };

      httpBackend.whenPUT(endPointUrl + '/start/SomeCampaignName').respond(200, null);

      let promise = ListComponent.updateState(item,3);
      expect(item.statusBtnText).to.equal('Starting');
      promise
        .then(response => {
          expect(response.statusCode).to.equal(200);
          expect(item.state).to.equal('RUNNING');
          expect(item.statusBtnText).to.equal('Stop');
          expect(ListComponent.toggleStatusRow).to.equal(-1);
          expect(ListComponent.message).to.eql({ show: true, type: 'success', text: 'Started Successfully', expires: 2000 });
        });
      httpBackend.flush();

    });

    it('Starting NOT_RUNNING state with Error', function () {
      let item = { name: 'SomeCampaignName', state: 'NOT_RUNNING' };

      httpBackend.whenPUT(endPointUrl + '/start/SomeCampaignName').respond(500, {
        error: 'Error updating campaign state &quot;TestFinalOutbound&quot;: No dialing list assigned or dialing lists are empty'
      });

      ListComponent.updateState(item, 3)
        .then(response => {
          expect(ListComponent.toggleStatusRow).to.equal(-1);
          expect(ListComponent.message).to.deep.equal({ show: true, type: 'danger', text: response.errorMessage });
        });
        httpBackend.flush();

    });

    describe('#filteringBySearch', () => {

      it('Should return true, when searching something', () => {
        ListComponent.search.name='some text to search';
        ListComponent.campaigns = [
          {name:'some text to search', type: ListComponent.typeCampaignFilter},
          {name:'Other campaign', type: ListComponent.typeCampaignFilte},
          {name:'some text to search', type: ListComponent.typeCampaignFilter}
        ];
        expect(ListComponent.filteringBySearch()).to.equal (true);
        expect(ListComponent.beginNext).to.equal(0);
        expect(ListComponent.currentPage).to.equal(1);
      });

      it('Should return false, when input search is empty', () => {
          ListComponent.search.name='';
          expect(ListComponent.filteringBySearch()).to.equal (false);
      });

    });
  });


  describe('#filteringBySearch', () => {

    it('Should return true, when searching something', () => {
      ListComponent.search.name = 'some text to search';
      ListComponent.campaigns = [
        { name: 'some text to search', type: ListComponent.typeCampaignFilter },
        { name: 'Other campaign', type: ListComponent.typeCampaignFilte },
        { name: 'some text to search', type: ListComponent.typeCampaignFilter }
      ];
      expect(ListComponent.filteringBySearch()).to.equal(true);
      expect(ListComponent.beginNext).to.equal(0);
      expect(ListComponent.currentPage).to.equal(1);
    });

    it('Should return false, when input search is empty', () => {
      ListComponent.search.name = '';
      expect(ListComponent.filteringBySearch()).to.equal(false);
    });

  });



});

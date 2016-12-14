'use strict';

describe('Component: al.campaignProfiles.list', function () {

  // load the controller's module
  beforeEach(module('fakiyaMainApp'));
  let _$httpBackend;
  let _ListComponent, _endPointUrl, _sandbox;
  let _mockCampaignProfiles = {
      'return': [
        { 'name': 'CampaignProfile1', 'description': 'CampaignProfile1 description' },
        { 'name': 'CampaignProfile2', 'description': 'CampaignProfile2 description' },
        { 'name': 'CampaignProfile3', 'description': 'CampaignProfile3 description' },
        { 'name': 'CampaignProfile4', 'description': 'CampaignProfile4 description' },
        { 'name': 'CampaignProfile5', 'description': 'CampaignProfile5 description' }]
    };
  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $httpBackend, appConfig) {
    _$httpBackend = $httpBackend;
    if (appConfig.apiUri) {
      _endPointUrl = appConfig.apiUri + '/f9/admin/campaigns/profiles';
    }
    _sandbox = sinon.sandbox.create();
    _ListComponent = $componentController('al.campaignProfiles.list', {});
    _$httpBackend.whenGET(url => (url.indexOf('.html') !== -1)).respond(200);
  }));
  afterEach(function () {
    _$httpBackend.verifyNoOutstandingRequest();
    _sandbox.restore();
  });
  describe('#getCampaignProfiles', () => {
      it('should get campaignProfiles', () =>{
        _$httpBackend.whenGET(_endPointUrl).respond(_mockCampaignProfiles);
        _ListComponent.getCampaignProfiles()
        .then(() => {
          expect(_ListComponent.originalCampaignProfiles).to.deep.equal(_mockCampaignProfiles.return);
          expect(_ListComponent.campaignProfiles).to.deep.equal(_mockCampaignProfiles.return);
        });
        _$httpBackend.flush();
      });

      it('List of Lists Returned but empty', () => {
      _$httpBackend.whenGET(_endPointUrl).respond({'return':[]});
        expect(_ListComponent.message.show).to.equal(false);
        
        _ListComponent.getCampaignProfiles()
        .then(() => {
          expect(_ListComponent.originalCampaignProfiles).to.have.lengthOf(0);
          expect(_ListComponent.campaignProfiles).to.have.lengthOf(0);
        });

        _$httpBackend.flush();
    });
    
  });

  describe('#deleteCampaignProfile', () => {
    it('list deleted should return 204 statusCode', () => {

      _$httpBackend.whenDELETE(_endPointUrl + '/CampaignProfile1').respond(204, null);

      _sandbox.stub(window, 'confirm').returns(true);

      let item = { name: 'CampaignProfile1' };

      _ListComponent.deleteCampaignProfile(item)
        .then(() => {
          expect(_ListComponent.deletedRow).to.equal(null);
          expect(_ListComponent.message.show).to.equal(true);
          expect(_ListComponent.message.type).to.equal('success');
          expect(_ListComponent.message.text).to.equal('Campaign Profile Deleted');
        });

      expect(window.confirm.calledOnce).to.equal(true);

      _$httpBackend.flush();
    });

    it('list should not be deleted return 500 error', () => {
      _$httpBackend.whenDELETE(_endPointUrl + '/CampaignProfile1').respond(500,{error: 'Internal Server Error'});

      _sandbox.stub(window, 'confirm').returns(true);

      let item = { name: 'CampaignProfile1' };

      _ListComponent.deleteCampaignProfile(item)
        .then(() => {
          expect(_ListComponent.deletedRow).to.equal(null);
          expect(_ListComponent.message.type).to.equal('danger');
          expect(_ListComponent.message.text).to.equal('Internal Server Error');
        });

      expect(window.confirm.calledOnce).to.equal(true);
      _$httpBackend.flush();
    });

  });

  describe('#sortColumn', () => {

    it('param columnName not send, should return false', () => {
      expect(false).to.equal(_ListComponent.sortColumn(''));
    });

    it('param columnName send, should return true', () => {
      _ListComponent.campaignProfiles = _mockCampaignProfiles.return;
      expect(true).to.equal(_ListComponent.sortColumn('name'));
      expect(_ListComponent.reverse).to.equal(false);
      expect(_ListComponent.campaignProfiles.length).to.equal(5);
      expect(_ListComponent.campaignProfiles[0].name).to.equal('CampaignProfile1');
      _ListComponent.sortColumn('name');
      expect(_ListComponent.reverse).to.equal(true);
      expect(_ListComponent.campaignProfiles[0].name).to.equal('CampaignProfile5');
    });

  });

  describe('#filteringBySearch', () => {

    it('Should return true, when searching something', () => {
      _ListComponent.originalCampaignProfiles = _mockCampaignProfiles.return;
      _ListComponent.search.name = 'CampaignProfile1';
      expect(_ListComponent.filteringBySearch()).to.equal(true);
      expect(_ListComponent.beginNext).to.equal(0);
      expect(_ListComponent.currentPage).to.equal(1);
    });

    it('Should return true, when searching something but empty list', () => {
      _ListComponent.campaignProfiles = _mockCampaignProfiles.return;
      _ListComponent.search.name = 'not exist';
      expect(_ListComponent.filteringBySearch()).to.equal(true);  
      expect(_ListComponent.beginNext).to.equal(0);
      expect(_ListComponent.currentPage).to.equal(1);
    });

    it('Should return false, when input search is empty', () => {
      _ListComponent.search.name = '';
      expect(_ListComponent.filteringBySearch()).to.equal(false);
    });

  });

});

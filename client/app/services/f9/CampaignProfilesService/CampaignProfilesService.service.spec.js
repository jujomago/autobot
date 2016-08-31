'use strict';

describe('Service:CampaignProfilesService', function () {

    // load the service's module
    beforeEach(module('fakiyaMainApp'));

    // instantiate service
    var _CampaignProfilesService, _$httpBackend;
    var _endPointUrl;
    var _mockCampaignProfiles = {
      'return': [
        { 'name': 'CampaignProfile1', 'description': 'CampaignProfile1 description' },
        { 'name': 'CampaignProfile2', 'description': 'CampaignProfile2 description' },
        { 'name': 'CampaignProfile3', 'description': 'CampaignProfile3 description' },
        { 'name': 'CampaignProfile4', 'description': 'CampaignProfile4 description' },
        { 'name': 'CampaignProfile5', 'description': 'CampaignProfile5 description' }]
    };
    beforeEach(inject(function (_CampaignProfilesService_, $httpBackend, appConfig) {
        _CampaignProfilesService = _CampaignProfilesService_;
        _$httpBackend = $httpBackend;
        if(appConfig.apiUri){
            _endPointUrl=appConfig.apiUri+'/f9/campaigns/profiles';
        }        
    }));

    afterEach(function () {
        _$httpBackend.verifyNoOutstandingRequest();
    });
    describe('#getCampaignProfiles', () => {
      it('should return campaign profiles array', function () {
          _$httpBackend.whenGET(_endPointUrl).respond(_mockCampaignProfiles);
          _CampaignProfilesService.getCampaignProfiles()
          .then(campaignProfiles => {
              expect(null).to.not.equal(campaignProfiles);
              expect(undefined).to.not.equal(campaignProfiles);
              expect(undefined).to.not.equal(campaignProfiles.data);
              expect(campaignProfiles.data.length).to.equal(5);
              expect(campaignProfiles.data[0].name).to.equal('CampaignProfile1');
              expect(campaignProfiles.data[0].description).to.equal('CampaignProfile1 description');
              expect(campaignProfiles.statusCode).to.equal(200);
              expect(campaignProfiles.errorMessage.length).to.equal(0);
          });
          _$httpBackend.flush();
      });

      it('should return empty campaign profiles array', function () {
          _$httpBackend.whenGET(_endPointUrl).respond({
              return: []
          });
          _CampaignProfilesService.getCampaignProfiles()
          .then(campaignProfiles => {
              expect(null).to.not.equal(campaignProfiles);
              expect(undefined).to.not.equal(campaignProfiles);
              expect(undefined).to.not.equal(campaignProfiles.data);
              expect(campaignProfiles.data.length).to.equal(0);
              expect(campaignProfiles.statusCode).to.equal(200);
              expect(campaignProfiles.errorMessage.length).to.equal(0);
          });
          _$httpBackend.flush();
      });

      it('should return unexpected server error', function () {
          _$httpBackend.whenGET(_endPointUrl).respond(500, {error: 'Internal Server Error'});
          _CampaignProfilesService.getCampaignProfiles().catch(error => {
              expect(error.errorMessage).to.equal('Internal Server Error');
              expect(error.statusCode).to.equal(500);
              expect(error.data).to.equal(null);
          });
          _$httpBackend.flush();
      });

    });

    describe('#deleteCampaignProfile', () => {
      it('should delete a campaign profile', function () {
          _$httpBackend.whenDELETE(_endPointUrl+'/CampaignProfile1').respond(204, null);
          _CampaignProfilesService.deleteCampaignProfile({name: 'CampaignProfile1'})
          .then(result => {
              expect(null).to.not.equal(result);
              expect(undefined).to.not.equal(result);
              expect(result.data).to.equal(null);
              expect(result.statusCode).to.equal(204);
              expect(result.errorMessage.length).to.equal(0);
          });
          _$httpBackend.flush();
      });
      it('should return unexpected server error', function () {
          _$httpBackend.whenDELETE(_endPointUrl+'/CampaignProfile1').respond(500, {error: 'Internal Server Error'});
          _CampaignProfilesService.deleteCampaignProfile({name: 'CampaignProfile1'})
          .catch(error => {
              expect(error.errorMessage).to.equal('Internal Server Error');
              expect(error.statusCode).to.equal(500);
              expect(error.data).to.equal(null);
          });
          _$httpBackend.flush();
      });
    });
});

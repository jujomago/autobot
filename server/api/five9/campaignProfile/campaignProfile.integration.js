'use strict';

var app = require('../../..');
import request from 'supertest';

var newCampaignProfile;

describe('CampaignProfileAPI:', function() {

  describe('GET /api/f9/campaignProfiles', function() {
    this.timeout(25000);
    var campaignProfiles;
    beforeEach(function(done) {
      request(app)
        .get('/api/campaignProfiles')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          campaignProfiles = res.body.return;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(campaignProfiles).to.be.instanceOf(Array);
    });

  });

});

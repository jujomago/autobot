'use strict';


var app = require('../../..');
import request from 'supertest';

var newCampaign;

describe('Campaign API:', function() {

  describe('GET /api/f9/campaigns  - timeout 20 seconds', function() {
    this.timeout(20000);
    var campaigns;

    beforeEach(function(done) {
      request(app)
        .get('/api/f9/campaigns')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
             return done(err);
          }
          campaigns = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(campaigns.return).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/f9/campaigns - timeout 20 seconds', function() {
    this.timeout(20000);
    
   var uid = (new Date().getTime()).toString(36);
    
    beforeEach(function(done) {
      request(app)
        .post('/api/f9/campaigns')
        .send({
          name: 'Test Campaign - ' + uid,
          description: 'This is the brand new campaign!!!',
          type:'outbound'          
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {          
          if (err) {
            return done(err);
          }
          newCampaign = res.body;
          done();
        });
    });

    it('should respond null when the campaign is created', function() {
       expect(newCampaign).to.equal(null);
    });

  });

  describe('GET /api/f9/campaigns/show/:type/:campaignName -  timeout 20 seconds', function() {
    this.timeout(20000);
    
    var campaign;

    beforeEach(function(done) {
      request(app)
        .get('/api/f9/campaigns/show/inbound/BlueRubyDemo')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          campaign = res.body.return;
          done();
        });
    });

    afterEach(function() {
      campaign = {};
    });

    it('should respond with the requested campaign', function() {
       expect(campaign.name).to.equal('BlueRubyDemo');
       expect(campaign.type).to.equal('INBOUND');
       expect(campaign).to.have.property('state');
       expect(campaign).to.have.property('defaultIvrSchedule');
    });

  });

  describe('PUT /api/f9/campaigns/outbound -  timeout 20 seconds', function() {
      this.timeout(20000);
    var updatedCampaign;

    beforeEach(function(done) {
      request(app)
        .put('/api/f9/campaigns/outbound')
        .send({
           name:'BlueRubyOutbound',
           description:'test changed description',               
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedCampaign = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedCampaign = {};
    });

    it('should respond null whe updated campaign', function() {
        expect(updatedCampaign).to.equal(null);
    });

  });
/*
  describe('DELETE /api/f9/campaigns/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/f9/campaigns/' + newCampaign._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when campaign does not exist', function(done) {
      request(app)
        .delete('/api/f9/campaigns/' + newCampaign._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });
*/
});




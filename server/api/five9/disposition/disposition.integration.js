'use strict';

var app = require('../../..');
import request from 'supertest';

var newDisposition;
var uid = (new Date().getTime()).toString(36);
describe('Disposition API:', function() {
  var disposition={
          'agentMustCompleteWorksheet': false,
          'agentMustConfirm': false,
          'description': 'Updated!',
          'name': 'Integration Test Disposition '+uid,
          'oldName': 'Integration Test Disposition '+uid,
          'resetAttemptsCounter': false,
          'sendEmailNotification': false,
          'sendIMNotification': false,
          'trackAsFirstCallResolution': false,
          'type': 'RedialNumber',
          'typeParameters': {
            'allowChangeTimer': false,
            'attempts': '1',
            'timer': {
              'days': 0,
              'hours': 0,
              'minutes': 0,
              'seconds': 0
            },
            'useTimer': false
            }
        };
  describe('GET /api/dispositions', function() {
    var dispositions;
    it('should respond get all skills with JSON array - timeout 25 seconds', function (done) {
            this.timeout(25000);
            request(app)
                .get('/api/f9/dispositions')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    dispositions = res.body.return;
                    assert.equal(200, res.status);
                    dispositions.should.be.instanceOf(Array);
                    done();
                });
        });

  });

  describe('POST /api/f9/dispositions - timeout 20 seconds', function() {
    this.timeout(20000);
    beforeEach(function(done) {
      request(app)
        .post('/api/f9/dispositions')
        .send(disposition)
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {          
          if (err) {
            return done(err);
          }
          newDisposition = res.body;
          done();
        });
    });

    it('should respond null when the dispositions is created', function() {
       expect(newDisposition).to.equal(null);
    });

  });
  describe('PUT /api/f9/dispositions - timeout 20 seconds', function() {
    this.timeout(20000);
    beforeEach(function(done) {
      request(app)
        .put('/api/f9/dispositions')
        .send(disposition)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {          
          if (err) {
            return done(err);
          }
          newDisposition = res.body;
          done();
        });
    });

    it('should respond null when the disposition is updated', function() {
       expect(newDisposition).to.equal(null);
    });

  });
  describe('DELETE /api/f9/dispositions - timeout 20 seconds', function() {
    this.timeout(20000);
    beforeEach(function(done) {
      request(app)
        .delete('/api/f9/dispositions/Integration Test Disposition '+uid)
        .expect(204)
        .end((err, res) => {          
          if (err) {
            return done(err);
          }
          newDisposition = res.body;
          done();
        });
    });

    it('should respond null when the disposition is deleted', function() {
       expect(newDisposition).to.be.instanceOf(Object);
    });

  });
});

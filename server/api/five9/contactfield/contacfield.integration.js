'use strict';

var app = require('../../..');
import request from 'supertest';

var newContactField;

describe('ContactField API:', function() {

  describe('GET /api/five9/contactField - timeout 20 seconds', function() {
    this.timeout(20000);
    var contactFields;

    beforeEach(function(done) {
      request(app)
        .get('/api/f9/contactFields')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          contactFields = res.body.return;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(contactFields).to.be.instanceOf(Array);
    });

  });
});

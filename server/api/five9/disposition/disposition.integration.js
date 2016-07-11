'use strict';

var app = require('../../..');
import request from 'supertest';

var newDisposition;

describe('Disposition API:', function() {

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
});

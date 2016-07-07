'use strict';

var app = require('../../..');

import request from 'supertest';



describe('Lists API:', function () {

    describe('GET /api/f9/lists', function () {
        var lists;
        it('should respond get all lists with JSON array - timeout 25 seconds', function (done) {
            this.timeout(25000);
            request(app)
                .get('/api/f9/lists')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {

                    if (err) {
                        return done(err);
                    }
                    //console.log(res.body);
                    lists = res.body.return;
                    console.log(lists.length);

                    assert.equal(200, res.status);
                    //res.status.should.equal(200);
                    lists.should.be.instanceOf(Array);
                    done();
                });
        });
    });
});

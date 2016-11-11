'use strict';

var app = require('../../..');

import request from 'supertest';


var newSkill;

describe('Skill API:', function () {

    describe('GET /api/f9/skills', function () {
        var skills;

        /* beforeEach(function(done) {
             done();
         });*/

        it('should respond get all skills with JSON array - timeout 25 seconds', function (done) {
            this.timeout(25000);
            request(app)
                .get('/api/f9/skills')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {

                    if (err) {
                        return done(err);
                    }
                    skills = res.body.return;

                    assert.equal(200, res.status);
                    //res.status.should.equal(200);
                    skills.should.be.instanceOf(Array);
                    done();
                });
        });
    });


    describe('GET /api/f9/skills/:skillname  - timeout 20 seconds', function () {
        this.timeout(20000);
        var skill;
        var _skillname = 'Marketing';

        beforeEach(function (done) {
            request(app)
                .get('/api/f9/skills/' + _skillname)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    skill = res.body.return.skill;
                    done();
                });
        });

        afterEach(function () {
            skill = {};
        });

        it('should respond with the requested skill - timeout 20 seconds', function () {
            skill.name.should.equal('Marketing');
        });

    });

    describe('POST /api/f9/skills/create - timeout 20 seconds', function () {
        this.timeout(20000);

        beforeEach(function (done) {
            done();
        });

        var uid = (new Date().getTime()).toString(36);

        it('should respond with the newly created skill - timeout 20 seconds', function (done) {
            request(app)
                .post('/api/f9/skills/create')
                .send({
                    name: 'test Skill - ' + uid,
                    description: 'This is the brand new skill!!!'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    if (err) {
                        return done(err);
                    }
                    newSkill = res.body.return.skill;

                    newSkill.name.should.equal('test Skill - ' + uid);
                    newSkill.description.should.equal('This is the brand new skill!!!');

                    done();
                });
        });
    });

    describe('PUT /api/f9/skills/update  - timeout 20 seconds', function () {
        this.timeout(20000);

        var updatedSkill;

        beforeEach(function (done) {
            request(app)
                .put('/api/f9/skills/update')
                .send({
                    name: 'Marketing'
                })
                .expect(200)
                .expect('Content-Type', /json/)
                .end(function (err, res) {
                    if (err) {
                        return done(err);
                    }
                    updatedSkill = res.body.return.skill;
                    done();
                });
        });

        afterEach(function () {
            updatedSkill = {};
        });

        it('should respond with the updated skill - timeout 20 seconds', function () {
            updatedSkill.name.should.equal('Marketing');
        });

    });

    /*  describe('DELETE /api/f9/skills/delete/:skillname', function() {

          it('should respond with 204 on successful removal', function(done) {
              request(app)
                  .delete('/api/f9/skills/' + newSkill._id)
                  .expect(204)
                  .end((err, res) => {
                      if (err) {
                          return done(err);
                      }
                      done();
                  });
          });

          it('should respond with 404 when skill does not exist', function(done) {
              request(app)
                  .delete('/api/f9/skills/' + newSkill._id)
                  .expect(404)
                  .end((err, res) => {
                      if (err) {
                          return done(err);
                      }
                      done();
                  });
          });

      });*/


});

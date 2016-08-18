'use strict';

var app = require('../../..');

import request from 'supertest';



describe('Lists API:', function () {
    let contact = {listName: 'testAutobox', importData: {values: [{item: ['9874563217']}]} }
    let listUpdateSettings = {fieldsMapping: [{columnNumber: 1, fieldName: 'number1', key: true}],cleanListBeforeUpdate: false, crmAddMode: 'ADD_NEW', crmUpdateMode: 'DONT_UPDATE', listAddMode: 'ADD_FIRST'};
    let listDeleteSettings = {fieldsMapping: [{columnNumber: 1, fieldName: 'number1', key: true}], listDeleteMode: 'DELETE_ALL'}
    describe('GET /api/f9/lists', function () {
        var lists, fields, identifier;
        var uid = (new Date().getTime()).toString(36);
        it('should create new list - timeout 25 seconds', function (done) {
            this.timeout(25000);
            request(app)
                .post('/api/f9/lists')
                .send({listName: 'TestList '+uid})
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {

                    if (err) {
                        return done(err);
                    }
                    let list = res.body;
                    assert.equal(201, res.status);
                    assert.equal(list, null);
                    done();
                });
        });
        it('should delete created list - timeout 25 seconds', function (done) {
            this.timeout(25000);
            request(app)
                .delete('/api/f9/lists/TestList '+uid)
                .expect(204)
                .end((err, res) => {

                    if (err) {
                        return done(err);
                    }
                    let list = res.body;
                    assert.equal(204, res.status);
                    expect(list).to.be.instanceOf(Object);
                    done();
                });
        });
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
        it('should create new contact record - timeout 25 seconds', function (done) {
            contact.listUpdateSettings = listUpdateSettings;
            this.timeout(25000);
            request(app)
                .post('/api/f9/lists/contacts')
                .expect(201)
                .send(contact)
                .expect('Content-Type', /json/)
                .end((err, res) => {

                    if (err) {
                        return done(err);
                    }
                    identifier = res.body.return.identifier;
                    assert.equal(201, res.status);
                    identifier.should.not.equal(null);
                    delete contact.listUpdateSettings;
                    done();
                });
        });
        it('should delete a created contact record - timeout 25 seconds', function (done) {
            contact.listDeleteSettings = listDeleteSettings;
            this.timeout(25000);
            request(app)
                .delete('/api/f9/lists/contacts/delete')
                .expect(200)
                .send(contact)
                .expect('Content-Type', /json/)
                .end((err, res) => {

                    if (err) {
                        return done(err);
                    }
                    identifier = res.body.return.identifier;
                    assert.equal(200, res.status);
                    identifier.should.not.equal(null);
                    done();
                });
        });
        it('should wait a delete result - timeout 25 seconds', function (done) {
           console.log('IDENTIFIER: '+identifier);
           this.timeout(25000);
            request(app)
                .get('/api/f9/lists/contacts/result/running/'+identifier+'?waitTime=300')
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {

                    if (err) {
                        return done(err);
                    }
                    let result = res.body.return;
                    assert.equal(200, res.status);
                    result.should.not.equal(null);
                    result.should.equal(false);
                    
                    done();
                });
        });
        it('should show a delete result - timeout 25 seconds', function (done) {
           this.timeout(25000);
            request(app)
                .get('/api/f9/lists/contacts/result/'+identifier)
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {

                    if (err) {
                        return done(err);
                    }
                    let result = res.body.return;
                    assert.equal(200, res.status);
                    result.should.be.instanceOf(Object);
                    result.should.not.equal(null);
                    result.listRecordsDeleted.should.equal('1');
                    done();
                });
        });
    });
});

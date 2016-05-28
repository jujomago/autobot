'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var skillCtrlStub = {
  index: 'skillCtrl.index',
  show: 'skillCtrl.show',
  create: 'skillCtrl.create',
  update: 'skillCtrl.update',
  destroy: 'skillCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var skillIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './skill.controller': skillCtrlStub
});

describe('Skill API Router:', function() {

  it('should return an express router instance', function() {
    skillIndex.should.equal(routerStub);
  });

  describe('GET /api/f9/skills', function() {

    it('should route to skill.controller.index', function() {
      routerStub.get
        .withArgs('/', 'skillCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/f9/skills/:skillname', function() {

    it('should route to skill.controller.show', function() {
      routerStub.get
        .withArgs('/:skillname', 'skillCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/f9/skills/create', function() {

    it('should route to skill.controller.create', function() {
      routerStub.post
        .withArgs('/create', 'skillCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/f9/skills/update', function() { 

    it('should route to skill.controller.update', function() {
      routerStub.put
        .withArgs('/update', 'skillCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/f9/skills/delete/:skillname', function() {

    it('should route to skill.controller.destroy', function() {
      routerStub.delete
        .withArgs('/delete/:skillname', 'skillCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});

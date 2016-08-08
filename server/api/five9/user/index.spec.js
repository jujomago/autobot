'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var userCtrlStub = {
  index: 'userCtrl.index',
  detail: 'userCtrl.detail',
  create: 'userCtrl.create',
  destroy: 'userCtrl.destroy',
  addSkillUser: 'userCtrl.addSkillUser',
  deleteSkillUser: 'userCtrl.deleteSkillUser',
  updateSkillUser: 'userCtrl.updateSkillUser'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var userIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './user.controller': userCtrlStub
});

describe('User API Router:', function() {

  it('should return an express router instance', function() {
    userIndex.should.equal(routerStub);
  });

  describe('GET /api/f9/users/:username?', function() {

    it('should route to user.controller.index', function() {
      routerStub.get
        .withArgs('/:username?', 'userCtrl.index')
        .should.have.been.calledOnce;
    });

  });


  describe('GET /api/f9/users/detail/:username', function() {

    it('should route to user.controller.detail', function() {
      routerStub.get
        .withArgs('/detail/:username', 'userCtrl.detail')
        .should.have.been.calledOnce;
    });
  });
  
  
  describe('POST /api/f9/users', function() {

    it('should route to user.controller.create', function() {
      routerStub.post
        .withArgs('/', 'userCtrl.create')
        .should.have.been.calledOnce;
    });
  });
  
  describe('DELETE /api/f9/users/:username', function() {

    it('should route to user.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:username', 'userCtrl.destroy')
        .should.have.been.calledOnce;
    });
  });

  describe('POST /api/f9/users/skills/delete', function() {

    it('should route to user.controller.deleteSkillUser', function() {
      routerStub.post
        .withArgs('/skills/delete', 'userCtrl.deleteSkillUser')

        .should.have.been.calledOnce;
    });

  });
  
  
    describe('POST /api/f9/users/skills/add', function() {

    it('should route to user.controller.addSkillUser', function() {
      routerStub.post
        .withArgs('/skills/add', 'userCtrl.addSkillUser')

        .should.have.been.calledOnce;
    });

  
    });

    describe('PUT /api/f9/users/skills/update', function() {

    it('should route to user.controller.updateSkillUser', function() {
      routerStub.post
        .withArgs('/skills/update', 'userCtrl.updateSkillUser')

        .should.have.been.calledOnce;
    });

  
    });

});

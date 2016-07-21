'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var listCtrlStub = {
  index: 'listCtrl.index',
  show: 'listCtrl.show',
  create: 'listCtrl.create',
  update: 'listCtrl.update',
  destroy: 'listCtrl.destroy',
  deleteContactFromList: 'listCtrl.deleteContactFromList',
  createContactForList: 'listCtrl.createContactForList',
  getListImportResult: 'listCtrl.getListImportResult',
  isImportRunning: 'listCtrl.isImportRunning'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var listIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './list.controller': listCtrlStub
});

describe('List API Router:', function() {

  it('should return an express router instance', function() {
    expect(listIndex).to.equal(routerStub);
  });

  describe('GET /api/f9/lists', function() {

    it('should route to list.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'listCtrl.index')
        ).to.have.been.calledOnce;
    });

  });
  describe('DELETE /api/f9/lists/:listName', function() {

    it('should route to list.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:listName', 'listCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });
  describe('DELETE /api/f9/lists/contacts', function() {

    it('should route to list.controller.deleteContactFromList', function() {
      expect(routerStub.delete
        .withArgs('/contacts/delete', 'listCtrl.deleteContactFromList')
        ).to.have.been.calledOnce;
    });

  });
  describe('POST /api/f9/lists/contacts', function() {

    it('should route to list.controller.createContactForList', function() {
      expect(routerStub.post
        .withArgs('/contacts', 'listCtrl.createContactForList')
        ).to.have.been.calledOnce;
    });

  });
  describe('GET /contacts/result/:identifier', function() {

    it('should route to list.controller.getListImportResult', function() {
      expect(routerStub.get
        .withArgs('/contacts/result/:identifier', 'listCtrl.getListImportResult')
        ).to.have.been.calledOnce;
    });

  });
  describe('GET /contacts/result/running/:identifier', function() {

    it('should route to list.controller.isImportRunning', function() {
      expect(routerStub.get
        .withArgs('/contacts/result/running/:identifier', 'listCtrl.isImportRunning')
        ).to.have.been.calledOnce;
    });

  });
  describe('GET /:listName', function() {

    it('should route to list.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:listName', 'listCtrl.show')
        ).to.have.been.calledOnce;
    });

  });


});
